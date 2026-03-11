import React from 'react';
import type { ReactNode } from 'react';
import { Pressable, type ViewStyle, type PressableProps, StyleSheet } from 'react-native';

interface SDKPressableProps extends Omit<PressableProps, 'style'> {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  onPress?: () => void;
}

export const SDKPressable: React.FC<SDKPressableProps> = ({
  children,
  style,
  disabled = false,
  onPress,
  ...rest
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        StyleSheet.flatten(style),
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
      onPress={onPress}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
