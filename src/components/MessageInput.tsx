import React, { type JSX } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View, Text, Platform, Image } from 'react-native';
import { Colors, Spacings } from '../tokens';

interface TMessage {
  id?: string;
  content?: string;
  timestamp?: string;
  user?: string;
  senderName?: string;
  likeStatus?: number;
}

interface TMessageInputProps {
  onInputFocus?: () => void;
  keyboardVisible?: boolean;
  onInputHeightChange?: () => void;
  text?: string;
  onTextChange?: (text: string) => void;
  onSend?: () => void;
  disabled?: boolean;
  responseMessage?: TMessage;
  chatWidgetUri?: string;
  onLike?: (messageId: string, likeStatus: number) => void;
  onDislike?: (messageId: string, likeStatus: number) => void;
}

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
  onDislike,
}: TMessageInputProps): JSX.Element => {
  const [inputHeight, setInputHeight] = React.useState(40);

  const handleHeightChange = (height: number) => {
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
  const defaultResponse: TMessage = {
    id: 'default',
    content: 'Thank you for choosing our chatbot! How can I help you today?',
    timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    user: 'AI',
    senderName: 'RIA',
    likeStatus: 0,
  };

  const displayMessage = responseMessage || defaultResponse;

  const handleLikePress = (newStatus: number) => {
    const newLikeStatus = displayMessage.likeStatus === newStatus ? 0 : newStatus;
    if (displayMessage.id && onLike) {
      onLike(displayMessage.id, newLikeStatus);
    }
  };

  const handleDislikePress = (newStatus: number) => {
    const newLikeStatus = displayMessage.likeStatus === newStatus ? 0 : newStatus;
    if (displayMessage.id && onDislike) {
      onDislike(displayMessage.id, newLikeStatus);
    }
  };

  return (
    <View style={styles.container}>
      {/* Response Display */}
      <View style={styles.responseContainer}>
        <View style={styles.responseHeader}>
          <View style={styles.senderInfo}>
            {chatWidgetUri ? (
              <Image source={{ uri: chatWidgetUri }} style={styles.chatWidget} />
            ) : (
              <Text style={styles.chatWidget}>💬</Text>
            )}
            <View>
              <Text style={styles.senderName}>RIA</Text>
              <Text style={styles.timestamp}>{displayMessage.timestamp}</Text>
            </View>
          </View>
          <View style={styles.likeButtonsContainer}>
            <TouchableOpacity
              onPress={() => handleDislikePress(-1)}
              style={[
                styles.likeButton,
                displayMessage.likeStatus === -1 && { backgroundColor: Colors.error[100] }
              ]}
            >
              <Text style={[styles.likeIcon, displayMessage.likeStatus === -1 && styles.selectedDislike]}>👎</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLikePress(1)}
              style={[
                styles.likeButton,
                displayMessage.likeStatus === 1 && { backgroundColor: Colors.success[100] }
              ]}
            >
              <Text style={[styles.likeIcon, displayMessage.likeStatus === 1 && styles.selectedLike]}>👍</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.responseText}>{displayMessage.content}</Text>
      </View>

      {/* Input Section */}
      <View
        style={[
          styles.sendTextContainer,
          { marginBottom: Platform.OS === 'android' && keyboardVisible ? -20 : 0 },
        ]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          handleHeightChange(height);
        }}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Start a search or ask a question..."
          placeholderTextColor={Colors.neutral[400]}
          onChangeText={onTextChange}
          value={text}
          multiline={true}
          editable={!disabled}
          onFocus={onInputFocus}
        />
        <TouchableOpacity
          disabled={disabled}
          onPress={handleSendMessage}
          style={styles.sendIconContainer}
        >
          <View
            style={[
              styles.sendIcon,
              { backgroundColor: sendBackgroundColor },
            ]}
          >
            <Text style={styles.sendIconText}>➤</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  responseContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.big,
    paddingHorizontal: Spacings.md,
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacings.sm,
    flex: 1,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.x_sm,
    flex: 1,
  },
  chatWidget: {
    width: 40,
    height: 40,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral[900],
  },
  timestamp: {
    fontSize: 10,
    color: Colors.neutral[600],
  },
  likeButtonsContainer: {
    flexDirection: 'row',
    gap: Spacings.xx_sm,
  },
  likeButton: {
    transform: [{ scaleX: -1 }],
    borderRadius: 20,
    padding: Spacings.x_sm,
  },
  likeIcon: {
    fontSize: 16,
    color: Colors.neutral[600],
  },
  selectedLike: {
    color: Colors.success[600],
  },
  selectedDislike: {
    color: Colors.error[600],
  },
  responseText: {
    fontSize: 14,
    color: Colors.neutral[900],
    lineHeight: 20,
  },
  sendTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.neutral[600],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 10,
    borderColor: Colors.neutral[300],
    borderWidth: 1,
    borderRadius: Spacings.big,
    paddingHorizontal: 10,
    marginTop: Spacings.sm,
    backgroundColor: Colors.white,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  sendIconContainer: {
    alignSelf: 'flex-end',
  },
  sendIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIconText: {
    color: Colors.white,
    fontSize: 16,
    transform: [{ rotate: '90deg' }],
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    marginRight: Spacings.md,
    marginLeft: Spacings.xx_sm,
    color: Colors.neutral[800],
    minHeight: 40,
    maxHeight: 100,
  },
});