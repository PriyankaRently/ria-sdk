import { type JSX } from 'react';
interface TChatMessageType {
    id?: string;
    content?: string;
    timestamp?: string;
    user?: string;
    senderName?: string;
    likeStatus?: number;
}
interface ChatMessageTextProps {
    message: TChatMessageType;
    onLike?: (messageId: string, likeStatus: number) => void;
    onDislike?: (messageId: string, likeStatus: number) => void;
    chatWidgetUri?: string;
    rentlyChatIconUri?: string;
}
export declare const LiveAgentMessageText: ({ message, rentlyChatIconUri }: {
    message: TChatMessageType;
    rentlyChatIconUri?: string;
}) => JSX.Element;
export declare const AIChatMessageText: ({ message, onLike, onDislike, chatWidgetUri }: {
    message: TChatMessageType;
    onLike?: (messageId: string, likeStatus: number) => void;
    onDislike?: (messageId: string, likeStatus: number) => void;
    chatWidgetUri?: string;
}) => JSX.Element;
export declare const UserChatMessageText: ({ message }: {
    message: TChatMessageType;
}) => JSX.Element;
export declare const ChatMessageText: ({ message, onLike, onDislike, chatWidgetUri, rentlyChatIconUri }: ChatMessageTextProps) => JSX.Element;
export {};
//# sourceMappingURL=ChatMessageText.d.ts.map