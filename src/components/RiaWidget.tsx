import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AiDisclaimer } from './AiDisclaimer';
import { LiveAgentHandoffBadge, NoNetworkBadge } from './ChatbotBadges';
import { ChatbotLoader } from './ChatbotLoader';
import { ChatMessageText } from './ChatMessageText';
import { MessageInput } from './MessageInput';
import { TypingDots } from './TypingDotsComponent';
import { Colors, Spacings } from '../tokens';

type Message = {
  id: string;
  content: string;
  timestamp: string;
  user: 'AI' | 'PROSPECT' | 'LIVE_AGENT';
  likeStatus?: number;
};

interface RiaWidgetProps {
  onClose?: () => void;
  initialMessages?: Message[];
  showNoNetwork?: boolean;
  showLiveAgentHandoff?: boolean;
  showLoader?: boolean;
  timeExceeded?: boolean;
}

export const RiaWidget: React.FC<RiaWidgetProps> = ({ 
  onClose, 
  initialMessages = [], 
  showNoNetwork = false,
  showLiveAgentHandoff = false,
  showLoader = false,
  timeExceeded = false
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (messages.length === 0) {
      // Initial AI greeting message
      const initialMessage: Message = {
        id: 'initial',
        content: 'How can I help you?',
        timestamp: new Date().toLocaleTimeString(),
        user: 'AI',
        likeStatus: 0,
      };
      setMessages([initialMessage]);
    }
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      timestamp: new Date().toLocaleTimeString(),
      user: 'PROSPECT',
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: 'Thank you for interacting with the chatbot model.',
      timestamp: new Date().toLocaleTimeString(),
      user: 'AI',
      likeStatus: 0,
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputText('');
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Chat with RIA</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.chatContainer}>
          {true && (
            <View style={styles.disclaimerSection}>
              <AiDisclaimer
                showDisclaimer={true}
                previousChatSession={{ id: null }}
                chatMessages={[]}
              />
            </View>
          )}
          {messages.map(message => (
            <View key={message.id} style={styles.messageSection}>
              <ChatMessageText message={message} />
            </View>
          ))}
          {/* Static UI elements */}
          {showNoNetwork && (
            <View style={styles.staticSection}>
              <NoNetworkBadge />
            </View>
          )}
          {showLiveAgentHandoff && (
            <View style={styles.staticSection}>
              <LiveAgentHandoffBadge timeExceeded={timeExceeded} />
            </View>
          )}
          {showLoader && (
            <View style={styles.staticSection}>
              <ChatbotLoader showChatbotLoadingMessage={false} />
            </View>
          )}
          <View style={styles.staticSection}>
            <TypingDots dotColor={Colors.neutral[600]} animationDuration={1500} />
          </View>
        </ScrollView>
        <View style={styles.inputContainer}>
          <MessageInput
            text={inputText}
            onTextChange={handleInputChange}
            onSend={handleSendMessage}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacings.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray[800],
  },
  closeButton: {
    padding: Spacings.xx_sm,
  },
  closeText: {
    fontSize: 20,
    color: Colors.neutral[600],
  },
  chatContainer: {
    flex: 1,
    padding: Spacings.md,
  },
  disclaimerSection: {
    marginBottom: Spacings.md,
  },
  messageSection: {
    marginBottom: Spacings.sm,
  },
  staticSection: {
    marginBottom: Spacings.sm,
  },
  inputContainer: {
    padding: Spacings.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
});