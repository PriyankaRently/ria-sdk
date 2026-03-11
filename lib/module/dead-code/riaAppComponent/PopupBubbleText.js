"use strict";

import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RDText } from 'theme/ui/components';
import { vs } from 'theme/ui/lib';
import { RDColors, Spacings } from 'theme/ui/tokens';
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
      colors: ['#5F9EF8', '#B993F7'],
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
        children: /*#__PURE__*/_jsx(RDText, {
          variant: "XSmall",
          weight: "Medium",
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
    backgroundColor: RDColors.shades[200],
    paddingHorizontal: Spacings.md,
    paddingVertical: Spacings.x_sm,
    borderRadius: vs(80),
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    margin: vs(2),
    gap: Spacings.x_sm
  },
  text: {
    color: RDColors.shades[0]
  }
});
//# sourceMappingURL=PopupBubbleText.js.map