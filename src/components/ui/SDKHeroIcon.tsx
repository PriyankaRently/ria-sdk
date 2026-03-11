import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { RDColors } from '../../assets/colors';

export type IconNameTypes =
  | 'ThumbUpIcon'
  | 'ThumbDownIcon'
  | 'MinusIcon'
  | 'PaperAirplaneIcon'
  | 'XMarkIcon';

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
export const SDKHeroIcon = ({
  iconName: _iconName,
  size = 24,
  color = RDColors.neutral[700],
  fontWeight: _fontWeight = 'Regular',
  isSolid = false,
  style,
}: SDKHeroIconProps): React.ReactElement => {
  // Placeholder implementation - would use actual icon library in production
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          backgroundColor: isSolid ? color : 'transparent',
          borderWidth: isSolid ? 0 : 1,
          borderColor: color,
          borderRadius: 4,
        },
        style,
      ]}
    />
  );
};
