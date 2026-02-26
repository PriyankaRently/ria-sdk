"use strict";

import React from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';
import { Colors, Spacings } from "../tokens.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ChatbotLoader = ({
  style,
  showChatbotLoadingMessage = false,
  logoUri
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
  }, [scaleValue]);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    children: [logoUri ? /*#__PURE__*/_jsx(Animated.Image, {
      source: {
        uri: logoUri
      },
      style: [styles.logo, {
        transform: [{
          scale: scaleValue
        }]
      }]
    }) : /*#__PURE__*/_jsx(Animated.View, {
      style: [styles.logo, {
        transform: [{
          scale: scaleValue
        }]
      }],
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.logoText,
        children: "\uD83D\uDCAC"
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
    paddingBottom: Spacings.lg
  },
  textContainer: {
    marginTop: Spacings.md,
    marginHorizontal: Spacings.lg
  },
  loaderMessage: {
    textAlign: 'center'
  },
  logo: {
    width: 32,
    height: 48,
    resizeMode: 'contain'
  },
  logoText: {
    fontSize: 12,
    color: Colors.neutral[600]
  }
});
//# sourceMappingURL=ChatbotLoader.js.map