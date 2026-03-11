import type { JSX } from 'react';
import { Image, StyleSheet, View, type ViewStyle } from 'react-native';
import { RDColors } from '../assets/colors';
import { Spacings } from '../assets/spacings';
import { SDKBadge, SDKHeroIcon, SDKPressable, SDKText, TextStyleFromMarkup, type IconNameTypes } from './ui';
import { useRiaChatBot } from '../context/RiaChatBotContext';
import { type TChatMessageType, CHATBOT_USER_ENUM } from '../types';

interface LikeButtonProps {
  onPress: () => void;
  status: number;
  currentStatus: number | undefined;
  iconName: IconNameTypes;
  style?: ViewStyle;
}

const LikeButton = ({
  onPress,
  status,
  currentStatus,
  iconName,
  style,
}: LikeButtonProps): JSX.Element => {
  const isSelected = status === currentStatus;
  const backgroundColor = isSelected ? RDColors.tertiary[200] : undefined;

  return (
    <SDKPressable
      style={[styles.likeButton, { backgroundColor }, ...(style ? [style] : [])]}
      onPress={onPress}
    >
      <SDKHeroIcon
        iconName={iconName}
        size={24}
        fontWeight={'Regular'}
        isSolid={isSelected}
      />
    </SDKPressable>
  );
};

export const LiveAgentMessageText = ({
  message,
}: {
  message: TChatMessageType;
}): JSX.Element => {
  const { timestamp = '', content = '', senderName = 'Live Agent' } = message;
  return (
    <View style={styles.aiMessageContainer}>
      <View style={styles.headingContainer}>
        <View style={styles.subHeadingContainer}>
          <Image
            source={require('../assets/chatWidget.png')}
            style={styles.chatWidget}
          />
          <View>
            <SDKText variant="Small" weight="Medium">
              {senderName}
            </SDKText>
            <SDKText variant="XSmall" color={RDColors.neutral[600]}>
              {timestamp}
            </SDKText>
          </View>
        </View>
      </View>
      <View>
        <TextStyleFromMarkup text={content} variant="Small" />
      </View>
    </View>
  );
};

export const AIChatMessageText = ({
  message,
  onLikePress: onLikePressCallback,
}: {
  message: TChatMessageType;
  onLikePress?: (params: { messageId: string; likeStatus: number }) => void;
}): JSX.Element => {
  const { timestamp = '', content = '', id = '', likeStatus } = message || {};
  const { updateMessageLike, toggleMessageLike } = useRiaChatBot();

  const handleLikePress = (newStatus: number) => {
    const newLikeStatus = likeStatus === newStatus ? 0 : newStatus;
    if (id) {
      updateMessageLike(id, newLikeStatus);
      toggleMessageLike(id, newLikeStatus);
      onLikePressCallback?.({ messageId: id, likeStatus: newLikeStatus });
    }
  };

  return (
    <View style={styles.aiMessageContainer}>
      <View style={styles.headingContainer}>
        <View style={styles.subHeadingContainer}>
          <Image
            source={require('../assets/chatWidget.png')}
            style={styles.chatWidget}
          />
          <View>
            <SDKText variant="Small" weight="Medium">
              RIA
            </SDKText>
            <SDKText variant="XSmall" color={RDColors.neutral[600]}>
              {timestamp}
            </SDKText>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <LikeButton
            onPress={() => handleLikePress(-1)}
            status={-1}
            currentStatus={likeStatus}
            iconName="ThumbDownIcon"
            style={styles.likeButtonGap}
          />
          <LikeButton
            onPress={() => handleLikePress(1)}
            status={1}
            currentStatus={likeStatus}
            iconName="ThumbUpIcon"
          />
        </View>
      </View>
      <View>
        <TextStyleFromMarkup text={content} variant="Small" />
      </View>
    </View>
  );
};

export const UserChatMessageText = ({
  message,
}: {
  message: TChatMessageType;
}): JSX.Element => {
  return (
    <View style={styles.userMessageContainer}>
      <SDKBadge
        text={message.content}
        backgroundColor={RDColors.shades[0]}
        borderRadius={20}
        textVariant="Small"
        textWeight="Regular"
        paddingVertical={Spacings.sm}
        paddingHorizontal={Spacings.sm}
        textColor={RDColors.shades[200]}
      />
    </View>
  );
};

export const ChatMessageText = ({
  message,
  onLikePress,
}: {
  message: TChatMessageType;
  onLikePress?: (params: { messageId: string; likeStatus: number }) => void;
}): JSX.Element => {
  switch (message.user) {
    case CHATBOT_USER_ENUM.AI:
      return <AIChatMessageText message={message} onLikePress={onLikePress} />;
    case CHATBOT_USER_ENUM.PROSPECT:
      return <UserChatMessageText message={message} />;
    case CHATBOT_USER_ENUM.LIVE_AGENT:
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
    gap: Spacings.x_sm,
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: Spacings.xx_sm,
  },
  likeButton: {
    transform: [{ scaleX: -1 }],
    borderRadius: 40,
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
  },
  chatWidget: {
    width: 40,
    height: 40,
  },
  likeButtonGap: {
    marginRight: Spacings.sm,
  },
});
