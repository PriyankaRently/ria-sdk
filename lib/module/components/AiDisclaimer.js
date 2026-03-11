"use strict";

import { View, StyleSheet } from 'react-native';
import { SDKText } from "./ui/index.js";
import { RDColors, Spacings } from "../assets/index.js";
import { useRiaChatBot } from "../context/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const AiDisclaimer = ({
  showDisclaimer
}) => {
  const {
    state
  } = useRiaChatBot();
  const {
    previousChatSession,
    chatMessages
  } = state;
  if (previousChatSession?.id || !showDisclaimer || chatMessages.length > 2) {
    return null;
  }
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsxs(SDKText, {
      variant: "XSmall",
      weight: "Regular",
      style: styles.disclaimerText,
      children: ["When using RIA, you are agreeing to Rently's", ' ', /*#__PURE__*/_jsx(SDKText, {
        variant: "XSmall",
        weight: "Regular",
        style: styles.linkText,
        children: "Terms of Use"
      }), ' ', "and", ' ', /*#__PURE__*/_jsx(SDKText, {
        variant: "XSmall",
        weight: "Regular",
        style: styles.linkText,
        children: "Privacy Policy"
      }), ". All conversations are recorded, shared, reviewed, and retained to improve Rently's AI performance."]
    })
  });
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.md,
    paddingVertical: Spacings.sm
  },
  disclaimerText: {
    color: RDColors.neutral[500],
    textAlign: 'center'
  },
  linkText: {
    color: RDColors.tertiary[600],
    textDecorationLine: 'underline'
  }
});
//# sourceMappingURL=AiDisclaimer.js.map