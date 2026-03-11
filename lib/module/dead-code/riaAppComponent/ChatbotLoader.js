"use strict";

import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import { Spacings } from 'theme/ui/tokens';
import { RDText } from 'theme/ui/components';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ChatbotLoader = ({
  style
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const {
    showChatbotLoadingMessage
  } = useSelector(state => state.riaChatBot);
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
    children: [/*#__PURE__*/_jsx(Animated.Image, {
      source: require("../../../../assets/images/RentlyLogo/rently_icon.png"),
      style: [styles.logo, {
        transform: [{
          scale: scaleValue
        }]
      }]
    }), showChatbotLoadingMessage && /*#__PURE__*/_jsx(View, {
      style: styles.textContainer,
      children: /*#__PURE__*/_jsx(RDText, {
        variant: "Small",
        weight: "Regular",
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
  }
});
//# sourceMappingURL=ChatbotLoader.js.map