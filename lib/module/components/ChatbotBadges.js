"use strict";

import { View, StyleSheet, Image } from 'react-native';
import { SDKText } from "./ui/index.js";
import { RDColors, Spacings } from "../assets/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LiveAgentHandoffBadge = ({
  timeExceeded: _timeExceeded,
  style
}) => {
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    children: [/*#__PURE__*/_jsx(Image, {
      source: require('../assets/icons/rentlyChatIcon.png'),
      style: styles.icon,
      resizeMode: "contain"
    }), /*#__PURE__*/_jsx(SDKText, {
      variant: "Small",
      weight: "Medium",
      children: "Connecting to a live agent..."
    })]
  });
};
export const NoNetworkBadge = ({
  style
}) => {
  return /*#__PURE__*/_jsx(View, {
    style: [styles.container, styles.errorContainer, style],
    children: /*#__PURE__*/_jsx(SDKText, {
      variant: "Small",
      weight: "Medium",
      color: RDColors.neutral[700],
      children: "No Internet Connection"
    })
  });
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacings.md,
    paddingVertical: Spacings.sm,
    backgroundColor: RDColors['background-overlays'][600],
    borderRadius: 20,
    gap: Spacings.x_sm
  },
  errorContainer: {
    backgroundColor: RDColors.neutral[100]
  },
  icon: {
    width: 24,
    height: 24
  }
});
//# sourceMappingURL=ChatbotBadges.js.map