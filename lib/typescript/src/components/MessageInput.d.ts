import { type JSX } from 'react';
interface TMessageInputProps {
    onInputFocus?: () => void;
    keyboardVisible?: boolean;
    onInputHeightChange?: () => void;
    text?: string;
    onTextChange?: (text: string) => void;
    onSend?: () => void;
    disabled?: boolean;
}
export declare const MessageInput: ({ onInputFocus, keyboardVisible, onInputHeightChange, text, onTextChange, onSend, disabled, }: TMessageInputProps) => JSX.Element;
export {};
//# sourceMappingURL=MessageInput.d.ts.map