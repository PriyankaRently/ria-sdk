import React, { JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLivekitTokenAction, hideChatWithUsModalAction, persistChatSessionIdAction, persistPreviousChatHistoryAction, setLiveAgentToAIHandoffAction, setLiveAgentHandoffStatusAction, showChatBotLoaderAction, storeChatMessageAction, setIsLiveAgentConnectedAction, sendMessageToChatwootAction } from "../actions";
import { RootStateTypes } from "../../../../reduxConfig/types/RootStateType";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Keyboard, Platform, Pressable, View, Text, TouchableOpacity } from "react-native";
import { RDColors, Spacings } from "theme/ui/tokens";
import { useRoomContext } from "@livekit/react-native";
import { ConnectionState } from "livekit-client";
import { ChatWithUsModalStyles } from "./ChatWithUsModal.style";
import { TypingDots, MessageInput, ChatMessageText, ChatbotLoader, LiveAgentHandoffBadge, NoNetworkBadge, AiDisclaimer } from "react-native-ria-sdk";
import { hs, vs } from "theme/ui/lib";
import { heapTrackEvent } from "../../../../constants/helper/heapAnalytics";
import { HEAP_RIA_CHATBOT_EVENTS } from "../../../../constants/helper/heapEvents";
import { BlurView } from "@react-native-community/blur";
import { CHATBOT_USER_ENUM } from "../../../../constants/Constants";
import { ScrollView } from "react-native-gesture-handler";

/**
 * ChatWithUsModal renders a chat modal for users to interact with RIA chatbot or a live agent.
 * Features include message display, agent handoff, LiveKit integration, analytics tracking, and conversation controls.
 *
 * @returns {JSX.Element} Chat modal component.
 */
export const ChatWithUsModal = (): JSX.Element => {
    const dispatch = useDispatch();
    const { showChatWithUsModal, screenName, chatMessages, isLiveAgentHandoff, isLiveAgentConnected, previousChatSession, previousChatHistory, livekitToken, liveAgentToAIHandoff, chatbotLoading, connectedToRoom } = useSelector((state: RootStateTypes) => state.riaChatBot);
    const isOffline = useSelector((state: RootStateTypes) => state.networkState.offline);
    const prospectId = useSelector((state: RootStateTypes) => state.prospectDetails.data.id);

    const snapPoints = ["100%"];

    const [showTextInput, setShowTextInput] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const [showEndDropdown, setShowEndDropdown] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const scrollDownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const prevMessagesLengthRef = useRef(0);
    const prevLastMessage = useRef<string | undefined>(undefined);

    const actionToDisable = useSelector((state: RootStateTypes) => state.networkState.offline);

    const room = useRoomContext();
    const isConnected = room?.state === ConnectionState.Connected;

    const { rawDataFromAI } = useLiveKitRoom();
    useChatbotContext({ rawDataFromAI, screenName });
    const { isTyping } = useChatMessages();
    const { chatwootWebSocket, liveagentTimeExceeded } = useLiveAgent();

    useEffect(() => {
        if (connectedToRoom && isOffline) {
            room?.disconnect();
        }
    }, [connectedToRoom, isOffline]);

    useEffect(() => {
        const showSub = Platform.OS === "ios"
            ? Keyboard.addListener("keyboardWillShow", (event: any) => {
                setKeyboardVisible(true);
            })
            : Keyboard.addListener("keyboardDidShow", (event: any) => {
                setKeyboardVisible(true);
            });

        const hideSub = Platform.OS === "ios"
            ? Keyboard.addListener("keyboardWillHide", () => {
                setKeyboardVisible(false);
            })
            : Keyboard.addListener("keyboardDidHide", () => {
                setKeyboardVisible(false);
            });

        return () => {
            showSub.remove();
            hideSub.remove();
            clearScrollDownTimeout();
        };
    }, []);

    useEffect(() => {
        if ((!isConnected && !isLiveAgentConnected && !isOffline && previousChatHistory.length === 0)) {
            dispatch(showChatBotLoaderAction({ showLoader: true }));
            if (liveAgentToAIHandoff) {
                dispatch(showChatBotLoaderAction({ showLoader: false }));
            }
        }
    }, [isConnected, liveAgentToAIHandoff, !isOffline]);

    useEffect(() => {
        if (showChatWithUsModal) {
            heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.CHAT_WITH_US_MODAL_OPENED, { screenName, prospectId });
            bottomSheetModalRef.current?.present();
            const hasNoPreviousChatHistory = !previousChatSession?.id;
            if (!livekitToken && hasNoPreviousChatHistory) {
                setShowTextInput(true);
                dispatch(getLivekitTokenAction(true));
            }
            if (previousChatHistory.length > 0) {
                dispatch(showChatBotLoaderAction({ showLoader: false }));
            }
            if (previousChatHistory && previousChatHistory.length === 0) {
                setShowTextInput(true);
            }
        }
        else {
            onCloseModal();
        }
    }, [showChatWithUsModal]);

    const onCloseModal = () => {
        if (keyboardVisible) {
            Keyboard.dismiss();
        }
        heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.CHAT_WITH_US_MODAL_CLOSED, { screenName });
        bottomSheetModalRef.current?.dismiss();
        dispatch(hideChatWithUsModalAction());
    };

    const onPressNotContinueChat = useCallback(() => {
        setShowTextInput(true);
        dispatch(showChatBotLoaderAction({ showLoader: true }));
        dispatch(persistPreviousChatHistoryAction([]));
        dispatch(persistChatSessionIdAction({ chatSessionId: null }));
        dispatch(storeChatMessageAction([]));
        dispatch(getLivekitTokenAction(true));
    }, []);

    const onPressYesContinueChat = useCallback(() => {
        setShowTextInput(true);
        dispatch(persistPreviousChatHistoryAction([]));
        dispatch(showChatBotLoaderAction({ showLoader: true }));
        dispatch(getLivekitTokenAction(true));
    }, []);

    const onEndChat = useCallback(() => {
        if (isLiveAgentHandoff) {
            dispatch(sendMessageToChatwootAction({ messageContent: "This is a system generated message,\n The user has ended the conversation.", systemGenerated: true }));
            chatwootWebSocket?.close();
            dispatch(setLiveAgentHandoffStatusAction({ isLiveAgentHandoff: false }));
            dispatch(setIsLiveAgentConnectedAction(false));
            dispatch(setLiveAgentToAIHandoffAction(true));
            heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.LIVE_AGENT_HANDOFF_CLOSED_BY_USER);
        }
    }, [isLiveAgentHandoff]);

    useEffect(() => {
        const backAction = () => {
            if (bottomSheetModalRef.current) {
                dispatch(hideChatWithUsModalAction());
                return true;
            }
            return false;
        };

        if (showChatWithUsModal) {
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        }
    }, [showChatWithUsModal]);

    const clearScrollDownTimeout = () => {
        if (scrollDownTimeoutRef.current) {
            clearTimeout(scrollDownTimeoutRef.current);
            scrollDownTimeoutRef.current = null;
        }
    };

    const onInputHeightChange = () => {
        handleScrollDown();
    };

    const handleScrollDown = () => {
        clearScrollDownTimeout();
        scrollDownTimeoutRef.current = setTimeout(() => {

            scrollViewRef.current?.scrollToEnd({ animated: false });

        }, 150);
    };

    useEffect(() => {
        if (chatMessages.length === 0) return;

        const lastMessage = chatMessages[chatMessages.length - 1];
        const prevLength = prevMessagesLengthRef.current;
        const prevContent = prevLastMessage.current;

        const isNewMessage = prevLength !== chatMessages.length;
        const isContentChanged = prevContent !== lastMessage.content;

        if (isNewMessage || isContentChanged) {
            if (lastMessage.user === CHATBOT_USER_ENUM.AI) {
                scrollViewRef.current?.scrollToEnd({ animated: false });
            } else {
                handleScrollDown();
            }
            prevMessagesLengthRef.current = chatMessages.length;
            prevLastMessage.current = lastMessage.content;
        }
    }, [chatMessages]);


    const handleInputFocus = () => {
        setShowDisclaimer(false);
        handleScrollDown();
    };

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                onDismiss={() => {
                    if (showChatWithUsModal) {
                        dispatch(hideChatWithUsModalAction());
                    }
                }}
                enableOverDrag={false}
                enablePanDownToClose={true}
                handleIndicatorStyle={[ChatWithUsModalStyles.indicatorStyle, Platform.OS === "ios" ? { marginTop: Spacings.xx_big } : null]}
                backgroundComponent={({ style }) => (
                    Platform.OS === "ios" ? (
                        <BlurView
                            style={[
                                style,
                                {
                                    flex: 1,
                                    backgroundColor: RDColors['chat-bot'][100], // F1F8FF 70% opacity
                                }
                            ]}
                            blurType="light"
                            blurAmount={10}
                        />
                    ) : (
                        <View
                            style={[
                                style,
                                ChatWithUsModalStyles.backgroundContainer // F1F8FF 90% opacity, no blur
                            ]}
                        />
                    ))}
            >
                <BottomSheetView style={ChatWithUsModalStyles.modalContainer}>
                    {chatbotLoading ? (
                        <ChatbotLoader />
                    ) : (

                        <Pressable style={ChatWithUsModalStyles.contentContainer} onPress={() => {
                            if (showEndDropdown) setShowEndDropdown(false);
                        }}>
                            <View style={ChatWithUsModalStyles.headingContainer}>
                                <View>
                                    <Text style={{fontSize: 20, fontWeight: '600', color: RDColors.neutral[900]}} >Chat with us</Text>
                                    {isLiveAgentConnected && <Text style={{fontSize: 10, fontWeight: '500', color: RDColors.neutral[600]}} >🟢 Connected to live agent</Text>}
                                </View>
                                <View style={ChatWithUsModalStyles.sideHeader}>
                                    {isLiveAgentHandoff && (<TouchableOpacity onPress={() => setShowEndDropdown(!showEndDropdown)}>
                                        <View style={{backgroundColor: RDColors["background-overlays"][601], borderColor: RDColors.neutral[300], paddingHorizontal: Spacings.md, paddingVertical: hs(6), borderWidth: 1, borderRadius: vs(12)}} >
                                            <Text style={{color: RDColors.shades[200], fontSize: 12, fontWeight: '500'}} >End</Text>
                                        </View>
                                    </TouchableOpacity>)}
                                    <TouchableOpacity onPress={() => {
                                        Keyboard.dismiss();
                                        bottomSheetModalRef.current?.dismiss()
                                        dispatch(hideChatWithUsModalAction());
                                    }}>
                                        <Text style={{fontSize: 24, color: RDColors.neutral[700]}} >-</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[ChatWithUsModalStyles.endChatButton, { display: showEndDropdown && isLiveAgentHandoff ? "flex" : "none" }]}
                                onPress={() => { setShowEndDropdown(false); onEndChat() }}
                            >
                                <View style={{backgroundColor: RDColors.neutral[100], paddingHorizontal: Spacings.sm, paddingVertical: Spacings.x_sm, borderRadius: vs(8)}} >
                                    <Text style={{color: RDColors.shades[200], fontSize: 12, fontWeight: '500'}} >Leave conversation</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={ChatWithUsModalStyles.messageArea}>
                                <ScrollView ref={scrollViewRef}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={keyboardVisible ? 
                                        ChatWithUsModalStyles.scrollViewContent 
                                    : {}}
                                    onContentSizeChange={() => {
                                        handleScrollDown();
                                    }}
                                    simultaneousHandlers={[]}
                                >
                                    {chatMessages.map((item, index) => (
                                        <ChatMessageText key={index} message={item} />
                                    ))}
                                    {isTyping && <TypingDots />}
                                </ScrollView>
                            </View>
                            {isLiveAgentHandoff && !isLiveAgentConnected && <LiveAgentHandoffBadge timeExceeded={liveagentTimeExceeded} />}
                            {actionToDisable && <NoNetworkBadge />}
                            <AiDisclaimer showDisclaimer={showDisclaimer} previousChatSession={previousChatSession} chatMessages={chatMessages} />
                            {showTextInput ?
                                <MessageInput onInputFocus={handleInputFocus} keyboardVisible={keyboardVisible} onInputHeightChange={onInputHeightChange} />
                                :
                                (<View style={ChatWithUsModalStyles.footerContainer} >
                                    <Text style={{fontSize: 14, fontWeight: '500', color: RDColors.neutral[900]}} >Show previous conversation?</Text>
                                    <View style={[ChatWithUsModalStyles.footerButtonContainer, {flexDirection: 'row'}]} >
                                        <TouchableOpacity style={{backgroundColor: RDColors.neutral[100], padding: Spacings.sm, borderRadius: 8, alignItems: 'center', flex: 1, marginRight: Spacings.sm}} onPress={() => { onPressNotContinueChat() }} disabled={isOffline} >
                                            <Text style={{color: RDColors.neutral[900], fontSize: 14, fontWeight: '500'}} >No</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{backgroundColor: RDColors.primary[600], padding: Spacings.sm, borderRadius: 8, alignItems: 'center', flex: 1, marginLeft: Spacings.sm}} onPress={() => { onPressYesContinueChat() }} disabled={isOffline} >
                                            <Text style={{color: RDColors.neutral[50], fontSize: 14, fontWeight: '500'}} >Yes</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                )}
                            {
                                showTextInput && !keyboardVisible && <Text style={[ChatWithUsModalStyles.accuracyText, {color: RDColors.neutral[500]}]} >RIA Beta • AI-generated content may not always be accurate, be sure to verify any information.</Text>
                            }
                        </Pressable>
                    )}
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};