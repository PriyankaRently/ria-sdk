"use strict";

import React from 'react';
import { Text } from 'react-native';
import { RDColors } from "../../assets/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const variantStyles = {
  XSmall: {
    fontSize: 12,
    lineHeight: 16
  },
  Small: {
    fontSize: 14,
    lineHeight: 20
  },
  Medium: {
    fontSize: 16,
    lineHeight: 24
  },
  Large: {
    fontSize: 18,
    lineHeight: 28
  },
  XLarge: {
    fontSize: 20,
    lineHeight: 30
  },
  H5: {
    fontSize: 20,
    lineHeight: 28
  }
};
const weightStyles = {
  Regular: {
    fontWeight: '400'
  },
  Medium: {
    fontWeight: '500'
  },
  SemiBold: {
    fontWeight: '600'
  },
  Bold: {
    fontWeight: '700'
  }
};
export const SDKText = ({
  variant = 'Medium',
  weight = 'Regular',
  color = RDColors.neutral[800],
  children,
  style,
  numberOfLines,
  ellipsizeMode
}) => /*#__PURE__*/_jsx(Text, {
  style: [variantStyles[variant], weightStyles[weight], {
    color
  }, style],
  numberOfLines: numberOfLines,
  ellipsizeMode: ellipsizeMode,
  children: children
});
//# sourceMappingURL=SDKText.js.map