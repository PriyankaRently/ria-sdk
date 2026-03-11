"use strict";

import React from 'react';
import { StyleSheet } from 'react-native';
import { SDKText } from "./SDKText.js";
import { SDKPressable } from "./SDKPressable.js";
import { RDColors } from "../../assets/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const SDKButton = ({
  title,
  onPress,
  disabled = false,
  backgroundColor,
  textColor,
  style,
  variant = 'primary'
}) => {
  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    if (disabled) return RDColors.neutral[300];
    switch (variant) {
      case 'primary':
        return RDColors.secondary[600];
      case 'secondary':
        return RDColors.neutral[100];
      case 'outline':
        return 'transparent';
      default:
        return RDColors.secondary[600];
    }
  };
  const getTextColor = () => {
    if (textColor) return textColor;
    switch (variant) {
      case 'primary':
        return RDColors.shades[0];
      case 'secondary':
      case 'outline':
        return RDColors.neutral[800];
      default:
        return RDColors.shades[0];
    }
  };
  return /*#__PURE__*/_jsx(SDKPressable, {
    onPress: onPress,
    disabled: disabled,
    style: [styles.button, {
      backgroundColor: getBackgroundColor(),
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? RDColors.neutral[300] : 'transparent'
    }, ...(style ? [style] : [])],
    children: /*#__PURE__*/_jsx(SDKText, {
      variant: "Medium",
      weight: "Medium",
      color: getTextColor(),
      children: title
    })
  });
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=SDKButton.js.map