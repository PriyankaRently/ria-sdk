import { type JSX } from 'react';
interface ChatWithUsModalCallbacks {
    onModalOpened?: (params: {
        screenName: string;
        prospectId?: string;
    }) => void;
    onModalClosed?: (params: {
        screenName: string;
    }) => void;
    onSendMessage?: (params: {
        message: string;
        chatSessionId: string | null;
        isLiveAgentConnected: boolean;
    }) => void;
    onSendMessageFailed?: (params: {
        error: string;
        chatSessionId: string | null;
    }) => void;
    onLikePress?: (params: {
        messageId: string;
        likeStatus: number;
    }) => void;
    onEndChat?: () => void;
}
interface ChatWithUsModalProps extends ChatWithUsModalCallbacks {
    prospectId?: string;
    isOffline?: boolean;
}
/**
 * ChatWithUsModal renders a chat modal for users to interact with RIA chatbot or a live agent.
 * Features include message display, agent handoff, LiveKit integration, and conversation controls.
 *
 * @returns {JSX.Element} Chat modal component.
 */
export declare const ChatWithUsModal: ({ prospectId, isOffline, onModalOpened, onModalClosed, onSendMessage, onSendMessageFailed, onLikePress, onEndChat: onEndChatCallback, }?: ChatWithUsModalProps) => JSX.Element;
export {};
//# sourceMappingURL=ChatWithUsModal.d.ts.map