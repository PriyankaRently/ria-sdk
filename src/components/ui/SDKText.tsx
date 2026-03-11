import React from 'react';
import type { ReactNode } from 'react';
import { Text, type TextStyle } from 'react-native';
import { RDColors } from '../../assets';

export type TextVariant = 'Small' | 'XSmall' | 'Medium' | 'Large' | 'XLarge' | 'H5';
export type TextWeight = 'Regular' | 'Medium' | 'SemiBold' | 'Bold';
type Variant = TextVariant;
type Weight = TextWeight;

interface SDKTextProps {
  variant?: Variant;
  weight?: Weight;
  color?: string;
  children: ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const variantStyles: Record<TextVariant, TextStyle> = {
  XSmall: { fontSize: 12, lineHeight: 16 },
  Small: { fontSize: 14, lineHeight: 20 },
  Medium: { fontSize: 16, lineHeight: 24 },
  Large: { fontSize: 18, lineHeight: 28 },
  XLarge: { fontSize: 20, lineHeight: 30 },
  H5: { fontSize: 20, lineHeight: 28 },
};

const weightStyles: Record<Weight, TextStyle> = {
  Regular: { fontWeight: '400' },
  Medium: { fontWeight: '500' },
  SemiBold: { fontWeight: '600' },
  Bold: { fontWeight: '700' },
};

export const SDKText: React.FC<SDKTextProps> = ({
  variant = 'Medium',
  weight = 'Regular',
  color = RDColors.neutral[800],
  children,
  style,
  numberOfLines,
  ellipsizeMode,
}) => (
  <Text
    style={[variantStyles[variant], weightStyles[weight], { color }, style]}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}
  >
    {children}
  </Text>
);
