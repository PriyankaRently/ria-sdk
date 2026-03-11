"use strict";

export class ApiService {
  constructor(config) {
    this.config = config;
  }
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Participant-Token': this.config.participantToken || '',
      'Participant-Type': this.config.participantType || 'AnonymousUser'
    };
  }
  async request(endpoint, options = {}) {
    const url = `${this.config.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      this.config.onError?.(error);
      throw error;
    }
  }

  // LiveKit Token API
  async fetchLivekitToken(params) {
    const {
      modality = 'text',
      reconnect = false,
      chatSessionId,
      disableGreet = false
    } = params;
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
          ...(this.config.userInfo?.email && {
            email: this.config.userInfo.email
          }),
          ...(this.config.userInfo?.phone && {
            phone: this.config.userInfo.phone
          }),
          ...(this.config.userInfo?.name && {
            name: this.config.userInfo.name
          }),
          ...(chatSessionId && {
            chat_session_id: chatSessionId
          }),
          ...(disableGreet && {
            disable_greet: 'true'
          })
        }
      }
    };
    return this.request('/api/v1/livekit/tokens', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // Check Previous Chat Session
  async checkPreviousChatSession() {
    return this.request('/api/v1/chat_sessions/last', {
      method: 'GET'
    });
  }

  // Fetch Previous Chat History
  async fetchPreviousChatHistory(chatSessionId) {
    return this.request(`/api/v1/chat_sessions/${chatSessionId}/chat_messages`, {
      method: 'GET'
    });
  }

  // Toggle Message Like
  async toggleMessageLike(chatSessionId, messageId, likeStatus) {
    return this.request(`/api/v1/chat_sessions/${chatSessionId}/chat_messages/${messageId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        chat_message: {
          helpful: likeStatus
        }
      })
    });
  }

  // Send Message to Chatwoot
  async sendMessageToChatwoot(params) {
    const {
      chatSessionId,
      contactId,
      conversationId,
      messageContent,
      systemGenerated = false
    } = params;
    return this.request('/api/v1/chatwoot/messages', {
      method: 'POST',
      body: JSON.stringify({
        chat_session_id: chatSessionId,
        contact_id: contactId,
        conversation_id: conversationId,
        message: {
          content: messageContent
        },
        system_generated: systemGenerated
      })
    });
  }

  // Change Chat Ownership
  async changeChatOwnership(newParticipantToken) {
    return this.request('/api/v1/chat_sessions/change_ownership', {
      method: 'POST',
      body: JSON.stringify({
        new_participant_token: newParticipantToken
      })
    });
  }

  // Update config (useful for updating participant token after login)
  updateConfig(updates) {
    this.config = {
      ...this.config,
      ...updates
    };
  }
}
//# sourceMappingURL=apiService.js.map