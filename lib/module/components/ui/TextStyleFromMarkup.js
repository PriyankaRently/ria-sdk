"use strict";

import React from 'react';
import { SDKText } from "./SDKText.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Simple markdown-style text renderer for SDK
 * Handles basic formatting without external dependencies
 */
export const TextStyleFromMarkup = ({
  text,
  variant = 'Small',
  weight = 'Regular',
  color
}) => {
  // For now, render as plain text - can be enhanced later
  // to support basic markdown (bold, italic, links, etc.)
  return /*#__PURE__*/_jsx(SDKText, {
    variant: variant,
    weight: weight,
    color: color,
    children: text
  });
};
//# sourceMappingURL=TextStyleFromMarkup.js.map