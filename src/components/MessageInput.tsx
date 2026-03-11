import { useState, type JSX } from 'react';
import { useChat, useRoomContext } from '@livekit/react-native';
import {
  Keyboard,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { RDColors } from '../assets/colors';
import { Spacings } from '../assets/spacings';
import { SDKPressable, SDKHeroIcon } from './ui';
import { useRiaChatBot } from '../context/RiaChatBotContext';
import { type TChatMessageType, CHATBOT_USER_ENUM } from '../types';

// Helper functions inlined to avoid external dependencies
const generateRandomKey = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const formatTimestamp = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${displayHours}:${displayMinutes} ${ampm}`;
};

interface TMessageInputProps {
  onInputFocus: () => void;
  keyboardVisible?: boolean;
  onInputHeightChange: () => void;
  onSendMessage?: (params: {
    message: string;
    chatSessionId: string | null;
    isLiveAgentConnected: boolean;
  }) => void;
  onSendMessageFailed?: (params: {
    error: string;
    chatSessionId: string | null;
  }) => void;
  isOffline?: boolean;
}

export const MessageInput = ({
  onInputFocus,
  keyboardVisible,
  onInputHeightChange,
  onSendMessage: onSendMessageCallback,
  onSendMessageFailed,
  isOffline = false,
}: TMessageInputProps): JSX.Element => {
  const [textMessage, setTextMessage] = useState('');
  const room = useRoomContext();
  const { send } = useChat();
  const [isSending, setIsSending] = useState(false);
  const {
    isLiveAgentConnected,
    chatSessionId,
    connectedToRoom,
    storeChatMessage,
    sendMessageToChatwoot,
    getLivekitToken,
  } = useRiaChatBot();
  const [inputHeight, setInputHeight] = useState(40);

  const actionToDisable = isOffline;
  const disableSend =
    actionToDisable ||
    !textMessage.trim() ||
    (!connectedToRoom && !isLiveAgentConnected);

  const sendBackgroundColor = !disableSend
    ? RDColors.secondary[600]
    : RDColors.neutral[300];

  const handleHeightChange = (height: number) => {
    if (height !== inputHeight) {
      setInputHeight(height);
      onInputHeightChange?.();
    }
  };

  const handleSendMessage = async () => {
    if (!textMessage.trim()) return;
    Keyboard.dismiss();

    if (isLiveAgentConnected) {
      const message: TChatMessageType = {
        id: generateRandomKey(),
        content: textMessage,
        timestamp: formatTimestamp(),
        user: CHATBOT_USER_ENUM.PROSPECT,
      };
      storeChatMessage(message);
      sendMessageToChatwoot({ messageContent: textMessage });
      onSendMessageCallback?.({
        message: textMessage,
        chatSessionId,
        isLiveAgentConnected: true,
      });
    } else {
      if (textMessage.trim() && !isSending && room) {
        setIsSending(true);
        try {
          await send(textMessage);
          onSendMessageCallback?.({
            message: textMessage,
            chatSessionId,
            isLiveAgentConnected: false,
          });
        } catch (error: any) {
          onSendMessageFailed?.({
            error: error?.message || 'Unknown error',
            chatSessionId,
          });
          getLivekitToken(true);
        } finally {
          setIsSending(false);
        }
      }
    }
    setTextMessage('');
  };

  return (
    <View
      style={[
        styles.sendTextContainer,
        {
          marginBottom:
            Platform.OS === 'android' && keyboardVisible ? -20 : 0,
        },
      ]}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        handleHeightChange(height);
      }}
    >
      <BottomSheetTextInput
        style={styles.textInput}
        placeholder="Start a search or ask a question..."
        placeholderTextColor={RDColors.neutral[400]}
        onChangeText={setTextMessage}
        value={textMessage}
        multiline={true}
        onFocus={onInputFocus}
      />
      <SDKPressable
        disabled={disableSend}
        onPress={() => handleSendMessage()}
        style={[styles.sendIconContainer, { backgroundColor: sendBackgroundColor }]}
      >
        <SDKHeroIcon
          iconName="PaperAirplaneIcon"
          color={RDColors.neutral[50]}
          size={24}
          style={styles.sendIconStyle}
        />
      </SDKPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  sendTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: RDColors.neutral[500],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 10,
    borderColor: RDColors.neutral[300],
    borderWidth: 1,
    borderRadius: Spacings.big,
    paddingHorizontal: 10,
    marginTop: Spacings.sm,
    backgroundColor: RDColors.shades[0],
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  sendIconStyle: {
    transform: [{ rotate: '90deg' }],
  },
  sendIconContainer: {
    alignSelf: 'flex-end',
    borderRadius: 12,
    padding: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    marginRight: Spacings.md,
    marginLeft: Spacings.xx_sm,
    color: RDColors.neutral[800],
    minHeight: 40,
    maxHeight: 100,
  },
});
