"use strict";

import { View, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacings } from "../tokens.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * PopupBubbleText component for displaying a pop up bubble with text.
 * Uses a linear gradient background for the bubble border.
 */
export const PopupBubbleText = ({
  text,
  style = {}
}) => {
  return /*#__PURE__*/_jsx(View, {
    style: [styles.container, style],
    children: /*#__PURE__*/_jsx(LinearGradient, {
      colors: [Colors.primary[600], Colors.secondary[600]],
      start: {
        x: 0.01,
        y: 0
      },
      end: {
        x: 0.99,
        y: 0
      },
      angle: 89.42,
      style: styles.gradientBorder,
      children: /*#__PURE__*/_jsx(View, {
        style: styles.textContainer,
        children: /*#__PURE__*/_jsx(Text, {
          style: styles.text,
          children: text
        })
      })
    })
  });
};
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    alignSelf: 'flex-start'
  },
  gradientBorder: {
    borderRadius: 80,
    opacity: 1,
    alignSelf: 'flex-start',
    overflow: 'hidden'
  },
  textContainer: {
    backgroundColor: Colors.neutral[900],
    paddingHorizontal: Spacings.md,
    paddingVertical: Spacings.x_sm,
    borderRadius: 80,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2
  },
  text: {
    color: Colors.neutral[100],
    fontSize: 12,
    fontWeight: '500'
  }
});
//# sourceMappingURL=PopupBubbleText.js.map