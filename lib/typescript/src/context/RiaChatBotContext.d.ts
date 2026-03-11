import React from 'react';
import type { ReactNode } from 'react';
import type { RiaChatBotState, TChatMessageType, TPreviousChatSessionType, TPreviousChatMessageType, TLiveAgentHandoffDetailsType, RiaChatBotConfig } from '../types';
import { ApiService } from '../services/apiService';
interface RiaChatBotProviderProps {
    children: ReactNode;
    config: RiaChatBotConfig;
}
export declare const RiaChatBotProvider: React.FC<RiaChatBotProviderProps>;
export declare const useRiaChatBot: () => {
    chatMessages: TChatMessageType[];
    previousChatSession: TPreviousChatSessionType | null;
    previousChatHistory: TPreviousChatMessageType[];
    chatbotLoading: boolean;
    showChatbotLoadingMessage: boolean;
    screenName: string;
    livekitToken: string | null;
    chatSessionId: string | null;
    connectedToRoom: boolean;
    isLiveAgentHandoff: boolean;
    isLiveAgentConnected: boolean;
    liveAgentToAIHandoff: boolean;
    liveAgentHandoffDetails: TLiveAgentHandoffDetailsType;
    showChatWithUsModalState: boolean;
    showChatbotLoader: ({ showLoader, showMessage }: {
        showLoader: boolean;
        showMessage?: boolean;
    }) => void;
    setShowChatWithUsModal: (show: boolean) => void;
    storeChatMessage: (message: TChatMessageType | TChatMessageType[]) => void;
    persistPreviousChatHistory: (history: TPreviousChatMessageType[]) => void;
    persistChatSessionId: ({ chatSessionId }: {
        chatSessionId: string | null;
    }) => void;
    getLivekitToken: (reconnect?: boolean) => Promise<void>;
    sendMessageToChatwoot: ({ messageContent, systemGenerated }: {
        messageContent: string;
        systemGenerated?: boolean;
    }) => Promise<void>;
    setLiveAgentHandoffStatus: ({ isLiveAgentHandoff }: {
        isLiveAgentHandoff: boolean;
    }) => void;
    setIsLiveAgentConnected: (connected: boolean) => void;
    setLiveAgentToAIHandoff: (handoff: boolean) => void;
    setReconnectToRoom: (reconnect: boolean) => void;
    setConnectedToUltron: (connected: boolean) => void;
    storeLiveAgentHandoffDetails: (details: TLiveAgentHandoffDetailsType) => void;
    setConnectedToRoom: (connected: boolean) => void;
    updateMessageLike: (messageId: string, likeStatus: number) => void;
    toggleMessageLike: (messageId: string, likeStatus: number) => Promise<void>;
    showChatWithUsModal: (screenName?: string) => void;
    hideChatWithUsModal: () => void;
    clearChatMessages: () => void;
    fetchLivekitToken: (modality?: string, reconnect?: boolean) => Promise<void>;
    checkPreviousChatSession: () => Promise<void>;
    fetchPreviousChatHistory: (chatSessionId: string) => Promise<void>;
    state: RiaChatBotState;
    apiService: ApiService;
};
export {};
//# sourceMappingURL=RiaChatBotContext.d.ts.map