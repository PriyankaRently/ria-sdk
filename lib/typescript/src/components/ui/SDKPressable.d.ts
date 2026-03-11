import React from 'react';
import type { ReactNode } from 'react';
import { type ViewStyle, type PressableProps } from 'react-native';
interface SDKPressableProps extends Omit<PressableProps, 'style'> {
    children: ReactNode;
    style?: ViewStyle | ViewStyle[];
    disabled?: boolean;
    onPress?: () => void;
}
export declare const SDKPressable: React.FC<SDKPressableProps>;
export {};
//# sourceMappingURL=SDKPressable.d.ts.map