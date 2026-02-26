"use strict";

import React from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View, Text, Platform } from 'react-native';
import { Colors, Spacings } from "../tokens.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MessageInput = ({
  onInputFocus,
  keyboardVisible = false,
  onInputHeightChange,
  text = '',
  onTextChange,
  onSend,
  disabled = false
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
  return /*#__PURE__*/_jsxs(View, {
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
  });
};
const styles = StyleSheet.create({
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