"use strict";

import React from 'react';
import { View } from 'react-native';
import { RDColors } from "../../assets/colors.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Placeholder icon component for SDK
 * In a real implementation, this would render actual icons
 * For now, renders colored boxes as placeholders
 */
export const SDKHeroIcon = ({
  iconName: _iconName,
  size = 24,
  color = RDColors.neutral[700],
  fontWeight: _fontWeight = 'Regular',
  isSolid = false,
  style
}) => {
  // Placeholder implementation - would use actual icon library in production
  return /*#__PURE__*/_jsx(View, {
    style: [{
      width: size,
      height: size,
      backgroundColor: isSolid ? color : 'transparent',
      borderWidth: isSolid ? 0 : 1,
      borderColor: color,
      borderRadius: 4
    }, style]
  });
};
//# sourceMappingURL=SDKHeroIcon.js.map