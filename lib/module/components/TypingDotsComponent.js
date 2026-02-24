"use strict";

import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { RDColors, Spacings } from "../tokens.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TypingDots = ({
  dotColor = RDColors.neutral[600],
  animationDuration = 1500,
  textStyle = {}
}) => {
  const scale1 = React.useRef(new Animated.Value(1)).current;
  const scale2 = React.useRef(new Animated.Value(1)).current;
  const scale3 = React.useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const animate = (animatedValue, delay) => {
      Animated.loop(Animated.sequence([Animated.delay(delay), Animated.timing(animatedValue, {
        toValue: 1.6,
        duration: animationDuration / 2,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }), Animated.timing(animatedValue, {
        toValue: 1,
        duration: animationDuration / 2,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      })])).start();
    };
    animate(scale1, 0);
    animate(scale2, 200);
    animate(scale3, 400);
  }, [animationDuration]);
  const interpolateOpacity = scale => {
    return scale.interpolate({
      inputRange: [1, 1.6],
      outputRange: [0.4, 1]
    });
  };
  const interpolateColor = scale => {
    return scale.interpolate({
      inputRange: [1, 1.2, 1.6],
      outputRange: [dotColor, RDColors.neutral[300], RDColors.neutral[300]]
    });
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.typingIndicator,
    children: [/*#__PURE__*/_jsx(Text, {
      style: [styles.typingIndicatorAnimated, textStyle],
      children: "Typing"
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.typingIndicatorDots,
      children: [/*#__PURE__*/_jsx(Animated.View, {
        style: [styles.dot, {
          transform: [{
            scale: scale1
          }],
          opacity: interpolateOpacity(scale1),
          backgroundColor: interpolateColor(scale1)
        }]
      }), /*#__PURE__*/_jsx(Animated.View, {
        style: [styles.dot, {
          transform: [{
            scale: scale2
          }],
          opacity: interpolateOpacity(scale2),
          backgroundColor: interpolateColor(scale2)
        }]
      }), /*#__PURE__*/_jsx(Animated.View, {
        style: [styles.dot, {
          transform: [{
            scale: scale3
          }],
          opacity: interpolateOpacity(scale3),
          backgroundColor: interpolateColor(scale3)
        }]
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