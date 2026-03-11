import React from 'react';
import type { ReactNode } from 'react';
import { type TextStyle } from 'react-native';
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
export declare const SDKText: React.FC<SDKTextProps>;
export {};
//# sourceMappingURL=SDKText.d.ts.map