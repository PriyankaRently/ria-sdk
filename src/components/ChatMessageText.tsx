import { type JSX } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Colors, Spacings } from '../tokens';
import { Fonts } from '../assets/fonts';

interface TChatMessageType {
  id?: string;
  content?: string;
  timestamp?: string;
  user?: string;
  senderName?: string;
  likeStatus?: number;
}

interface LikeButtonProps {
  onPress?: () => void;
  status: number;
  currentStatus?: number;
  iconName: string;
  style?: ViewStyle;
}

const LikeButton = ({ onPress, status, currentStatus, iconName, style }: LikeButtonProps): JSX.Element => {
  const isSelected = status === currentStatus;
  const backgroundColor = isSelected
    ? status === 1
      ? Colors.green[100]
      : Colors.red[100]
    : undefined;

  return (
    <TouchableOpacity
      style={[styles.likeButton, { backgroundColor }, style]}
      onPress={onPress}
    >
      <Text style={styles.likeIcon}>{iconName}</Text>
    </TouchableOpacity>
  );
};

export const LiveAgentMessageText = ({ message }: { message: TChatMessageType }): JSX.Element => {
  const { timestamp = '', content = '', senderName = 'Live Agent' } = message;
  return (
    <View style={styles.aiMessageContainer}>
      <View style={styles.headingContainer}>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.chatWidget}>🤖</Text>
          <View>
            <Text style={styles.senderName}>{senderName}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.messageContent}>{content}</Text>
      </View>
    </View>
  );
};

export const AIChatMessageText = ({ message }: { message: TChatMessageType }): JSX.Element => {
  const { timestamp = '', content = '', likeStatus = 0 } = message || {};

  const handleLikePress = () => {
    // Static for now, no action
  };

  return (
    <View style={styles.aiMessageContainer}>
      <View style={styles.headingContainer}>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.chatWidget}>💬</Text>
          <View>
            <Text style={styles.senderName}>RIA</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <LikeButton
            onPress={() => handleLikePress()}
            status={-1}
            currentStatus={likeStatus}
            iconName="👎"
            style={styles.likeButtonGap}
          />
          <LikeButton
            onPress={() => handleLikePress()}
            status={1}
            currentStatus={likeStatus}
            iconName="👍"
          />
        </View>
      </View>
      <View>
        <Text style={styles.messageContent}>{content}</Text>
      </View>
    </View>
  );
};

export const UserChatMessageText = ({ message }: { message: TChatMessageType }): JSX.Element => {
  return (
    <View style={styles.userMessageContainer}>
      <View style={styles.userBadge}>
        <Text style={styles.userMessageText}>{message.content}</Text>
      </View>
    </View>
  );
};

export const ChatMessageText = ({ message }: { message: TChatMessageType }): JSX.Element => {
  switch (message.user) {
    case 'AI':
      return <AIChatMessageText message={message} />;
    case 'PROSPECT':
      return <UserChatMessageText message={message} />;
    case 'LIVE_AGENT':
      return <LiveAgentMessageText message={message} />;
    default:
      return <UserChatMessageText message={message} />;
  }
};

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacings.sm,
    flex: 1,
  },
  subHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.sm,
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: Spacings.xx_sm,
  },
  likeButton: {
    transform: [{ scaleX: -1 }],
    borderRadius: 20,
    padding: Spacings.sm,
  },
  aiMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.lg,
  },
  userMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.lg,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  chatWidget: {
    fontSize: 24,
  },
  senderName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[800],
    fontFamily: Fonts.primary.medium,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.neutral[600],
  },
  messageContent: {
    fontSize: 14,
    color: Colors.gray[700],
    fontFamily: Fonts.primary.regular,
  },
  userBadge: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
    maxWidth: '80%',
  },
  userMessageText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray[900],
    fontFamily: Fonts.primary.regular,
  },
  likeIcon: {
    fontSize: 16,
  },
  likeButtonGap: {
    marginRight: Spacings.sm,
  },
});