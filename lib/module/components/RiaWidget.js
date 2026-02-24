"use strict";

import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AiDisclaimer } from "./AiDisclaimer.js";
import { LiveAgentHandoffBadge, NoNetworkBadge } from "./ChatbotBadges.js";
import { ChatbotLoader } from "./ChatbotLoader.js";
import { ChatMessageText } from "./ChatMessageText.js";
import { MessageInput } from "./MessageInput.js";
import { TypingDots } from "./TypingDotsComponent.js";
import { Colors, Spacings } from "../tokens.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const RiaWidget = ({
  onClose,
  initialMessages = [],
  showNoNetwork = false,
  showLiveAgentHandoff = false,
  showLoader = false,
  timeExceeded = false
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  useEffect(() => {
    if (messages.length === 0) {
      // Initial AI greeting message
      const initialMessage = {
        id: 'initial',
        content: 'How can I help you?',
        timestamp: new Date().toLocaleTimeString(),
        user: 'AI',
        likeStatus: 0
      };
      setMessages([initialMessage]);
    }
  }, []);
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      content: inputText,
      timestamp: new Date().toLocaleTimeString(),
      user: 'PROSPECT'
    };
    const botMessage = {
      id: (Date.now() + 1).toString(),
      content: 'Thank you for interacting with the chatbot model.',
      timestamp: new Date().toLocaleTimeString(),
      user: 'AI',
      likeStatus: 0
    };
    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputText('');
  };
  const handleInputChange = text => {
    setInputText(text);
  };
  const handleClose = () => {
    onClose?.();
  };
  return /*#__PURE__*/_jsx(View, {
    style: styles.modalContainer,
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.modalContent,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.header,
        children: [/*#__PURE__*/_jsx(Text, {
          style: styles.title,
          children: "Chat with RIA"
        }), /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: handleClose,
          style: styles.closeButton,
          children: /*#__PURE__*/_jsx(Text, {
            style: styles.closeText,
            children: "\u2715"
          })
        })]
      }), /*#__PURE__*/_jsxs(ScrollView, {
        style: styles.chatContainer,
        children: [true && /*#__PURE__*/_jsx(View, {
          style: styles.disclaimerSection,
          children: /*#__PURE__*/_jsx(AiDisclaimer, {
            showDisclaimer: true,
            previousChatSession: {
              id: null
            },
            chatMessages: []
          })
        }), messages.map(message => /*#__PURE__*/_jsx(View, {
          style: styles.messageSection,
          children: /*#__PURE__*/_jsx(ChatMessageText, {
            message: message
          })
        }, message.id)), showNoNetwork && /*#__PURE__*/_jsx(View, {
          style: styles.staticSection,
          children: /*#__PURE__*/_jsx(NoNetworkBadge, {})
        }), showLiveAgentHandoff && /*#__PURE__*/_jsx(View, {
          style: styles.staticSection,
          children: /*#__PURE__*/_jsx(LiveAgentHandoffBadge, {
            timeExceeded: timeExceeded
          })
        }), showLoader && /*#__PURE__*/_jsx(View, {
          style: styles.staticSection,
          children: /*#__PURE__*/_jsx(ChatbotLoader, {
            showChatbotLoadingMessage: false
          })
        }), /*#__PURE__*/_jsx(View, {
          style: styles.staticSection,
          children: /*#__PURE__*/_jsx(TypingDots, {
            dotColor: Colors.neutral[600],
            animationDuration: 1500
          })
        })]
      }), /*#__PURE__*/_jsx(View, {
        style: styles.inputContainer,
        children: /*#__PURE__*/_jsx(MessageInput, {
          text: inputText,
          onTextChange: handleInputChange,
          onSend: handleSendMessage,
          disabled: false
        })
      })]
    })
  });
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacings.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200]
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray[800]
  },
  closeButton: {
    padding: Spacings.xx_sm
  },
  closeText: {
    fontSize: 20,
    color: Colors.neutral[600]
  },
  chatContainer: {
    flex: 1,
    padding: Spacings.md
  },
  disclaimerSection: {
    marginBottom: Spacings.md
  },
  messageSection: {
    marginBottom: Spacings.sm
  },
  staticSection: {
    marginBottom: Spacings.sm
  },
  inputContainer: {
    padding: Spacings.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200]
  }
});
//# sourceMappingURL=RiaWidget.js.map