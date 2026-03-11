"use strict";

import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Keyboard, Platform, Pressable, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native';
import { useRoomContext } from '@livekit/react-native';
import { ConnectionState } from 'livekit-client';
import { RDColors } from "../assets/colors.js";
import { Spacings } from "../assets/spacings.js";
import { SDKBadge, SDKButton, SDKHeroIcon, SDKPressable, SDKText } from "./ui/index.js";
import { TypingDots } from "./TypingDotsComponent.js";
import { MessageInput } from "./MessageInput.js";
import { useLiveKitRoom } from "../hooks/useLiveKitRoom.js";
import { useChatMessages } from "../hooks/useChatMessages.js";
import { useChatbotContext } from "../hooks/useChatbotContext.js";
import { ChatMessageText } from "./ChatMessageText.js";
import { ChatbotLoader } from "./ChatbotLoader.js";
import { LiveAgentHandoffBadge, NoNetworkBadge } from "./ChatbotBadges.js";
import { useLiveAgent } from "../hooks/useLiveAgent.js";
import { AiDisclaimer } from "./AiDisclaimer.js";
import { useRiaChatBot } from "../context/RiaChatBotContext.js";
import { CHATBOT_USER_ENUM } from "../types/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ChatWithUsModal renders a chat modal for users to interact with RIA chatbot or a live agent.
 * Features include message display, agent handoff, LiveKit integration, and conversation controls.
 *
 * @returns {JSX.Element} Chat modal component.
 */
export const ChatWithUsModal = ({
  prospectId,
  isOffline = false,
  onModalOpened,
  onModalClosed,
  onSendMessage,
  onSendMessageFailed,
  onLikePress,
  onEndChat: onEndChatCallback
} = {}) => {
  const {
    showChatWithUsModalState,
    setShowChatWithUsModal,
    screenName,
    chatMessages,
    isLiveAgentHandoff,
    isLiveAgentConnected,
    previousChatSession,
    previousChatHistory,
    livekitToken,
    liveAgentToAIHandoff,
    chatbotLoading,
    connectedToRoom,
    showChatbotLoader,
    storeChatMessage,
    persistPreviousChatHistory,
    persistChatSessionId,
    getLivekitToken,
    sendMessageToChatwoot,
    setLiveAgentHandoffStatus,
    setIsLiveAgentConnected,
    setLiveAgentToAIHandoff
  } = useRiaChatBot();
  const snapPoints = ['100%'];
  const [showTextInput, setShowTextInput] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showEndDropdown, setShowEndDropdown] = useState(false);
  const scrollViewRef = useRef(null);
  const bottomSheetModalRef = useRef(null);
  const scrollDownTimeoutRef = useRef(null);
  const prevMessagesLengthRef = useRef(0);
  const prevLastMessage = useRef(undefined);
  const actionToDisable = isOffline;
  const room = useRoomContext();
  const isConnected = room?.state === ConnectionState.Connected;
  useLiveKitRoom();
  useChatbotContext();
  const {
    isTyping
  } = useChatMessages();
  const {
    connectedToLiveAgent,
    chatwootIntegration
  } = useLiveAgent({
    ChatwootIntegration: undefined,
    onAnalyticsEvent: undefined
  });
  useEffect(() => {
    if (connectedToRoom && isOffline) {
      room?.disconnect();
    }
  }, [connectedToRoom, isOffline, room]);
  useEffect(() => {
    const showSub = Platform.OS === 'ios' ? Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardVisible(true);
    }) : Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSub = Platform.OS === 'ios' ? Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardVisible(false);
    }) : Keyboard.addListener('keyboardDidHide', () => {
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
      showChatbotLoader({
        showLoader: true
      });
      if (liveAgentToAIHandoff) {
        showChatbotLoader({
          showLoader: false
        });
      }
    }
  }, [isConnected, liveAgentToAIHandoff, isLiveAgentConnected, isOffline, previousChatHistory.length, showChatbotLoader, connectedToLiveAgent]);
  useEffect(() => {
    if (showChatWithUsModalState) {
      onModalOpened?.({
        screenName,
        prospectId
      });
      bottomSheetModalRef.current?.present();
      const hasNoPreviousChatHistory = !previousChatSession?.id;
      if (!livekitToken && hasNoPreviousChatHistory) {
        setShowTextInput(true);
        getLivekitToken(true);
      }
      if (previousChatHistory.length > 0) {
        showChatbotLoader({
          showLoader: false
        });
      }
      if (previousChatHistory && previousChatHistory.length === 0) {
        setShowTextInput(true);
      }
    } else {
      onCloseModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showChatWithUsModalState]);
  const onCloseModal = () => {
    if (keyboardVisible) {
      Keyboard.dismiss();
    }
    onModalClosed?.({
      screenName
    });
    bottomSheetModalRef.current?.dismiss();
    setShowChatWithUsModal(false);
  };
  const onPressNotContinueChat = useCallback(() => {
    setShowTextInput(true);
    showChatbotLoader({
      showLoader: true
    });
    persistPreviousChatHistory([]);
    persistChatSessionId({
      chatSessionId: null
    });
    storeChatMessage([]);
    getLivekitToken(true);
  }, [showChatbotLoader, persistPreviousChatHistory, persistChatSessionId, storeChatMessage, getLivekitToken]);
  const onPressYesContinueChat = useCallback(() => {
    setShowTextInput(true);
    persistPreviousChatHistory([]);
    showChatbotLoader({
      showLoader: true
    });
    getLivekitToken(true);
  }, [persistPreviousChatHistory, showChatbotLoader, getLivekitToken]);
  const onEndChat = useCallback(() => {
    if (isLiveAgentHandoff) {
      sendMessageToChatwoot({
        messageContent: 'This is a system generated message,\n The user has ended the conversation.',
        systemGenerated: true
      });
      chatwootIntegration?.close();
      setLiveAgentHandoffStatus({
        isLiveAgentHandoff: false
      });
      setIsLiveAgentConnected(false);
      setLiveAgentToAIHandoff(true);
      onEndChatCallback?.();
    }
  }, [isLiveAgentHandoff, sendMessageToChatwoot, chatwootIntegration, setLiveAgentHandoffStatus, setIsLiveAgentConnected, setLiveAgentToAIHandoff, onEndChatCallback]);
  useEffect(() => {
    const backAction = () => {
      if (bottomSheetModalRef.current) {
        setShowChatWithUsModal(false);
        return true;
      }
      return false;
    };
    if (showChatWithUsModalState) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }
    return undefined;
  }, [showChatWithUsModalState, setShowChatWithUsModal]);
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
      scrollViewRef.current?.scrollToEnd?.({
        animated: false
      });
    }, 150);
  };
  useEffect(() => {
    if (chatMessages.length === 0) return;
    const lastMessage = chatMessages[chatMessages.length - 1];
    if (!lastMessage) return;
    const prevLength = prevMessagesLengthRef.current;
    const prevContent = prevLastMessage.current;
    const isNewMessage = prevLength !== chatMessages.length;
    const isContentChanged = prevContent !== lastMessage.content;
    if (isNewMessage || isContentChanged) {
      if (lastMessage.user === CHATBOT_USER_ENUM.AI) {
        scrollViewRef.current?.scrollToEnd?.({
          animated: false
        });
      } else {
        handleScrollDown();
      }
      prevMessagesLengthRef.current = chatMessages.length;
      prevLastMessage.current = lastMessage.content;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (showChatWithUsModalState) {
          setShowChatWithUsModal(false);
        }
      },
      enableOverDrag: false,
      enablePanDownToClose: true,
      handleIndicatorStyle: [styles.indicatorStyle, Platform.OS === 'ios' ? {
        marginTop: Spacings.xx_big
      } : null],
      backgroundComponent: ({
        style
      }) => /*#__PURE__*/_jsx(View, {
        style: [style, Platform.OS === 'ios' ? {
          flex: 1,
          backgroundColor: RDColors['chat-bot'][100],
          opacity: 0.95
        } : styles.backgroundContainer]
      }),
      children: /*#__PURE__*/_jsx(BottomSheetView, {
        style: styles.modalContainer,
        children: chatbotLoading ? /*#__PURE__*/_jsx(ChatbotLoader, {}) : /*#__PURE__*/_jsxs(Pressable, {
          style: styles.contentContainer,
          onPress: () => {
            if (showEndDropdown) setShowEndDropdown(false);
          },
          children: [/*#__PURE__*/_jsxs(View, {
            style: styles.headingContainer,
            children: [/*#__PURE__*/_jsxs(View, {
              children: [/*#__PURE__*/_jsx(SDKText, {
                variant: "H5",
                weight: "SemiBold",
                children: "Chat with us"
              }), isLiveAgentConnected && /*#__PURE__*/_jsx(SDKText, {
                variant: "XSmall",
                weight: "Medium",
                children: "\uD83D\uDFE2 Connected to live agent"
              })]
            }), /*#__PURE__*/_jsxs(View, {
              style: styles.sideHeader,
              children: [isLiveAgentHandoff && /*#__PURE__*/_jsx(SDKPressable, {
                onPress: () => setShowEndDropdown(!showEndDropdown),
                children: /*#__PURE__*/_jsx(SDKBadge, {
                  text: "End",
                  backgroundColor: RDColors['background-overlays'][601],
                  borderColor: RDColors.neutral[300],
                  textColor: RDColors.shades[200],
                  paddingHorizontal: Spacings.md,
                  paddingVertical: 6,
                  borderWidth: 1,
                  borderRadius: 12,
                  textVariant: "Small",
                  textWeight: "Medium"
                })
              }), /*#__PURE__*/_jsx(SDKPressable, {
                onPress: () => {
                  Keyboard.dismiss();
                  bottomSheetModalRef.current?.dismiss();
                  setShowChatWithUsModal(false);
                },
                children: /*#__PURE__*/_jsx(SDKHeroIcon, {
                  iconName: "MinusIcon",
                  color: RDColors.neutral[700],
                  size: 24
                })
              })]
            })]
          }), /*#__PURE__*/_jsx(SDKPressable, {
            style: [styles.endChatButton, {
              display: showEndDropdown && isLiveAgentHandoff ? 'flex' : 'none'
            }],
            onPress: () => {
              setShowEndDropdown(false);
              onEndChat();
            },
            children: /*#__PURE__*/_jsx(SDKBadge, {
              text: "Leave conversation",
              backgroundColor: RDColors.neutral[100],
              textColor: RDColors.shades[200],
              paddingHorizontal: Spacings.sm,
              paddingVertical: Spacings.x_sm,
              borderRadius: 8,
              textVariant: "Small",
              textWeight: "Medium"
            })
          }), /*#__PURE__*/_jsx(View, {
            style: styles.messageArea,
            children: /*#__PURE__*/_jsxs(ScrollView, {
              ref: scrollViewRef,
              showsVerticalScrollIndicator: false,
              contentContainerStyle: keyboardVisible ? styles.scrollViewContent : {},
              onContentSizeChange: () => {
                handleScrollDown();
              },
              children: [chatMessages.map((item, index) => /*#__PURE__*/_jsx(ChatMessageText, {
                message: item,
                onLikePress: onLikePress
              }, index)), isTyping && /*#__PURE__*/_jsx(TypingDots, {})]
            })
          }), isLiveAgentHandoff && !isLiveAgentConnected && /*#__PURE__*/_jsx(LiveAgentHandoffBadge, {}), actionToDisable && /*#__PURE__*/_jsx(NoNetworkBadge, {}), /*#__PURE__*/_jsx(AiDisclaimer, {
            showDisclaimer: showDisclaimer
          }), showTextInput ? /*#__PURE__*/_jsx(MessageInput, {
            onInputFocus: handleInputFocus,
            keyboardVisible: keyboardVisible,
            onInputHeightChange: onInputHeightChange,
            onSendMessage: onSendMessage,
            onSendMessageFailed: onSendMessageFailed,
            isOffline: isOffline
          }) : /*#__PURE__*/_jsxs(View, {
            style: styles.footerContainer,
            children: [/*#__PURE__*/_jsx(SDKText, {
              weight: "Medium",
              children: "Show previous conversation?"
            }), /*#__PURE__*/_jsxs(View, {
              style: styles.footerButtonContainer,
              children: [/*#__PURE__*/_jsx(SDKButton, {
                title: "No",
                variant: "secondary",
                disabled: isOffline,
                onPress: () => {
                  onPressNotContinueChat();
                },
                style: styles.footerButton
              }), /*#__PURE__*/_jsx(SDKButton, {
                title: "Yes",
                variant: "primary",
                disabled: isOffline,
                onPress: () => {
                  onPressYesContinueChat();
                },
                style: styles.footerButton
              })]
            })]
          }), showTextInput && !keyboardVisible && /*#__PURE__*/_jsx(SDKText, {
            style: styles.accuracyText,
            variant: "XSmall",
            weight: "Regular",
            children: "RIA Beta \u2022 AI-generated content may not always be accurate, be sure to verify any information."
          })]
        })
      })
    })
  });
};
const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: RDColors.neutral[400],
    width: 40
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: RDColors['chat-bot'][100],
    opacity: 0.9
  },
  modalContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Spacings.md
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacings.sm
  },
  sideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.sm
  },
  endChatButton: {
    position: 'absolute',
    top: 45,
    right: 60,
    zIndex: 100
  },
  messageArea: {
    flex: 1,
    marginBottom: Spacings.sm
  },
  scrollViewContent: {
    paddingBottom: 100
  },
  footerContainer: {
    marginBottom: Spacings.md,
    alignItems: 'center'
  },
  footerButtonContainer: {
    flexDirection: 'row',
    gap: Spacings.sm,
    marginTop: Spacings.sm
  },
  footerButton: {
    flex: 1
  },
  accuracyText: {
    textAlign: 'center',
    marginTop: Spacings.x_sm,
    color: RDColors.neutral[500]
  }
});
//# sourceMappingURL=ChatWithUsModal.js.map