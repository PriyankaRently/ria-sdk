import type { RiaChatBotConfig } from '../types';

export class ApiService {
  private config: RiaChatBotConfig;

  constructor(config: RiaChatBotConfig) {
    this.config = config;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Participant-Token': this.config.participantToken || '',
      'Participant-Type': this.config.participantType || 'AnonymousUser',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      this.config.onError?.(error as Error);
      throw error;
    }
  }

  // LiveKit Token API
  async fetchLivekitToken(params: {
    modality?: string;
    reconnect?: boolean;
    chatSessionId?: string;
    disableGreet?: boolean;
  }): Promise<{ success: boolean; access_token?: string }> {
    const { modality = 'text', reconnect = false, chatSessionId, disableGreet = false } = params;
    
    const identity = this.config.participantToken || Math.random().toString(36).substring(2);
    
    const payload = {
      room_name: Math.random().toString(36).substring(2),
      participant: {
        name: 'user',
        identity,
        attributes: {
          isVerifiedRenter: this.config.isVerifiedRenter ? '1' : '0',
          modality,
          'participant-token': this.config.participantToken || '',
          'participant-type': this.config.participantType || 'AnonymousUser',
          reconnect: reconnect ? 'true' : 'false',
          source: 'sdk',
          ...(this.config.userInfo?.email && { email: this.config.userInfo.email }),
          ...(this.config.userInfo?.phone && { phone: this.config.userInfo.phone }),
          ...(this.config.userInfo?.name && { name: this.config.userInfo.name }),
          ...(chatSessionId && { chat_session_id: chatSessionId }),
          ...(disableGreet && { disable_greet: 'true' }),
        },
      },
    };

    return this.request<{ success: boolean; access_token?: string }>(
      '/api/v1/livekit/tokens',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
  }

  // Check Previous Chat Session
  async checkPreviousChatSession(): Promise<{
    success: boolean;
    chat_session?: any;
  }> {
    return this.request('/api/v1/chat_sessions/last', {
      method: 'GET',
    });
  }

  // Fetch Previous Chat History
  async fetchPreviousChatHistory(chatSessionId: string): Promise<any[]> {
    return this.request(
      `/api/v1/chat_sessions/${chatSessionId}/chat_messages`,
      {
        method: 'GET',
      }
    );
  }

  // Toggle Message Like
  async toggleMessageLike(
    chatSessionId: string,
    messageId: string,
    likeStatus: number
  ): Promise<{ success: boolean }> {
    return this.request(
      `/api/v1/chat_sessions/${chatSessionId}/chat_messages/${messageId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          chat_message: {
            helpful: likeStatus,
          },
        }),
      }
    );
  }

  // Send Message to Chatwoot
  async sendMessageToChatwoot(params: {
    chatSessionId: string;
    contactId: string;
    conversationId: string;
    messageContent: string;
    systemGenerated?: boolean;
  }): Promise<{ success: boolean }> {
    const { chatSessionId, contactId, conversationId, messageContent, systemGenerated = false } = params;

    return this.request('/api/v1/chatwoot/messages', {
      method: 'POST',
      body: JSON.stringify({
        chat_session_id: chatSessionId,
        contact_id: contactId,
        conversation_id: conversationId,
        message: {
          content: messageContent,
        },
        system_generated: systemGenerated,
      }),
    });
  }

  // Change Chat Ownership
  async changeChatOwnership(newParticipantToken: string): Promise<{ success: boolean }> {
    return this.request('/api/v1/chat_sessions/change_ownership', {
      method: 'POST',
      body: JSON.stringify({
        new_participant_token: newParticipantToken,
      }),
    });
  }

  // Update config (useful for updating participant token after login)
  updateConfig(updates: Partial<RiaChatBotConfig>): void {
    this.config = { ...this.config, ...updates };
  }
}
