"use strict";

import React from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View, Text, Platform, Image } from 'react-native';
import { Colors, Spacings } from "../tokens.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MessageInput = ({
  onInputFocus,
  keyboardVisible = false,
  onInputHeightChange,
  text = '',
  onTextChange,
  onSend,
  disabled = false,
  responseMessage,
  chatWidgetUri,
  onLike,
  onDislike
}) => {
  const [inputHeight, setInputHeight] = React.useState(40);
  const handleHeightChange = height => {
    if (height !== inputHeight) {
      setInputHeight(height);
      onInputHeightChange?.();
    }
  };
  const handleSendMessage = () => {
    if (!text.trim() || disabled) return;
    Keyboard.dismiss();
    onSend?.();
  };
  const sendBackgroundColor = !disabled ? Colors.secondary[600] : Colors.neutral[300];

  // Default response message if none provided
  const defaultResponse = {
    id: 'default',
    content: 'Thank you for choosing our chatbot! How can I help you today?',
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }),
    user: 'AI',
    senderName: 'RIA',
    likeStatus: 0
  };
  const displayMessage = responseMessage || defaultResponse;
  const handleLikePress = newStatus => {
    const newLikeStatus = displayMessage.likeStatus === newStatus ? 0 : newStatus;
    if (displayMessage.id && onLike) {
      onLike(displayMessage.id, newLikeStatus);
    }
  };
  const handleDislikePress = newStatus => {
    const newLikeStatus = displayMessage.likeStatus === newStatus ? 0 : newStatus;
    if (displayMessage.id && onDislike) {
      onDislike(displayMessage.id, newLikeStatus);
    }
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.responseContainer,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.responseHeader,
        children: [/*#__PURE__*/_jsxs(View, {
          style: styles.senderInfo,
          children: [chatWidgetUri ? /*#__PURE__*/_jsx(Image, {
            source: {
              uri: chatWidgetUri
            },
            style: styles.chatWidget
          }) : /*#__PURE__*/_jsx(Text, {
            style: styles.chatWidget,
            children: "\uD83D\uDCAC"
          }), /*#__PURE__*/_jsxs(View, {
            children: [/*#__PURE__*/_jsx(Text, {
              style: styles.senderName,
              children: "RIA"
            }), /*#__PURE__*/_jsx(Text, {
              style: styles.timestamp,
              children: displayMessage.timestamp
            })]
          })]
        }), /*#__PURE__*/_jsxs(View, {
          style: styles.likeButtonsContainer,
          children: [/*#__PURE__*/_jsx(TouchableOpacity, {
            onPress: () => handleDislikePress(-1),
            style: [styles.likeButton, displayMessage.likeStatus === -1 && {
              backgroundColor: Colors.error[100]
            }],
            children: /*#__PURE__*/_jsx(Text, {
              style: [styles.likeIcon, displayMessage.likeStatus === -1 && styles.selectedDislike],
              children: "\uD83D\uDC4E"
            })
          }), /*#__PURE__*/_jsx(TouchableOpacity, {
            onPress: () => handleLikePress(1),
            style: [styles.likeButton, displayMessage.likeStatus === 1 && {
              backgroundColor: Colors.success[100]
            }],
            children: /*#__PURE__*/_jsx(Text, {
              style: [styles.likeIcon, displayMessage.likeStatus === 1 && styles.selectedLike],
              children: "\uD83D\uDC4D"
            })
          })]
        })]
      }), /*#__PURE__*/_jsx(Text, {
        style: styles.responseText,
        children: displayMessage.content
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: [styles.sendTextContainer, {
        marginBottom: Platform.OS === 'android' && keyboardVisible ? -20 : 0
      }],
      onLayout: event => {
        const {
          height
        } = event.nativeEvent.layout;
        handleHeightChange(height);
      },
      children: [/*#__PURE__*/_jsx(TextInput, {
        style: styles.textInput,
        placeholder: "Start a search or ask a question...",
        placeholderTextColor: Colors.neutral[400],
        onChangeText: onTextChange,
        value: text,
        multiline: true,
        editable: !disabled,
        onFocus: onInputFocus
      }), /*#__PURE__*/_jsx(TouchableOpacity, {
        disabled: disabled,
        onPress: handleSendMessage,
        style: styles.sendIconContainer,
        children: /*#__PURE__*/_jsx(View, {
          style: [styles.sendIcon, {
            backgroundColor: sendBackgroundColor
          }],
          children: /*#__PURE__*/_jsx(Text, {
            style: styles.sendIconText,
            children: "\u27A4"
          })
        })
      })]
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  responseContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.big,
    paddingHorizontal: Spacings.md
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacings.sm,
    flex: 1
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.x_sm,
    flex: 1
  },
  chatWidget: {
    width: 40,
    height: 40
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral[900]
  },
  timestamp: {
    fontSize: 10,
    color: Colors.neutral[600]
  },
  likeButtonsContainer: {
    flexDirection: 'row',
    gap: Spacings.xx_sm
  },
  likeButton: {
    transform: [{
      scaleX: -1
    }],
    borderRadius: 20,
    padding: Spacings.x_sm
  },
  likeIcon: {
    fontSize: 16,
    color: Colors.neutral[600]
  },
  selectedLike: {
    color: Colors.success[600]
  },
  selectedDislike: {
    color: Colors.error[600]
  },
  responseText: {
    fontSize: 14,
    color: Colors.neutral[900],
    lineHeight: 20
  },
  sendTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.neutral[600],
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 10,
    borderColor: Colors.neutral[300],
    borderWidth: 1,
    borderRadius: Spacings.big,
    paddingHorizontal: 10,
    marginTop: Spacings.sm,
    backgroundColor: Colors.white,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8
  },
  sendIconContainer: {
    alignSelf: 'flex-end'
  },
  sendIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendIconText: {
    color: Colors.white,
    fontSize: 16,
    transform: [{
      rotate: '90deg'
    }]
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    marginRight: Spacings.md,
    marginLeft: Spacings.xx_sm,
    color: Colors.neutral[900],
    minHeight: 40,
    maxHeight: 100
  }
});
//# sourceMappingURL=MessageInput.js.map