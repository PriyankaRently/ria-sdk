import { type JSX } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
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
  onPress: () => void;
  status: number;
  currentStatus?: number;
  iconName: string;
  style?: ViewStyle;
}

interface ChatMessageTextProps {
  message: TChatMessageType;
  onLike?: (messageId: string, likeStatus: number) => void;
  onDislike?: (messageId: string, likeStatus: number) => void;
  chatWidgetUri?: string;
  rentlyChatIconUri?: string;
}

const LikeButton = ({ onPress, status, currentStatus, iconName, style }: LikeButtonProps): JSX.Element => {
  const isSelected = status === currentStatus;
  const backgroundColor = isSelected
    ? status === 1
      ? Colors.success[100]
      : Colors.error[100]
    : undefined;

  return (
    <TouchableOpacity
      style={[styles.likeButton, { backgroundColor }, style]}
      onPress={onPress}
    >
      <Text style={[styles.likeIcon, isSelected && (status === 1 ? styles.selectedLike : styles.selectedDislike)]}>
        {iconName}
      </Text>
    </TouchableOpacity>
  );
};

export const LiveAgentMessageText = ({ message, rentlyChatIconUri }: { message: TChatMessageType; rentlyChatIconUri?: string }): JSX.Element => {
  const { timestamp = '', content = '', senderName = 'Live Agent' } = message;
  return (
    <View style={styles.aiMessageContainer}>
      <View style={styles.headingContainer}>
        <View style={styles.subHeadingContainer}>
          {rentlyChatIconUri ? (
            <Image source={{ uri: rentlyChatIconUri }} style={styles.chatWidget} />
          ) : (
            <Text style={styles.chatWidget}>💬</Text>
          )}
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

export const AIChatMessageText = ({ message, onLike, onDislike, chatWidgetUri }: { message: TChatMessageType; onLike?: (messageId: string, likeStatus: number) => void; onDislike?: (messageId: string, likeStatus: number) => void; chatWidgetUri?: string }): JSX.Element => {
  const { timestamp = '', content = '', id = '', likeStatus } = message || {};

  const handleLikePress = (newStatus: number) => {
    const newLikeStatus = likeStatus === newStatus ? 0 : newStatus;
    if (id && onLike) {
      onLike(id, newLikeStatus);
    }
  };

  const handleDislikePress = (newStatus: number) => {
    const newLikeStatus = likeStatus === newStatus ? 0 : newStatus;
    if (id && onDislike) {
      onDislike(id, newLikeStatus);
    }
  };

  return (
    <View style={styles.aiMessageContainer}>
      <View style={styles.headingContainer}>
        <View style={styles.subHeadingContainer}>
          {chatWidgetUri ? (
            <Image source={{ uri: chatWidgetUri }} style={styles.chatWidget} />
          ) : (
            <Text style={styles.chatWidget}>💬</Text>
          )}
          <View>
            <Text style={styles.senderName}>RIA</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <LikeButton
            onPress={() => handleDislikePress(-1)}
            status={-1}
            currentStatus={likeStatus}
            iconName="👎"
            style={styles.likeButtonGap}
          />
          <LikeButton
            onPress={() => handleLikePress(1)}
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

export const ChatMessageText = ({ message, onLike, onDislike, chatWidgetUri, rentlyChatIconUri }: ChatMessageTextProps): JSX.Element => {
  switch (message.user) {
    case 'AI':
      return <AIChatMessageText message={message} onLike={onLike} onDislike={onDislike} chatWidgetUri={chatWidgetUri} />;
    case 'PROSPECT':
      return <UserChatMessageText message={message} />;
    case 'LIVE_AGENT':
      return <LiveAgentMessageText message={message} rentlyChatIconUri={rentlyChatIconUri} />;
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
    gap: Spacings.x_sm,
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: Spacings.xx_sm,
  },
  likeButton: {
    transform: [{ scaleX: -1 }],
    borderRadius: 20,
    padding: Spacings.x_sm,
  },
  aiMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.big,
  },
  userMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.big,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userBadge: {
    backgroundColor: Colors.shades[0],
    borderRadius: 20,
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
    maxWidth: '80%',
  },
  chatWidget: {
    width: 40,
    height: 40,
  },
  likeButtonGap: {
    marginRight: Spacings.sm,
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
  messageContent: {
    fontSize: 14,
    color: Colors.neutral[900],
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
  userMessageText: {
    fontSize: 14,
    color: Colors.shades[200],
  },
});