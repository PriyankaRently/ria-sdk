import { type JSX } from 'react';
interface TChatMessageType {
    id?: string;
    content?: string;
    timestamp?: string;
    user?: string;
    senderName?: string;
    likeStatus?: number;
}
export declare const LiveAgentMessageText: ({ message, onLike, onDislike }: {
    message: TChatMessageType;
    onLike?: () => void;
    onDislike?: () => void;
}) => JSX.Element;
export declare const AIChatMessageText: ({ message }: {
    message: TChatMessageType;
}) => JSX.Element;
export declare const UserChatMessageText: ({ message }: {
    message: TChatMessageType;
}) => JSX.Element;
export declare const ChatMessageText: ({ message }: {
    message: TChatMessageType;
}) => JSX.Element;
export {};
//# sourceMappingURL=ChatMessageText.d.ts.map