"use strict";

import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
export const SDKPressable = ({
  children,
  style,
  disabled = false,
  onPress,
  ...rest
}) => {
  return /*#__PURE__*/_jsx(Pressable, {
    style: ({
      pressed
    }) => [StyleSheet.flatten(style), pressed && !disabled && styles.pressed, disabled && styles.disabled],
    disabled: disabled,
    onPress: onPress,
    ...rest,
    children: children
  });
};
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7
  },
  disabled: {
    opacity: 0.5
  }
});
//# sourceMappingURL=SDKPressable.js.map