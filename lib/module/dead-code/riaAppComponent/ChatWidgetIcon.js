"use strict";

import React from "react";
import { Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RDPressableOpacity } from "theme/ui/components";
import { showChatWithUsModalAction } from "../actions.js";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { heapTrackEvent } from "../../../../constants/helper/heapAnalytics";
import { HEAP_RIA_CHATBOT_EVENTS } from "../../../../constants/helper/heapEvents";
import { PopupBubbleText } from "./PopupBubbleText.js";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, interpolate, Extrapolate, Easing } from "react-native-reanimated";
import LinearGradient from 'react-native-linear-gradient';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ChatWidgetIcon = ({
  bottom = 16,
  right = 16,
  screenName,
  enableShineAnimation = true
}) => {
  const dispatch = useDispatch();
  const showChatWithUsModal = useSelector(state => state.riaChatBot.showChatWithUsModal);
  const [showBubble, setShowBubble] = useState(false);
  const shineProgress = useSharedValue(0);
  useEffect(() => {
    if (!enableShineAnimation || showChatWithUsModal) return;
    const startShineAnimation = () => {
      shineProgress.value = withSequence(withTiming(1, {
        duration: 2500,
        easing: Easing.inOut(Easing.ease)
      }), withTiming(0, {
        duration: 0
      }));
    };
    startShineAnimation();
    const interval = setInterval(() => {
      startShineAnimation();
    }, 3000);
    return () => clearInterval(interval);
  }, [enableShineAnimation, showChatWithUsModal, shineProgress]);
  const onPress = () => {
    heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.CLICK_ON_CHATBOT_ICON, {
      screenName
    });
    dispatch(showChatWithUsModalAction({
      screenName
    }));
  };
  const onLongPress = () => {
    setShowBubble(true);
  };
  const onPressOut = () => {
    setShowBubble(false);
  };
  const shineAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shineProgress.value, [0, 0.3, 0.7, 1], [0, 1, 1, 0], Extrapolate.CLAMP);
    const translateX = interpolate(shineProgress.value, [0, 1], [-80, 80], Extrapolate.CLAMP);
    const translateY = interpolate(shineProgress.value, [0, 1], [-80, 80], Extrapolate.CLAMP);
    return {
      opacity,
      transform: [{
        translateX: translateX
      }, {
        translateY: translateY
      }]
    };
  });
  if (showChatWithUsModal) {
    return null;
  }
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, {
      bottom,
      right
    }],
    children: [/*#__PURE__*/_jsx(RDPressableOpacity, {
      onPress: onPress,
      onLongPress: onLongPress,
      onPressOut: onPressOut,
      children: /*#__PURE__*/_jsxs(View, {
        style: styles.iconWrapper,
        children: [/*#__PURE__*/_jsx(Image, {
          source: require("../../../../assets/icons/chatWidget.png"),
          style: styles.chatIcon
        }), enableShineAnimation && /*#__PURE__*/_jsx(Animated.View, {
          pointerEvents: "none",
          style: [styles.shineContainer, shineAnimatedStyle],
          children: /*#__PURE__*/_jsx(LinearGradient, {
            colors: ['transparent', 'transparent', 'transparent', 'rgba(220, 220, 220, 0.99)', 'rgba(255, 255, 255, 1)', 'rgba(220, 220, 220, 0.99)', 'transparent', 'transparent', 'transparent'],
            start: {
              x: 0,
              y: 0
            },
            end: {
              x: 1,
              y: 1
            },
            style: styles.shineGradient
          })
        })]
      })
    }), showBubble && /*#__PURE__*/_jsx(PopupBubbleText, {
      text: "Chat with us",
      style: styles.bubblePosition
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  iconWrapper: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 25,
    position: 'relative'
  },
  chatIcon: {
    height: 50,
    width: 50
  },
  bubblePosition: {
    position: 'absolute',
    right: 60,
    bottom: 0
  },
  shineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50
  },
  shineGradient: {
    width: '100%',
    height: '100%'
  }
});
//# sourceMappingURL=ChatWidgetIcon.js.map