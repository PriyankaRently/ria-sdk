import React from 'react';
import { type ViewStyle } from 'react-native';
export type IconNameTypes = 'ThumbUpIcon' | 'ThumbDownIcon' | 'MinusIcon' | 'PaperAirplaneIcon' | 'XMarkIcon';
interface SDKHeroIconProps {
    iconName: IconNameTypes;
    size?: number;
    color?: string;
    fontWeight?: 'Regular' | 'Medium' | 'Bold';
    isSolid?: boolean;
    style?: ViewStyle;
}
/**
 * Placeholder icon component for SDK
 * In a real implementation, this would render actual icons
 * For now, renders colored boxes as placeholders
 */
export declare const SDKHeroIcon: ({ iconName: _iconName, size, color, fontWeight: _fontWeight, isSolid, style, }: SDKHeroIconProps) => React.ReactElement;
export {};
//# sourceMappingURL=SDKHeroIcon.d.ts.map