"use strict";

import { Linking, View, StyleSheet, Text } from "react-native";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const AiDisclaimer = ({
  showDisclaimer = true,
  previousChatSession = {
    id: null
  },
  chatMessages = []
}) => {
  if (previousChatSession?.id || !showDisclaimer || chatMessages.length > 2) {
    return null;
  }
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsxs(Text, {
      style: styles.disclaimerText,
      children: ["When using RIA, you are agreeing to Rently\u2019s", ' ', /*#__PURE__*/_jsx(Text, {
        style: styles.linkText,
        onPress: () => Linking.openURL("https://use.rently.com/terms-of-use"),
        children: "Terms of Use"
      }), ' ', "and", ' ', /*#__PURE__*/_jsx(Text, {
        style: styles.linkText,
        onPress: () => Linking.openURL("https://use.rently.com/privacy-policy"),
        children: "Privacy Policy"
      }), ". All conversations are recorded, shared, reviewed, and retained to improve Rently's AI performance."]
    })
  });
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginTop: 8
  },
  disclaimerText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280'
  },
  linkText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#7C3AED'
  }
});
//# sourceMappingURL=AiDisclaimer.js.map