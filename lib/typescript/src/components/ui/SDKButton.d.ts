import React from 'react';
import { type ViewStyle } from 'react-native';
interface SDKButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    backgroundColor?: string;
    textColor?: string;
    style?: ViewStyle;
    variant?: 'primary' | 'secondary' | 'outline';
}
export declare const SDKButton: React.FC<SDKButtonProps>;
export {};
//# sourceMappingURL=SDKButton.d.ts.map