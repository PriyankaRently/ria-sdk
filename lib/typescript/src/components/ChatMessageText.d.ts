import type { JSX } from 'react';
import { type TChatMessageType } from '../types';
export declare const LiveAgentMessageText: ({ message, }: {
    message: TChatMessageType;
}) => JSX.Element;
export declare const AIChatMessageText: ({ message, onLikePress: onLikePressCallback, }: {
    message: TChatMessageType;
    onLikePress?: (params: {
        messageId: string;
        likeStatus: number;
    }) => void;
}) => JSX.Element;
export declare const UserChatMessageText: ({ message, }: {
    message: TChatMessageType;
}) => JSX.Element;
export declare const ChatMessageText: ({ message, onLikePress, }: {
    message: TChatMessageType;
    onLikePress?: (params: {
        messageId: string;
        likeStatus: number;
    }) => void;
}) => JSX.Element;
//# sourceMappingURL=ChatMessageText.d.ts.map