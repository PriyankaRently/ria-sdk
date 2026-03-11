"use strict";

import { Image, StyleSheet, View } from 'react-native';
import { RDColors } from "../assets/colors.js";
import { Spacings } from "../assets/spacings.js";
import { SDKBadge, SDKHeroIcon, SDKPressable, SDKText, TextStyleFromMarkup } from "./ui/index.js";
import { useRiaChatBot } from "../context/RiaChatBotContext.js";
import { CHATBOT_USER_ENUM } from "../types/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const LikeButton = ({
  onPress,
  status,
  currentStatus,
  iconName,
  style
}) => {
  const isSelected = status === currentStatus;
  const backgroundColor = isSelected ? RDColors.tertiary[200] : undefined;
  return /*#__PURE__*/_jsx(SDKPressable, {
    style: [styles.likeButton, {
      backgroundColor
    }, ...(style ? [style] : [])],
    onPress: onPress,
    children: /*#__PURE__*/_jsx(SDKHeroIcon, {
      iconName: iconName,
      size: 24,
      fontWeight: 'Regular',
      isSolid: isSelected
    })
  });
};
export const LiveAgentMessageText = ({
  message
}) => {
  const {
    timestamp = '',
    content = '',
    senderName = 'Live Agent'
  } = message;
  return /*#__PURE__*/_jsxs(View, {
    style: styles.aiMessageContainer,
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.headingContainer,
      children: /*#__PURE__*/_jsxs(View, {
        style: styles.subHeadingContainer,
        children: [/*#__PURE__*/_jsx(Image, {
          source: require('../assets/chatWidget.png'),
          style: styles.chatWidget
        }), /*#__PURE__*/_jsxs(View, {
          children: [/*#__PURE__*/_jsx(SDKText, {
            variant: "Small",
            weight: "Medium",
            children: senderName
          }), /*#__PURE__*/_jsx(SDKText, {
            variant: "XSmall",
            color: RDColors.neutral[600],
            children: timestamp
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(View, {
      children: /*#__PURE__*/_jsx(TextStyleFromMarkup, {
        text: content,
        variant: "Small"
      })
    })]
  });
};
export const AIChatMessageText = ({
  message,
  onLikePress: onLikePressCallback
}) => {
  const {
    timestamp = '',
    content = '',
    id = '',
    likeStatus
  } = message || {};
  const {
    updateMessageLike,
    toggleMessageLike
  } = useRiaChatBot();
  const handleLikePress = newStatus => {
    const newLikeStatus = likeStatus === newStatus ? 0 : newStatus;
    if (id) {
      updateMessageLike(id, newLikeStatus);
      toggleMessageLike(id, newLikeStatus);
      onLikePressCallback?.({
        messageId: id,
        likeStatus: newLikeStatus
      });
    }
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.aiMessageContainer,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.headingContainer,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.subHeadingContainer,
        children: [/*#__PURE__*/_jsx(Image, {
          source: require('../assets/chatWidget.png'),
          style: styles.chatWidget
        }), /*#__PURE__*/_jsxs(View, {
          children: [/*#__PURE__*/_jsx(SDKText, {
            variant: "Small",
            weight: "Medium",
            children: "RIA"
          }), /*#__PURE__*/_jsx(SDKText, {
            variant: "XSmall",
            color: RDColors.neutral[600],
            children: timestamp
          })]
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.iconContainer,
        children: [/*#__PURE__*/_jsx(LikeButton, {
          onPress: () => handleLikePress(-1),
          status: -1,
          currentStatus: likeStatus,
          iconName: "ThumbDownIcon",
          style: styles.likeButtonGap
        }), /*#__PURE__*/_jsx(LikeButton, {
          onPress: () => handleLikePress(1),
          status: 1,
          currentStatus: likeStatus,
          iconName: "ThumbUpIcon"
        })]
      })]
    }), /*#__PURE__*/_jsx(View, {
      children: /*#__PURE__*/_jsx(TextStyleFromMarkup, {
        text: content,
        variant: "Small"
      })
    })]
  });
};
export const UserChatMessageText = ({
  message
}) => {
  return /*#__PURE__*/_jsx(View, {
    style: styles.userMessageContainer,
    children: /*#__PURE__*/_jsx(SDKBadge, {
      text: message.content,
      backgroundColor: RDColors.shades[0],
      borderRadius: 20,
      textVariant: "Small",
      textWeight: "Regular",
      paddingVertical: Spacings.sm,
      paddingHorizontal: Spacings.sm,
      textColor: RDColors.shades[200]
    })
  });
};
export const ChatMessageText = ({
  message,
  onLikePress
}) => {
  switch (message.user) {
    case CHATBOT_USER_ENUM.AI:
      return /*#__PURE__*/_jsx(AIChatMessageText, {
        message: message,
        onLikePress: onLikePress
      });
    case CHATBOT_USER_ENUM.PROSPECT:
      return /*#__PURE__*/_jsx(UserChatMessageText, {
        message: message
      });
    case CHATBOT_USER_ENUM.LIVE_AGENT:
      return /*#__PURE__*/_jsx(LiveAgentMessageText, {
        message: message
      });
    default:
      return /*#__PURE__*/_jsx(UserChatMessageText, {
        message: message
      });
  }
};
const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacings.sm,
    flex: 1
  },
  subHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.x_sm,
    flex: 1
  },
  iconContainer: {
    flexDirection: 'row',
    gap: Spacings.xx_sm
  },
  likeButton: {
    transform: [{
      scaleX: -1
    }],
    borderRadius: 40,
    padding: Spacings.x_sm
  },
  aiMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.big
  },
  userMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.big,
    flexDirection: 'row'
  },
  chatWidget: {
    width: 40,
    height: 40
  },
  likeButtonGap: {
    marginRight: Spacings.sm
  }
});
//# sourceMappingURL=ChatMessageText.js.map