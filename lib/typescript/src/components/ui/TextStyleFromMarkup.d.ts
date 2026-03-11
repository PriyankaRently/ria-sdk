import React from 'react';
import { type TextVariant, type TextWeight } from './SDKText';
interface TextStyleFromMarkupProps {
    text: string;
    variant?: TextVariant;
    weight?: TextWeight;
    color?: string;
}
/**
 * Simple markdown-style text renderer for SDK
 * Handles basic formatting without external dependencies
 */
export declare const TextStyleFromMarkup: ({ text, variant, weight, color, }: TextStyleFromMarkupProps) => React.ReactElement;
export {};
//# sourceMappingURL=TextStyleFromMarkup.d.ts.map