"use strict";

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SDKText } from "./ui/index.js";
import { RDColors, Spacings } from "../assets/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const PopupBubbleText = ({
  text,
  visible = true,
  style
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(10)).current;
  React.useEffect(() => {
    if (visible) {
      Animated.parallel([Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }), Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })]).start();
    } else {
      Animated.parallel([Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }), Animated.timing(translateY, {
        toValue: 10,
        duration: 150,
        useNativeDriver: true
      })]).start();
    }
  }, [visible, opacity, translateY]);
  if (!visible) return null;
  return /*#__PURE__*/_jsxs(Animated.View, {
    style: [styles.container, style, {
      opacity,
      transform: [{
        translateY
      }]
    }],
    children: [/*#__PURE__*/_jsx(SDKText, {
      variant: "Small",
      weight: "Medium",
      color: RDColors.shades[0],
      children: text
    }), /*#__PURE__*/_jsx(View, {
      style: styles.arrow
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: RDColors.secondary[600],
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
    borderRadius: 12,
    maxWidth: 200,
    shadowColor: RDColors.neutral[500],
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4
  },
  arrow: {
    position: 'absolute',
    bottom: -6,
    right: 20,
    width: 12,
    height: 12,
    backgroundColor: RDColors.secondary[600],
    transform: [{
      rotate: '45deg'
    }]
  }
});
//# sourceMappingURL=PopupBubbleText.js.map