"use strict";

import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, TouchableOpacity, Text, BackHandler, Keyboard, Platform, Pressable } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { AiDisclaimer } from "./AiDisclaimer.js";
import { LiveAgentHandoffBadge, NoNetworkBadge } from "./ChatbotBadges.js";
import { ChatbotLoader } from "./ChatbotLoader.js";
import { ChatMessageText } from "./ChatMessageText.js";
import { MessageInput } from "./MessageInput.js";
import { TypingDots } from "./TypingDotsComponent.js";
import { Colors, Spacings } from "../tokens.js";
import { ChatWithUsModalStyles } from "./ChatWithUsModal.style.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ChatWithUsModal = ({
  showModal = false,
  onClose,
  chatMessages = [],
  isTyping = false,
  showLoader = false,
  showNoNetwork = false,
  showLiveAgentHandoff: _showLiveAgentHandoff = false,
  timeExceeded = false,
  showDisclaimer = true,
  previousChatSession: _previousChatSession,
  onInputFocus,
  keyboardVisible = false,
  onInputHeightChange,
  onSend,
  disabled = false,
  text = '',
  onTextChange,
  showTextInput = true,
  onPressNotContinueChat,
  onPressYesContinueChat,
  isOffline = false,
  isLiveAgentConnected = false,
  isLiveAgentHandoff = false,
  onEndChat,
  showEndDropdown = false,
  onToggleEndDropdown,
  logoUri,
  onLike,
  onDislike,
  chatWidgetUri,
  rentlyChatIconUri
}) => {
  const snapPoints = ["90%"];
  const bottomSheetModalRef = useRef(null);
  const scrollViewRef = useRef(null);
  const scrollDownTimeoutRef = useRef(null);
  const prevMessagesLengthRef = useRef(0);
  const prevLastMessage = useRef(undefined);
  const [localShowEndDropdown, setLocalShowEndDropdown] = useState(showEndDropdown);
  const [localKeyboardVisible, setLocalKeyboardVisible] = useState(keyboardVisible);
  useEffect(() => {
    if (showModal) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [showModal]);
  useEffect(() => {
    const backAction = () => {
      onClose?.();
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [onClose]);
  useEffect(() => {
    const showSub = Platform.OS === "ios" ? Keyboard.addListener("keyboardWillShow", () => {
      setLocalKeyboardVisible(true);
    }) : Keyboard.addListener("keyboardDidShow", () => {
      setLocalKeyboardVisible(true);
    });
    const hideSub = Platform.OS === "ios" ? Keyboard.addListener("keyboardWillHide", () => {
      setLocalKeyboardVisible(false);
    }) : Keyboard.addListener("keyboardDidHide", () => {
      setLocalKeyboardVisible(false);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  const clearScrollDownTimeout = () => {
    if (scrollDownTimeoutRef.current) {
      clearTimeout(scrollDownTimeoutRef.current);
      scrollDownTimeoutRef.current = null;
    }
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
    if (!lastMessage) return;
    const prevLength = prevMessagesLengthRef.current;
    const prevContent = prevLastMessage.current;
    const isNewMessage = prevLength !== chatMessages.length;
    const isContentChanged = prevContent !== lastMessage.content;
    if (isNewMessage || isContentChanged) {
      if (lastMessage.user === 'AI') {
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
    onInputFocus?.();
    handleScrollDown();
  };
  const handleToggleEndDropdown = () => {
    setLocalShowEndDropdown(!localShowEndDropdown);
    onToggleEndDropdown?.();
  };
  const handleEndChat = () => {
    setLocalShowEndDropdown(false);
    onEndChat?.();
  };
  return /*#__PURE__*/_jsx(BottomSheetModalProvider, {
    children: /*#__PURE__*/_jsx(BottomSheetModal, {
      ref: bottomSheetModalRef,
      snapPoints: snapPoints,
      onDismiss: onClose,
      enableOverDrag: false,
      enablePanDownToClose: true,
      handleIndicatorStyle: [ChatWithUsModalStyles.indicatorStyle, Platform.OS === "ios" ? {
        marginTop: Spacings.xx_big
      } : null],
      backgroundComponent: ({
        style
      }) => Platform.OS === "ios" ? /*#__PURE__*/_jsx(View, {
        style: [style, {
          flex: 1,
          backgroundColor: Colors.chatBot[200]
        }]
      }) : /*#__PURE__*/_jsx(View, {
        style: [style, ChatWithUsModalStyles.backgroundContainer]
      }),
      children: /*#__PURE__*/_jsx(BottomSheetView, {
        style: ChatWithUsModalStyles.modalContainer,
        children: showLoader ? /*#__PURE__*/_jsx(ChatbotLoader, {
          logoUri: logoUri
        }) : /*#__PURE__*/_jsxs(Pressable, {
          style: ChatWithUsModalStyles.contentContainer,
          onPress: () => {
            if (localShowEndDropdown) setLocalShowEndDropdown(false);
          },
          children: [/*#__PURE__*/_jsxs(View, {
            style: ChatWithUsModalStyles.headingContainer,
            children: [/*#__PURE__*/_jsxs(View, {
              children: [/*#__PURE__*/_jsx(Text, {
                style: {
                  fontSize: 20,
                  fontWeight: '600',
                  color: Colors.neutral[900]
                },
                children: "Chat with us"
              }), isLiveAgentConnected && /*#__PURE__*/_jsx(Text, {
                style: {
                  fontSize: 10,
                  fontWeight: '500',
                  color: Colors.neutral[600]
                },
                children: "\uD83D\uDFE2 Connected to live agent"
              })]
            }), /*#__PURE__*/_jsxs(View, {
              style: ChatWithUsModalStyles.sideHeader,
              children: [isLiveAgentHandoff && /*#__PURE__*/_jsx(TouchableOpacity, {
                onPress: handleToggleEndDropdown,
                style: {
                  marginRight: Spacings.sm
                },
                children: /*#__PURE__*/_jsx(View, {
                  style: {
                    backgroundColor: Colors.backgroundOverlays[601],
                    borderColor: Colors.neutral[300],
                    paddingHorizontal: Spacings.md,
                    paddingVertical: 6,
                    borderWidth: 1,
                    borderRadius: 12
                  },
                  children: /*#__PURE__*/_jsx(Text, {
                    style: {
                      color: Colors.shades[200],
                      fontSize: 12,
                      fontWeight: '500'
                    },
                    children: "End"
                  })
                })
              }), /*#__PURE__*/_jsx(TouchableOpacity, {
                onPress: onClose,
                children: /*#__PURE__*/_jsx(Text, {
                  style: {
                    fontSize: 24,
                    color: Colors.neutral[700]
                  },
                  children: "\u2212"
                })
              })]
            })]
          }), /*#__PURE__*/_jsx(TouchableOpacity, {
            style: [ChatWithUsModalStyles.endChatButton, {
              display: localShowEndDropdown && isLiveAgentHandoff ? "flex" : "none"
            }],
            onPress: handleEndChat,
            children: /*#__PURE__*/_jsx(Text, {
              style: {
                color: Colors.shades[200],
                fontSize: 12,
                fontWeight: '500'
              },
              children: "Leave conversation"
            })
          }), /*#__PURE__*/_jsx(View, {
            style: ChatWithUsModalStyles.messageArea,
            children: /*#__PURE__*/_jsxs(ScrollView, {
              ref: scrollViewRef,
              showsVerticalScrollIndicator: false,
              contentContainerStyle: localKeyboardVisible ? ChatWithUsModalStyles.scrollViewContent : {},
              onContentSizeChange: handleScrollDown,
              children: [chatMessages.map((item, index) => /*#__PURE__*/_jsx(ChatMessageText, {
                message: item,
                onLike: onLike,
                onDislike: onDislike,
                chatWidgetUri: chatWidgetUri,
                rentlyChatIconUri: rentlyChatIconUri
              }, index)), isTyping && /*#__PURE__*/_jsx(TypingDots, {})]
            })
          }), isLiveAgentHandoff && !isLiveAgentConnected && /*#__PURE__*/_jsx(LiveAgentHandoffBadge, {
            timeExceeded: timeExceeded
          }), showNoNetwork && /*#__PURE__*/_jsx(NoNetworkBadge, {}), /*#__PURE__*/_jsx(AiDisclaimer, {
            showDisclaimer: showDisclaimer
          }), showTextInput ? /*#__PURE__*/_jsx(MessageInput, {
            onInputFocus: handleInputFocus,
            keyboardVisible: localKeyboardVisible,
            onInputHeightChange: onInputHeightChange,
            text: text,
            onTextChange: onTextChange,
            onSend: onSend,
            disabled: disabled,
            responseMessage: chatMessages.length > 0 ? chatMessages[chatMessages.length - 1] : undefined,
            chatWidgetUri: chatWidgetUri,
            onLike: onLike,
            onDislike: onDislike
          }) : /*#__PURE__*/_jsxs(View, {
            style: ChatWithUsModalStyles.footerContainer,
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                fontSize: 14,
                fontWeight: '500',
                color: Colors.neutral[900]
              },
              children: "Show previous conversation?"
            }), /*#__PURE__*/_jsxs(View, {
              style: ChatWithUsModalStyles.footerButtonContainer,
              children: [/*#__PURE__*/_jsx(TouchableOpacity, {
                style: {
                  backgroundColor: Colors.neutral[100],
                  padding: Spacings.sm,
                  borderRadius: 8,
                  alignItems: 'center',
                  flex: 1,
                  marginRight: Spacings.sm
                },
                onPress: onPressNotContinueChat,
                disabled: isOffline,
                children: /*#__PURE__*/_jsx(Text, {
                  style: {
                    color: Colors.neutral[900],
                    fontSize: 14,
                    fontWeight: '500'
                  },
                  children: "No"
                })
              }), /*#__PURE__*/_jsx(TouchableOpacity, {
                style: {
                  backgroundColor: Colors.primary[600],
                  padding: Spacings.sm,
                  borderRadius: 8,
                  alignItems: 'center',
                  flex: 1,
                  marginLeft: Spacings.sm
                },
                onPress: onPressYesContinueChat,
                disabled: isOffline,
                children: /*#__PURE__*/_jsx(Text, {
                  style: {
                    color: Colors.neutral[100],
                    fontSize: 14,
                    fontWeight: '500'
                  },
                  children: "Yes"
                })
              })]
            })]
          }), showTextInput && !localKeyboardVisible && /*#__PURE__*/_jsx(Text, {
            style: [ChatWithUsModalStyles.accuracyText, {
              color: Colors.neutral[500]
            }],
            children: "RIA Beta \u2022 AI-generated content may not always be accurate, be sure to verify any information."
          })]
        })
      })
    })
  });
};
//# sourceMappingURL=ChatWithUsModal.js.map