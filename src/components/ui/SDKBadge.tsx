import React from 'react';
import { View, type ViewStyle, StyleSheet } from 'react-native';
import { SDKText } from './SDKText';
import { RDColors } from '../../assets';

interface SDKBadgeProps {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  textVariant?: 'Small' | 'XSmall' | 'Medium';
  textWeight?: 'Regular' | 'Medium' | 'Bold';
  style?: ViewStyle;
}

export const SDKBadge: React.FC<SDKBadgeProps> = ({
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
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderRadius,
          borderColor,
          borderWidth,
          paddingVertical,
          paddingHorizontal,
        },
        style,
      ]}
    >
      {text && (
        <SDKText variant={textVariant} weight={textWeight} color={textColor}>
          {text}
        </SDKText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
