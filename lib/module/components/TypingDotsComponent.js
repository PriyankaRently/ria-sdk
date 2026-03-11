"use strict";

import React from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import { SDKText } from "./ui/index.js";
import { RDColors, Spacings } from "../assets/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TypingDots = () => {
  const dot1 = React.useRef(new Animated.Value(0)).current;
  const dot2 = React.useRef(new Animated.Value(0)).current;
  const dot3 = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const createAnimation = (animatedValue, delay) => {
      return Animated.loop(Animated.sequence([Animated.delay(delay), Animated.timing(animatedValue, {
        toValue: 1,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }), Animated.timing(animatedValue, {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      })]));
    };
    const anim1 = createAnimation(dot1, 0);
    const anim2 = createAnimation(dot2, 150);
    const anim3 = createAnimation(dot3, 300);
    anim1.start();
    anim2.start();
    anim3.start();
    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [dot1, dot2, dot3]);
  const animatedStyle = animatedValue => ({
    opacity: animatedValue,
    transform: [{
      translateY: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -4]
      })
    }]
  });
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(SDKText, {
      variant: "Medium",
      weight: "Regular",
      children: "RIA is typing"
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.dotsContainer,
      children: [/*#__PURE__*/_jsx(Animated.View, {
        style: [styles.dot, animatedStyle(dot1)]
      }), /*#__PURE__*/_jsx(Animated.View, {
        style: [styles.dot, animatedStyle(dot2)]
      }), /*#__PURE__*/_jsx(Animated.View, {
        style: [styles.dot, animatedStyle(dot3)]
      })]
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacings.md,
    paddingVertical: Spacings.sm,
    gap: Spacings.x_sm
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: RDColors.neutral[500]
  }
});
//# sourceMappingURL=TypingDotsComponent.js.map