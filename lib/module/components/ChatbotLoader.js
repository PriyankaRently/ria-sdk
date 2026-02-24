"use strict";

import React from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';
import { RDColors, Spacings } from "../tokens.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ChatbotLoader = ({
  style,
  showChatbotLoadingMessage = false
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
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
    return () => scaleAnimation.stop();
  }, []);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    children: [/*#__PURE__*/_jsx(Animated.View, {
      style: [styles.logo, {
        transform: [{
          scale: scaleValue
        }]
      }],
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.logoText,
        children: "Loading"
      })
    }), showChatbotLoadingMessage && /*#__PURE__*/_jsx(View, {
      style: styles.textContainer,
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.loaderMessage,
        children: "We're having issues connecting to our servers. Try closing the app and starting a new conversation."
      })
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacings.sm
  },
  textContainer: {
    marginTop: Spacings.md,
    marginHorizontal: Spacings.md
  },
  loaderMessage: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: RDColors.gray[700]
  },
  logo: {
    width: 32,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
    fontSize: 12,
    color: RDColors.neutral[600]
  }
});
//# sourceMappingURL=ChatbotLoader.js.map