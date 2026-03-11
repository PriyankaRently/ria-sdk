"use strict";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLivekitTokenAction, hideChatWithUsModalAction, persistChatSessionIdAction, persistPreviousChatHistoryAction, setLiveAgentToAIHandoffAction, setLiveAgentHandoffStatusAction, showChatBotLoaderAction, storeChatMessageAction, setIsLiveAgentConnectedAction, sendMessageToChatwootAction } from "../actions.js";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Keyboard, Platform, Pressable, View } from "react-native";
import { RDBadge, RDButton, RDButtonContainer, RDHeroIcon, RDPressableOpacity, RDText } from "theme/ui/components";
import { RDColors, Spacings } from "theme/ui/tokens";
import { useRoomContext } from "@livekit/react-native";
import { ConnectionState } from "livekit-client";
import { ChatWithUsModalStyles } from "./ChatWithUsModal.style.js";
import { TypingDots } from "./TypingDotsComponent.js";
import { MessageInput } from "./MessageInput.js";
import { useLiveKitRoom } from "../ChatBotHooks/useLiveKitRoom";
import { useChatMessages } from "../ChatBotHooks/useChatMessages";
import { useChatbotContext } from "../ChatBotHooks/useChatbotContext";
import { ChatMessageText } from "./ChatMessageText.js";
import { ChatbotLoader } from "./ChatbotLoader.js";
import { LiveAgentHandoffBadge, NoNetworkBadge } from "./ChatbotBadges.js";
import { useLiveAgent } from "../ChatBotHooks/useLiveAgent";
import { AiDisclaimer } from "./AiDisclaimer.js";
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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ChatWithUsModal = () => {
  const dispatch = useDispatch();
  const {
    showChatWithUsModal,
    screenName,
    chatMessages,
    isLiveAgentHandoff,
    isLiveAgentConnected,
    previousChatSession,
    previousChatHistory,
    livekitToken,
    liveAgentToAIHandoff,
    chatbotLoading,
    connectedToRoom
  } = useSelector(state => state.riaChatBot);
  const isOffline = useSelector(state => state.networkState.offline);
  const prospectId = useSelector(state => state.prospectDetails.data.id);
  const snapPoints = ["100%"];
  const [showTextInput, setShowTextInput] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showEndDropdown, setShowEndDropdown] = useState(false);
  const scrollViewRef = useRef(null);
  const bottomSheetModalRef = useRef(null);
  const scrollDownTimeoutRef = useRef(null);
  const prevMessagesLengthRef = useRef(0);
  const prevLastMessage = useRef(undefined);
  const actionToDisable = useSelector(state => state.networkState.offline);
  const room = useRoomContext();
  const isConnected = room?.state === ConnectionState.Connected;
  const {
    rawDataFromAI
  } = useLiveKitRoom();
  useChatbotContext({
    rawDataFromAI,
    screenName
  });
  const {
    isTyping
  } = useChatMessages();
  const {
    chatwootWebSocket,
    liveagentTimeExceeded
  } = useLiveAgent();
  useEffect(() => {
    if (connectedToRoom && isOffline) {
      room?.disconnect();
    }
  }, [connectedToRoom, isOffline]);
  useEffect(() => {
    const showSub = Platform.OS === "ios" ? Keyboard.addListener("keyboardWillShow", event => {
      setKeyboardVisible(true);
    }) : Keyboard.addListener("keyboardDidShow", event => {
      setKeyboardVisible(true);
    });
    const hideSub = Platform.OS === "ios" ? Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardVisible(false);
    }) : Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
      clearScrollDownTimeout();
    };
  }, []);
  useEffect(() => {
    if (!isConnected && !isLiveAgentConnected && !isOffline && previousChatHistory.length === 0) {
      dispatch(showChatBotLoaderAction({
        showLoader: true
      }));
      if (liveAgentToAIHandoff) {
        dispatch(showChatBotLoaderAction({
          showLoader: false
        }));
      }
    }
  }, [isConnected, liveAgentToAIHandoff, !isOffline]);
  useEffect(() => {
    if (showChatWithUsModal) {
      heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.CHAT_WITH_US_MODAL_OPENED, {
        screenName,
        prospectId
      });
      bottomSheetModalRef.current?.present();
      const hasNoPreviousChatHistory = !previousChatSession?.id;
      if (!livekitToken && hasNoPreviousChatHistory) {
        setShowTextInput(true);
        dispatch(getLivekitTokenAction(true));
      }
      if (previousChatHistory.length > 0) {
        dispatch(showChatBotLoaderAction({
          showLoader: false
        }));
      }
      if (previousChatHistory && previousChatHistory.length === 0) {
        setShowTextInput(true);
      }
    } else {
      onCloseModal();
    }
  }, [showChatWithUsModal]);
  const onCloseModal = () => {
    if (keyboardVisible) {
      Keyboard.dismiss();
    }
    heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.CHAT_WITH_US_MODAL_CLOSED, {
      screenName
    });
    bottomSheetModalRef.current?.dismiss();
    dispatch(hideChatWithUsModalAction());
  };
  const onPressNotContinueChat = useCallback(() => {
    setShowTextInput(true);
    dispatch(showChatBotLoaderAction({
      showLoader: true
    }));
    dispatch(persistPreviousChatHistoryAction([]));
    dispatch(persistChatSessionIdAction({
      chatSessionId: null
    }));
    dispatch(storeChatMessageAction([]));
    dispatch(getLivekitTokenAction(true));
  }, []);
  const onPressYesContinueChat = useCallback(() => {
    setShowTextInput(true);
    dispatch(persistPreviousChatHistoryAction([]));
    dispatch(showChatBotLoaderAction({
      showLoader: true
    }));
    dispatch(getLivekitTokenAction(true));
  }, []);
  const onEndChat = useCallback(() => {
    if (isLiveAgentHandoff) {
      dispatch(sendMessageToChatwootAction({
        messageContent: "This is a system generated message,\n The user has ended the conversation.",
        systemGenerated: true
      }));
      chatwootWebSocket?.close();
      dispatch(setLiveAgentHandoffStatusAction({
        isLiveAgentHandoff: false
      }));
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
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
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
      scrollViewRef.current?.scrollToEnd({
        animated: false
      });
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
        scrollViewRef.current?.scrollToEnd({
          animated: false
        });
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
  return /*#__PURE__*/_jsx(BottomSheetModalProvider, {
    children: /*#__PURE__*/_jsx(BottomSheetModal, {
      ref: bottomSheetModalRef,
      snapPoints: snapPoints,
      onDismiss: () => {
        if (showChatWithUsModal) {
          dispatch(hideChatWithUsModalAction());
        }
      },
      enableOverDrag: false,
      enablePanDownToClose: true,
      handleIndicatorStyle: [ChatWithUsModalStyles.indicatorStyle, Platform.OS === "ios" ? {
        marginTop: Spacings.xx_big
      } : null],
      backgroundComponent: ({
        style
      }) => Platform.OS === "ios" ? /*#__PURE__*/_jsx(BlurView, {
        style: [style, {
          flex: 1,
          backgroundColor: RDColors['chat-bot'][100] // F1F8FF 70% opacity
        }],
        blurType: "light",
        blurAmount: 10
      }) : /*#__PURE__*/_jsx(View, {
        style: [style, ChatWithUsModalStyles.backgroundContainer // F1F8FF 90% opacity, no blur
        ]
      }),
      children: /*#__PURE__*/_jsx(BottomSheetView, {
        style: ChatWithUsModalStyles.modalContainer,
        children: chatbotLoading ? /*#__PURE__*/_jsx(ChatbotLoader, {}) : /*#__PURE__*/_jsxs(Pressable, {
          style: ChatWithUsModalStyles.contentContainer,
          onPress: () => {
            if (showEndDropdown) setShowEndDropdown(false);
          },
          children: [/*#__PURE__*/_jsxs(View, {
            style: ChatWithUsModalStyles.headingContainer,
            children: [/*#__PURE__*/_jsxs(View, {
              children: [/*#__PURE__*/_jsx(RDText, {
                variant: "H5",
                weight: "SemiBold",
                children: "Chat with us"
              }), isLiveAgentConnected && /*#__PURE__*/_jsx(RDText, {
                variant: "XSmall",
                weight: "Medium",
                children: "\uD83D\uDFE2 Connected to live agent"
              })]
            }), /*#__PURE__*/_jsxs(View, {
              style: ChatWithUsModalStyles.sideHeader,
              children: [isLiveAgentHandoff && /*#__PURE__*/_jsx(RDPressableOpacity, {
                onPress: () => setShowEndDropdown(!showEndDropdown),
                children: /*#__PURE__*/_jsx(RDBadge, {
                  text: "End",
                  backgroundColor: RDColors["background-overlays"][601],
                  borderColor: RDColors.neutral[300],
                  textColor: RDColors.shades[200],
                  paddingHorizontal: Spacings.md,
                  paddingVertical: hs(6),
                  borderWidth: 1,
                  borderRadius: vs(12),
                  textVariant: "Small",
                  textWeight: "Medium"
                })
              }), /*#__PURE__*/_jsx(RDPressableOpacity, {
                onPress: () => {
                  Keyboard.dismiss();
                  bottomSheetModalRef.current?.dismiss();
                  dispatch(hideChatWithUsModalAction());
                },
                children: /*#__PURE__*/_jsx(RDHeroIcon, {
                  iconName: "MinusIcon",
                  color: RDColors.neutral[700],
                  size: 24
                })
              })]
            })]
          }), /*#__PURE__*/_jsx(RDPressableOpacity, {
            style: [ChatWithUsModalStyles.endChatButton, {
              display: showEndDropdown && isLiveAgentHandoff ? "flex" : "none"
            }],
            onPress: () => {
              setShowEndDropdown(false);
              onEndChat();
            },
            children: /*#__PURE__*/_jsx(RDBadge, {
              text: "Leave conversation",
              backgroundColor: RDColors.neutral[100],
              textColor: RDColors.shades[200],
              paddingHorizontal: Spacings.sm,
              paddingVertical: Spacings.x_sm,
              borderRadius: vs(8),
              textVariant: "Small",
              textWeight: "Medium"
            })
          }), /*#__PURE__*/_jsx(View, {
            style: ChatWithUsModalStyles.messageArea,
            children: /*#__PURE__*/_jsxs(ScrollView, {
              ref: scrollViewRef,
              showsVerticalScrollIndicator: false,
              contentContainerStyle: keyboardVisible ? ChatWithUsModalStyles.scrollViewContent : {},
              onContentSizeChange: () => {
                handleScrollDown();
              },
              simultaneousHandlers: [],
              children: [chatMessages.map((item, index) => /*#__PURE__*/_jsx(ChatMessageText, {
                message: item
              }, index)), isTyping && /*#__PURE__*/_jsx(TypingDots, {})]
            })
          }), isLiveAgentHandoff && !isLiveAgentConnected && /*#__PURE__*/_jsx(LiveAgentHandoffBadge, {
            timeExceeded: liveagentTimeExceeded
          }), actionToDisable && /*#__PURE__*/_jsx(NoNetworkBadge, {}), /*#__PURE__*/_jsx(AiDisclaimer, {
            showDisclaimer: showDisclaimer
          }), showTextInput ? /*#__PURE__*/_jsx(MessageInput, {
            onInputFocus: handleInputFocus,
            keyboardVisible: keyboardVisible,
            onInputHeightChange: onInputHeightChange
          }) : /*#__PURE__*/_jsxs(View, {
            style: ChatWithUsModalStyles.footerContainer,
            children: [/*#__PURE__*/_jsx(RDText, {
              weight: "Medium",
              children: "Show previous conversation?"
            }), /*#__PURE__*/_jsxs(RDButtonContainer, {
              horizontal: true,
              containerStyle: ChatWithUsModalStyles.footerButtonContainer,
              children: [/*#__PURE__*/_jsx(RDButton, {
                text: "No",
                variant: "Secondary",
                isDisabled: isOffline,
                half: true,
                onPress: () => {
                  onPressNotContinueChat();
                }
              }), /*#__PURE__*/_jsx(RDButton, {
                text: "Yes",
                variant: "Primary",
                isDisabled: isOffline,
                half: true,
                onPress: () => {
                  onPressYesContinueChat();
                }
              })]
            })]
          }), showTextInput && !keyboardVisible && /*#__PURE__*/_jsx(RDText, {
            style: ChatWithUsModalStyles.accuracyText,
            variant: "XSmall",
            weight: "Regular",
            children: "RIA Beta \u2022 AI-generated content may not always be accurate, be sure to verify any information."
          })]
        })
      })
    })
  });
};
//# sourceMappingURL=ChatWithUsModal.js.map