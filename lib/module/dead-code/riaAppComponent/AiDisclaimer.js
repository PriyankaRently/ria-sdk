"use strict";

import React from "react";
import { Linking, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RDText } from "theme/ui/components";
import { RDColors, Spacings } from "theme/ui/tokens";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const AiDisclaimer = ({
  showDisclaimer
}) => {
  const {
    previousChatSession,
    chatMessages
  } = useSelector(state => state.riaChatBot);
  if (previousChatSession?.id || !showDisclaimer || chatMessages.length > 2) {
    return null;
  }
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsxs(RDText, {
      variant: "XSmall",
      weight: "Regular",
      style: styles.disclaimerText,
      children: ["When using RIA, you are agreeing to Rently\u2019s", ' ', /*#__PURE__*/_jsx(RDText, {
        variant: "XSmall",
        weight: "Regular",
        style: styles.linkText,
        onPress: () => Linking.openURL("https://use.rently.com/terms-of-use"),
        children: "Terms of Use"
      }), ' ', "and", ' ', /*#__PURE__*/_jsx(RDText, {
        variant: "XSmall",
        weight: "Regular",
        style: styles.linkText,
        onPress: () => Linking.openURL("https://use.rently.com/privacy-policy"),
        children: "Privacy Policy"
      }), ". All conversations are recorded, shared, reviewed, and retained to improve Rently's AI performance."]
    })
  });
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacings.x_sm,
    marginTop: Spacings.sm
  },
  disclaimerText: {
    color: RDColors.neutral[500]
  },
  linkText: {
    color: RDColors.tertiary[600]
  }
});
//# sourceMappingURL=AiDisclaimer.js.map