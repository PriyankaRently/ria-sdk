import { type JSX } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Colors, Spacings } from '../tokens';

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

export const LiveAgentMessageText = ({ message, onLike, onDislike }: { message: TChatMessageType; onLike?: () => void; onDislike?: () => void }): JSX.Element => {
  const { timestamp = '', content = '', senderName = 'Live Agent', likeStatus } = message;
  return (
    <View style={styles.aiMessageContainer}>
      <View style={styles.headingContainer}>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.senderNameWithIcon}>🤖 {senderName}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
        <View style={styles.likeButtonsContainer}>
          <TouchableOpacity onPress={onLike} style={styles.likeButton}>
            <Text style={[styles.likeIcon, likeStatus === 1 && styles.selectedLike]}>👍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDislike} style={styles.likeButton}>
            <Text style={[styles.likeIcon, likeStatus === -1 && styles.selectedDislike]}>👎</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.messageContent}>{content}</Text>
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
            style={{marginRight: Spacings.x_sm}}
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
  aiMessageContainer: {
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  likeButtonsContainer: {
    flexDirection: 'row',
  },
  senderNameWithIcon: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.neutral[600],
    marginRight: Spacings.x_sm,
  },
  timestamp: {
    fontSize: 10,
    color: Colors.neutral[400],
  },
  messageContent: {
    fontSize: 14,
    color: Colors.neutral[900],
  },
  likeButton: {
    padding: Spacings.xx_sm,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
  },
  selectedLike: {
    backgroundColor: Colors.success[100],
    borderColor: Colors.success[600],
  },
  selectedDislike: {
    backgroundColor: Colors.error[100],
    borderColor: Colors.error[600],
  },
  userMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.lg,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userBadge: {
    backgroundColor: Colors.blue[100],
    borderRadius: 20,
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
    maxWidth: '80%',
  },
  likeIcon: {
    fontSize: 16,
    color: Colors.neutral[600],
  },
  chatWidget: {
    fontSize: 20,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral[900],
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMessageText: {
    fontSize: 14,
    color: Colors.neutral[900],
  },
});