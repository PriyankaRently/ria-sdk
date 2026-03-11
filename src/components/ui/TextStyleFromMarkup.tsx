import React from 'react';
import { SDKText } from './SDKText';
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
export const TextStyleFromMarkup = ({
  text,
  variant = 'Small',
  weight = 'Regular',
  color,
}: TextStyleFromMarkupProps): React.ReactElement => {
  // For now, render as plain text - can be enhanced later
  // to support basic markdown (bold, italic, links, etc.)
  return (
    <SDKText variant={variant} weight={weight} color={color}>
      {text}
    </SDKText>
  );
};
