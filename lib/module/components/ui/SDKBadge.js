"use strict";

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SDKText } from "./SDKText.js";
import { RDColors } from "../../assets/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const SDKBadge = ({
  text,
  backgroundColor = RDColors.neutral[100],
  textColor = RDColors.neutral[800],
  borderRadius = 12,
  borderColor,
  borderWidth = 0,
  paddingVertical = 8,
  paddingHorizontal = 12,
  textVariant = 'Small',
  textWeight = 'Medium',
  style
}) => {
  return /*#__PURE__*/_jsx(View, {
    style: [styles.container, {
      backgroundColor,
      borderRadius,
      borderColor,
      borderWidth,
      paddingVertical,
      paddingHorizontal
    }, style],
    children: text && /*#__PURE__*/_jsx(SDKText, {
      variant: textVariant,
      weight: textWeight,
      color: textColor,
      children: text
    })
  });
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=SDKBadge.js.map