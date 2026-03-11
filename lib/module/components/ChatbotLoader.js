"use strict";

import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { SDKText } from "./ui/index.js";
import { Spacings } from "../assets/index.js";
import { useRiaChatBot } from "../context/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ChatbotLoader = ({
  style
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const {
    state
  } = useRiaChatBot();
  const {
    showChatbotLoadingMessage
  } = state;
  React.useEffect(() => {
    const scaleAnimation = Animated.loop(Animated.sequence([Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 750,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }), Animated.timing(scaleValue, {
      toValue: 1,
      duration: 750,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    })]));
    scaleAnimation.start();
    return () => {
      scaleAnimation.stop();
    };
  }, [scaleValue]);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    children: [/*#__PURE__*/_jsx(Animated.Image, {
      source: require('../assets/icons/rentlyChatIcon.png'),
      style: [styles.image, {
        transform: [{
          scale: scaleValue
        }]
      }],
      resizeMode: "contain"
    }), showChatbotLoadingMessage && /*#__PURE__*/_jsx(SDKText, {
      variant: "Small",
      weight: "Regular",
      style: styles.text,
      children: "Loading..."
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacings.sm
  },
  image: {
    width: 80,
    height: 80
  },
  text: {
    marginTop: Spacings.sm
  }
});
//# sourceMappingURL=ChatbotLoader.js.map