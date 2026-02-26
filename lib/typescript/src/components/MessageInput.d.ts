import { type JSX } from 'react';
interface TMessage {
    id?: string;
    content?: string;
    timestamp?: string;
    user?: string;
    senderName?: string;
    likeStatus?: number;
}
interface TMessageInputProps {
    onInputFocus?: () => void;
    keyboardVisible?: boolean;
    onInputHeightChange?: () => void;
    text?: string;
    onTextChange?: (text: string) => void;
    onSend?: () => void;
    disabled?: boolean;
    responseMessage?: TMessage;
    chatWidgetUri?: string;
    onLike?: (messageId: string, likeStatus: number) => void;
    onDislike?: (messageId: string, likeStatus: number) => void;
}
export declare const MessageInput: ({ onInputFocus, keyboardVisible, onInputHeightChange, text, onTextChange, onSend, disabled, responseMessage, chatWidgetUri, onLike, onDislike, }: TMessageInputProps) => JSX.Element;
export {};
//# sourceMappingURL=MessageInput.d.ts.map