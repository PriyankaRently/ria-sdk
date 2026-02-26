import React from 'react';
type Message = {
    id: string;
    content: string;
    timestamp: string;
    user: 'AI' | 'PROSPECT' | 'LIVE_AGENT';
    likeStatus?: number;
};
interface ChatWithUsModalProps {
    showModal?: boolean;
    onClose?: () => void;
    chatMessages?: Message[];
    isTyping?: boolean;
    showLoader?: boolean;
    showNoNetwork?: boolean;
    showLiveAgentHandoff?: boolean;
    timeExceeded?: boolean;
    showDisclaimer?: boolean;
    previousChatSession?: any;
    onInputFocus?: () => void;
    keyboardVisible?: boolean;
    onInputHeightChange?: () => void;
    onSend?: () => void;
    disabled?: boolean;
    text?: string;
    onTextChange?: (text: string) => void;
    showTextInput?: boolean;
    onPressNotContinueChat?: () => void;
    onPressYesContinueChat?: () => void;
    isOffline?: boolean;
    isLiveAgentConnected?: boolean;
    isLiveAgentHandoff?: boolean;
    onEndChat?: () => void;
    showEndDropdown?: boolean;
    onToggleEndDropdown?: () => void;
    logoUri?: string;
}
export declare const ChatWithUsModal: React.FC<ChatWithUsModalProps>;
export {};
//# sourceMappingURL=ChatWithUsModal.d.ts.map