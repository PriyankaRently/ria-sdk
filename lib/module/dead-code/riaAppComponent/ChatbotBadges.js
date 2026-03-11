"use strict";

import React from "react";
import { View, StyleSheet } from "react-native";
import { RDHeroIcon, RDText } from "theme/ui/components";
import { RDColors, Spacings } from "theme/ui/tokens";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LiveAgentHandoffBadge = ({
  timeExceeded
}) => {
  const message = timeExceeded ? "Due to higher than usual wait times, the next available representative will contact you directly from the following number: 1 (888) 340-6340" : "Hang tight! We're connecting you to someone now—this may take up to 5 minutes.";
  return /*#__PURE__*/_jsxs(View, {
    style: styles.badge,
    children: [/*#__PURE__*/_jsx(RDHeroIcon, {
      iconName: timeExceeded ? "DeviceMobileIcon" : "SwitchHorizontalIcon",
      size: 24,
      style: styles.iconStyle
    }), /*#__PURE__*/_jsx(RDText, {
      children: message
    })]
  });
};
export const NoNetworkBadge = () => {
  return /*#__PURE__*/_jsxs(View, {
    style: styles.badge,
    children: [/*#__PURE__*/_jsx(RDHeroIcon, {
      iconName: "StatusOfflineIcon",
      size: 24,
      style: styles.iconStyle
    }), /*#__PURE__*/_jsx(RDText, {
      children: "No network connection available."
    })]
  });
};
const styles = StyleSheet.create({
  badge: {
    backgroundColor: RDColors["background-overlays"][600],
    borderRadius: Spacings.sm,
    padding: Spacings.sm,
    marginVertical: Spacings.x_sm
  },
  iconStyle: {
    marginBottom: Spacings.xx_sm
  }
});
//# sourceMappingURL=ChatbotBadges.js.map