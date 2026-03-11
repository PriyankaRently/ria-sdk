import React from 'react';
import { type ViewStyle, StyleSheet } from 'react-native';
import { SDKText } from './SDKText';
import { SDKPressable } from './SDKPressable';
import { RDColors } from '../../assets';

interface SDKButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const SDKButton: React.FC<SDKButtonProps> = ({
  title,
  onPress,
  disabled = false,
  backgroundColor,
  textColor,
  style,
  variant = 'primary',
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

  return (
    <SDKPressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: variant === 'outline' ? RDColors.neutral[300] : 'transparent',
        },
        ...(style ? [style] : []),
      ]}
    >
      <SDKText variant="Medium" weight="Medium" color={getTextColor()}>
        {title}
      </SDKText>
    </SDKPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
