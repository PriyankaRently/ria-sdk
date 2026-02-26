"use strict";

import { View, StyleSheet, Text } from "react-native";
import { Colors, Spacings } from "../tokens.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const LiveAgentHandoffBadge = ({
  timeExceeded
}) => {
  const message = timeExceeded ? "Due to higher than usual wait times, the next available representative will contact you directly from the following number: 1 (888) 340-6340" : "Hang tight! We're connecting you to someone now—this may take up to 5 minutes.";
  return /*#__PURE__*/_jsx(View, {
    style: styles.badge,
    children: /*#__PURE__*/_jsx(Text, {
      style: styles.text,
      children: message
    })
  });
};
export const NoNetworkBadge = () => {
  return /*#__PURE__*/_jsx(View, {
    style: styles.badge,
    children: /*#__PURE__*/_jsx(Text, {
      style: styles.text,
      children: "No network connection available."
    })
  });
};
const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    padding: Spacings.sm,
    marginVertical: Spacings.xx_sm
  },
  text: {
    fontSize: 14,
    color: Colors.neutral[100]
  }
});
//# sourceMappingURL=ChatbotBadges.js.map