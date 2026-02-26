"use strict";

import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { Colors, Spacings } from "../tokens.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const LikeButton = ({
  onPress,
  status,
  currentStatus,
  iconName,
  style
}) => {
  const isSelected = status === currentStatus;
  const backgroundColor = isSelected ? Colors.neutral[100] : undefined;
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: [styles.likeButton, {
      backgroundColor
    }, style],
    onPress: onPress,
    children: /*#__PURE__*/_jsx(Text, {
      style: [styles.likeIcon, isSelected && (status === 1 ? styles.selectedLike : styles.selectedDislike)],
      children: iconName
    })
  });
};
export const LiveAgentMessageText = ({
  message,
  rentlyChatIconUri
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
        children: [rentlyChatIconUri ? /*#__PURE__*/_jsx(Image, {
          source: {
            uri: rentlyChatIconUri
          },
          style: styles.chatWidget
        }) : /*#__PURE__*/_jsx(Text, {
          style: styles.chatWidget,
          children: "\uD83D\uDCAC"
        }), /*#__PURE__*/_jsxs(View, {
          children: [/*#__PURE__*/_jsx(Text, {
            style: styles.senderName,
            children: senderName
          }), /*#__PURE__*/_jsx(Text, {
            style: styles.timestamp,
            children: timestamp
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(View, {
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.messageContent,
        children: content
      })
    })]
  });
};
export const AIChatMessageText = ({
  message,
  onLike,
  onDislike,
  chatWidgetUri
}) => {
  const {
    timestamp = '',
    content = '',
    id = '',
    likeStatus
  } = message || {};
  const handleLikePress = newStatus => {
    const newLikeStatus = likeStatus === newStatus ? 0 : newStatus;
    if (id && onLike) {
      onLike(id, newLikeStatus);
    }
  };
  const handleDislikePress = newStatus => {
    const newLikeStatus = likeStatus === newStatus ? 0 : newStatus;
    if (id && onDislike) {
      onDislike(id, newLikeStatus);
    }
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.aiMessageContainer,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.headingContainer,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.subHeadingContainer,
        children: [chatWidgetUri ? /*#__PURE__*/_jsx(Image, {
          source: {
            uri: chatWidgetUri
          },
          style: styles.chatWidget
        }) : /*#__PURE__*/_jsx(Text, {
          style: styles.chatWidget,
          children: "\uD83D\uDCAC"
        }), /*#__PURE__*/_jsxs(View, {
          children: [/*#__PURE__*/_jsx(Text, {
            style: styles.senderName,
            children: "RIA"
          }), /*#__PURE__*/_jsx(Text, {
            style: styles.timestamp,
            children: timestamp
          })]
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.iconContainer,
        children: [/*#__PURE__*/_jsx(LikeButton, {
          onPress: () => handleDislikePress(-1),
          status: -1,
          currentStatus: likeStatus,
          iconName: "\uD83D\uDC4E",
          style: styles.likeButtonGap
        }), /*#__PURE__*/_jsx(LikeButton, {
          onPress: () => handleLikePress(1),
          status: 1,
          currentStatus: likeStatus,
          iconName: "\uD83D\uDC4D"
        })]
      })]
    }), /*#__PURE__*/_jsx(View, {
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.messageContent,
        children: content
      })
    })]
  });
};
export const UserChatMessageText = ({
  message
}) => {
  return /*#__PURE__*/_jsx(View, {
    style: styles.userMessageContainer,
    children: /*#__PURE__*/_jsx(View, {
      style: styles.userBadge,
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.userMessageText,
        children: message.content
      })
    })
  });
};
export const ChatMessageText = ({
  message,
  onLike,
  onDislike,
  chatWidgetUri,
  rentlyChatIconUri
}) => {
  switch (message.user) {
    case 'AI':
      return /*#__PURE__*/_jsx(AIChatMessageText, {
        message: message,
        onLike: onLike,
        onDislike: onDislike,
        chatWidgetUri: chatWidgetUri
      });
    case 'PROSPECT':
      return /*#__PURE__*/_jsx(UserChatMessageText, {
        message: message
      });
    case 'LIVE_AGENT':
      return /*#__PURE__*/_jsx(LiveAgentMessageText, {
        message: message,
        rentlyChatIconUri: rentlyChatIconUri
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
    borderRadius: 20,
    padding: Spacings.x_sm
  },
  aiMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.big
  },
  userMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.big,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  userBadge: {
    backgroundColor: Colors.shades[0],
    borderRadius: 20,
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
    maxWidth: '80%'
  },
  chatWidget: {
    width: 40,
    height: 40
  },
  likeButtonGap: {
    marginRight: Spacings.sm
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral[900]
  },
  timestamp: {
    fontSize: 10,
    color: Colors.neutral[600]
  },
  messageContent: {
    fontSize: 14,
    color: Colors.neutral[900]
  },
  likeIcon: {
    fontSize: 16,
    color: Colors.neutral[600]
  },
  selectedLike: {
    color: Colors.success[600]
  },
  selectedDislike: {
    color: Colors.error[600]
  },
  userMessageText: {
    fontSize: 14,
    color: Colors.shades[200]
  }
});
//# sourceMappingURL=ChatMessageText.js.map