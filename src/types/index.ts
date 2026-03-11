export interface TChatMessageType {
  user: string;
  timestamp?: string;
  content: string;
  id: string;
  likeStatus?: number; // 1 for like, -1 for dislike, 0 for neutral
  senderName?: string;
  isFinal?: boolean;
}

export enum CHATBOT_USER_ENUM {
  AI = 'AI',
  PROSPECT = 'Prospect',
  LIVE_AGENT = 'LiveAgent',
}

export interface TPreviousChatSessionType {
  id: string;
  created_at: string;
  ended_at: string | null;
  livekit_session_id: string;
  participant_id: string;
  participant_type: string;
  phone_number: string | null;
  started_at: string;
  summary: string | null;
  tags: string[] | null;
  updated_at: string;
}

export interface TPreviousChatMessageType {
  created_at: string;
  updated_at: string;
  id: string;
  chat_session_id: string;
  modality: number;
  content: string;
  role: number;
  confidence_score: number;
  helpful?: number;
  agent_name?: string;
}

export interface TLiveAgentHandoffDetailsType {
  contact_id: string;
  conversation_id: string;
  email: string;
  name: string;
  phone_number: string;
  pubsub_token: string;
  salesforce_case_id: string;
}

export interface RiaChatBotState {
  chatbotLoading: boolean;
  showChatbotLoadingMessage: boolean;
  showChatWithUsModal: boolean;
  currentPropId: number | null;
  screenName: string;
  livekitToken: string | null;
  getLivekitToken: boolean;
  reconnectionAttempt: number;
  connectedToRoom: boolean;
  connectedToUltron: boolean;
  reconnectToRoom: boolean;
  previousChatSession: TPreviousChatSessionType | null;
  previousChatHistory: TPreviousChatMessageType[];
  chatMessages: TChatMessageType[];
  chatSessionId: string | null;
  liveAgentHandoffDetails: TLiveAgentHandoffDetailsType;
  isLiveAgentHandoff: boolean;
  isLiveAgentConnected: boolean;
  liveAgentToAIHandoff: boolean;
  isOffline: boolean;
}

export interface RiaChatBotConfig {
  baseUrl: string;
  participantToken?: string;
  participantType?: 'Prospect' | 'AnonymousUser';
  userInfo?: {
    email?: string;
    phone?: string;
    name?: string;
  };
  isVerifiedRenter?: boolean;
  onError?: (error: Error) => void;
  onLog?: (message: string, data?: any) => void;
}
