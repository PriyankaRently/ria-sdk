import { type JSX } from 'react';
import { type ImageSourcePropType } from 'react-native';
interface ChatWidgetIconProps {
    bottom?: number;
    right?: number;
    screenName: string;
    enableShineAnimation?: boolean;
    iconUri?: string | ImageSourcePropType;
    onPress?: (screenName: string) => void;
}
export declare const ChatWidgetIcon: ({ bottom, right, screenName, enableShineAnimation, iconUri, onPress: onPressCallback, }: ChatWidgetIconProps) => JSX.Element | null;
export {};
//# sourceMappingURL=ChatWidgetIcon.d.ts.map