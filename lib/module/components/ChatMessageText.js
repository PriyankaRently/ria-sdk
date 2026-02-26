"use strict";

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
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
  const backgroundColor = isSelected ? status === 1 ? Colors.green[100] : Colors.red[100] : undefined;
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: [styles.likeButton, {
      backgroundColor
    }, style],
    onPress: onPress,
    children: /*#__PURE__*/_jsx(Text, {
      style: styles.likeIcon,
      children: iconName
    })
  });
};
export const LiveAgentMessageText = ({
  message,
  onLike,
  onDislike
}) => {
  const {
    timestamp = '',
    content = '',
    senderName = 'Live Agent',
    likeStatus
  } = message;
  return /*#__PURE__*/_jsxs(View, {
    style: styles.aiMessageContainer,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.headingContainer,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.subHeadingContainer,
        children: [/*#__PURE__*/_jsxs(Text, {
          style: styles.senderNameWithIcon,
          children: ["\uD83E\uDD16 ", senderName]
        }), /*#__PURE__*/_jsx(Text, {
          style: styles.timestamp,
          children: timestamp
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.likeButtonsContainer,
        children: [/*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: onLike,
          style: styles.likeButton,
          children: /*#__PURE__*/_jsx(Text, {
            style: [styles.likeIcon, likeStatus === 1 && styles.selectedLike],
            children: "\uD83D\uDC4D"
          })
        }), /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: onDislike,
          style: styles.likeButton,
          children: /*#__PURE__*/_jsx(Text, {
            style: [styles.likeIcon, likeStatus === -1 && styles.selectedDislike],
            children: "\uD83D\uDC4E"
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(Text, {
      style: styles.messageContent,
      children: content
    })]
  });
};
export const AIChatMessageText = ({
  message
}) => {
  const {
    timestamp = '',
    content = '',
    likeStatus = 0
  } = message || {};
  const handleLikePress = () => {
    // Static for now, no action
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.aiMessageContainer,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.headingContainer,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.subHeadingContainer,
        children: [/*#__PURE__*/_jsx(Text, {
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
          onPress: () => handleLikePress(),
          status: -1,
          currentStatus: likeStatus,
          iconName: "\uD83D\uDC4E",
          style: {
            marginRight: Spacings.x_sm
          }
        }), /*#__PURE__*/_jsx(LikeButton, {
          onPress: () => handleLikePress(),
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
  message
}) => {
  switch (message.user) {
    case 'AI':
      return /*#__PURE__*/_jsx(AIChatMessageText, {
        message: message
      });
    case 'PROSPECT':
      return /*#__PURE__*/_jsx(UserChatMessageText, {
        message: message
      });
    case 'LIVE_AGENT':
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
  aiMessageContainer: {},
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  likeButtonsContainer: {
    flexDirection: 'row'
  },
  senderNameWithIcon: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.neutral[600],
    marginRight: Spacings.x_sm
  },
  timestamp: {
    fontSize: 10,
    color: Colors.neutral[400]
  },
  messageContent: {
    fontSize: 14,
    color: Colors.neutral[900]
  },
  likeButton: {
    padding: Spacings.xx_sm,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.neutral[300]
  },
  selectedLike: {
    backgroundColor: Colors.success[100],
    borderColor: Colors.success[600]
  },
  selectedDislike: {
    backgroundColor: Colors.error[100],
    borderColor: Colors.error[600]
  },
  userMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.lg,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  userBadge: {
    backgroundColor: Colors.blue[100],
    borderRadius: 20,
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
    maxWidth: '80%'
  },
  likeIcon: {
    fontSize: 16,
    color: Colors.neutral[600]
  },
  chatWidget: {
    fontSize: 20
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral[900]
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
//# sourceMappingURL=ChatMessageText.js.map