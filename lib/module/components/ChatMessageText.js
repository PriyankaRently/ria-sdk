"use strict";

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Colors, Spacings } from "../tokens.js";
import { Fonts } from "../assets/fonts.js";
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
        children: [/*#__PURE__*/_jsx(Text, {
          style: styles.chatWidget,
          children: "\uD83E\uDD16"
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
          style: styles.likeButtonGap
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
    gap: Spacings.sm,
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
    padding: Spacings.sm
  },
  aiMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.lg
  },
  userMessageContainer: {
    marginTop: Spacings.sm,
    marginBottom: Spacings.lg,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  chatWidget: {
    fontSize: 24
  },
  senderName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[800],
    fontFamily: Fonts.primary.medium
  },
  timestamp: {
    fontSize: 12,
    color: Colors.neutral[600]
  },
  messageContent: {
    fontSize: 14,
    color: Colors.gray[700],
    fontFamily: Fonts.primary.regular
  },
  userBadge: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
    maxWidth: '80%'
  },
  userMessageText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray[900],
    fontFamily: Fonts.primary.regular
  },
  likeIcon: {
    fontSize: 16
  },
  likeButtonGap: {
    marginRight: Spacings.sm
  }
});
//# sourceMappingURL=ChatMessageText.js.map