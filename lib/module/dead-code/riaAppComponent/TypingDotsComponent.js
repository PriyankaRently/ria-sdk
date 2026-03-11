"use strict";

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withDelay } from 'react-native-reanimated';
import { RDText } from 'theme/ui/components';
import { RDColors, Spacings } from 'theme/ui/tokens';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TypingDots = ({
  dotColor = RDColors.neutral[600],
  animationDuration = 1500,
  textStyle = {}
}) => {
  // Three shared values for staggered animation
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const scale3 = useSharedValue(1);
  useEffect(() => {
    scale1.value = withRepeat(withTiming(1.6, {
      duration: animationDuration / 2
    }), -1, true);
    scale2.value = withDelay(200, withRepeat(withTiming(1.6, {
      duration: animationDuration / 2
    }), -1, true));
    scale3.value = withDelay(400, withRepeat(withTiming(1.6, {
      duration: animationDuration / 2
    }), -1, true));
  }, [animationDuration, scale1, scale2, scale3]);

  // Animated styles for each dot (hooks must not be called in a function)
  const dot1Style = useAnimatedStyle(() => ({
    transform: [{
      scale: scale1.value
    }],
    opacity: 0.4 + 0.6 * ((scale1.value - 1) / 0.6),
    backgroundColor: scale1.value > 1.2 ? RDColors.neutral[300] : dotColor
  }), [dotColor]);
  const dot2Style = useAnimatedStyle(() => ({
    transform: [{
      scale: scale2.value
    }],
    opacity: 0.4 + 0.6 * ((scale2.value - 1) / 0.6),
    backgroundColor: scale2.value > 1.2 ? RDColors.neutral[300] : dotColor
  }), [dotColor]);
  const dot3Style = useAnimatedStyle(() => ({
    transform: [{
      scale: scale3.value
    }],
    opacity: 0.4 + 0.6 * ((scale3.value - 1) / 0.6),
    backgroundColor: scale3.value > 1.2 ? RDColors.neutral[300] : dotColor
  }), [dotColor]);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.typingIndicator,
    children: [/*#__PURE__*/_jsx(RDText, {
      style: [styles.typingIndicatorAnimated, textStyle],
      variant: "Small",
      children: "Typing"
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.typingIndicatorDots,
      children: [/*#__PURE__*/_jsx(Animated.View, {
        style: [styles.dot, dot1Style]
      }), /*#__PURE__*/_jsx(Animated.View, {
        style: [styles.dot, dot2Style]
      }), /*#__PURE__*/_jsx(Animated.View, {
        style: [styles.dot, dot3Style]
      })]
    })]
  });
};
const styles = StyleSheet.create({
  typingIndicator: {
    paddingBottom: Spacings.sm,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'transparent'
  },
  typingIndicatorAnimated: {
    display: 'flex',
    alignItems: 'baseline',
    marginLeft: Spacings.x_sm,
    marginRight: Spacings.xx_sm // Use Spacings for margin between text and dots
  },
  typingIndicatorDots: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacings.xx_sm // Use Spacings for gap between dots
  },
  dot: {
    width: 2,
    height: 2,
    backgroundColor: RDColors.neutral[600],
    borderRadius: 9999,
    opacity: 0.4
  }
});
//# sourceMappingURL=TypingDotsComponent.js.map