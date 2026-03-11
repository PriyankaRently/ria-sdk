import type { RiaChatBotConfig } from '../types';
export declare class ApiService {
    private config;
    constructor(config: RiaChatBotConfig);
    private getHeaders;
    private request;
    fetchLivekitToken(params: {
        modality?: string;
        reconnect?: boolean;
        chatSessionId?: string;
        disableGreet?: boolean;
    }): Promise<{
        success: boolean;
        access_token?: string;
    }>;
    checkPreviousChatSession(): Promise<{
        success: boolean;
        chat_session?: any;
    }>;
    fetchPreviousChatHistory(chatSessionId: string): Promise<any[]>;
    toggleMessageLike(chatSessionId: string, messageId: string, likeStatus: number): Promise<{
        success: boolean;
    }>;
    sendMessageToChatwoot(params: {
        chatSessionId: string;
        contactId: string;
        conversationId: string;
        messageContent: string;
        systemGenerated?: boolean;
    }): Promise<{
        success: boolean;
    }>;
    changeChatOwnership(newParticipantToken: string): Promise<{
        success: boolean;
    }>;
    updateConfig(updates: Partial<RiaChatBotConfig>): void;
}
//# sourceMappingURL=apiService.d.ts.map