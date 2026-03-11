import { type JSX } from 'react';
interface TMessageInputProps {
    onInputFocus: () => void;
    keyboardVisible?: boolean;
    onInputHeightChange: () => void;
    onSendMessage?: (params: {
        message: string;
        chatSessionId: string | null;
        isLiveAgentConnected: boolean;
    }) => void;
    onSendMessageFailed?: (params: {
        error: string;
        chatSessionId: string | null;
    }) => void;
    isOffline?: boolean;
}
export declare const MessageInput: ({ onInputFocus, keyboardVisible, onInputHeightChange, onSendMessage: onSendMessageCallback, onSendMessageFailed, isOffline, }: TMessageInputProps) => JSX.Element;
export {};
//# sourceMappingURL=MessageInput.d.ts.map