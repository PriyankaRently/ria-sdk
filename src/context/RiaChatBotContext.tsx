import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import type { RiaChatBotState, TChatMessageType, TPreviousChatSessionType, TPreviousChatMessageType, TLiveAgentHandoffDetailsType, RiaChatBotConfig } from '../types';
import { ApiService } from '../services/apiService';

// Initial State
const initialState: RiaChatBotState = {
  chatbotLoading: false,
  showChatbotLoadingMessage: false,
  showChatWithUsModal: false,
  currentPropId: null,
  livekitToken: null,
  getLivekitToken: false,
  reconnectionAttempt: 0,
  connectedToRoom: false,
  connectedToUltron: false,
  reconnectToRoom: false,
  screenName: '',
  previousChatSession: null,
  liveAgentHandoffDetails: {
    contact_id: '',
    conversation_id: '',
    email: '',
    name: '',
    phone_number: '',
    pubsub_token: '',
    salesforce_case_id: '',
  },
  isLiveAgentHandoff: false,
  isLiveAgentConnected: false,
  previousChatHistory: [],
  chatMessages: [],
  chatSessionId: null,
  liveAgentToAIHandoff: false,
  isOffline: false,
};

// Action Types
type Action =
  | { type: 'SHOW_CHATBOT_LOADER'; payload: { showLoader: boolean; showMessage?: boolean } }
  | { type: 'SHOW_CHAT_WITH_US_MODAL'; payload: { screenName?: string } }
  | { type: 'SET_CURRENT_AI_SCREEN_NAME'; payload: string }
  | { type: 'HIDE_CHAT_WITH_US_MODAL' }
  | { type: 'PERSIST_LIVEKIT_TOKEN'; payload: string | null }
  | { type: 'GET_LIVEKIT_TOKEN'; payload: boolean }
  | { type: 'SET_RECONNECTION_ATTEMPT'; payload: number }
  | { type: 'CLEAR_LIVEKIT_TOKEN' }
  | { type: 'SET_CONNECTED_TO_ROOM'; payload: boolean }
  | { type: 'SET_CONNECTED_TO_ULTRON'; payload: boolean }
  | { type: 'SET_RECONNECT_TO_ROOM'; payload: boolean }
  | { type: 'PERSIST_CHAT_SESSION_ID'; payload: string }
  | { type: 'STORE_CHAT_MESSAGE'; payload: TChatMessageType | TChatMessageType[] }
  | { type: 'CLEAR_CHAT_MESSAGES' }
  | { type: 'PERSIST_PREVIOUS_CHAT_SESSION'; payload: TPreviousChatSessionType | null }
  | { type: 'PERSIST_PREVIOUS_CHAT_HISTORY'; payload: TPreviousChatMessageType[] }
  | { type: 'UPDATE_MESSAGE_LIKE'; payload: { messageId: string; likeStatus: number } }
  | { type: 'STORE_LIVE_AGENT_HANDOFF_DETAILS'; payload: TLiveAgentHandoffDetailsType }
  | { type: 'SET_LIVE_AGENT_HANDOFF_STATUS'; payload: boolean }
  | { type: 'SET_IS_LIVE_AGENT_CONNECTED'; payload: boolean }
  | { type: 'SET_LIVE_AGENT_TO_AI_HANDOFF'; payload: boolean }
  | { type: 'PERSIST_CURRENT_PROP_ID'; payload: number };

// Reducer
function riaChatBotReducer(state: RiaChatBotState, action: Action): RiaChatBotState {
  switch (action.type) {
    case 'SHOW_CHATBOT_LOADER':
      return {
        ...state,
        chatbotLoading: action.payload.showLoader,
        showChatbotLoadingMessage: action.payload.showMessage || false,
      };
    
    case 'SHOW_CHAT_WITH_US_MODAL':
      return {
        ...state,
        showChatWithUsModal: true,
        screenName: action.payload.screenName || '',
      };
    
    case 'SET_CURRENT_AI_SCREEN_NAME':
      return {
        ...state,
        screenName: action.payload,
      };
    
    case 'HIDE_CHAT_WITH_US_MODAL':
      return {
        ...state,
        showChatWithUsModal: false,
        showChatbotLoadingMessage: false,
      };
    
    case 'PERSIST_LIVEKIT_TOKEN':
      return {
        ...state,
        livekitToken: action.payload,
      };
    
    case 'GET_LIVEKIT_TOKEN':
      return {
        ...state,
        livekitToken: action.payload ? null : state.livekitToken,
        getLivekitToken: action.payload,
      };
    
    case 'SET_RECONNECTION_ATTEMPT':
      return {
        ...state,
        reconnectionAttempt: action.payload,
      };
    
    case 'CLEAR_LIVEKIT_TOKEN':
      return {
        ...state,
        livekitToken: null,
      };
    
    case 'SET_CONNECTED_TO_ROOM':
      return {
        ...state,
        connectedToRoom: action.payload,
      };
    
    case 'SET_CONNECTED_TO_ULTRON':
      return {
        ...state,
        connectedToUltron: action.payload,
      };
    
    case 'SET_RECONNECT_TO_ROOM':
      return {
        ...state,
        reconnectToRoom: action.payload,
      };
    
    case 'PERSIST_CHAT_SESSION_ID':
      return {
        ...state,
        chatSessionId: action.payload,
      };
    
    case 'STORE_CHAT_MESSAGE':
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          chatMessages: action.payload,
        };
      }
      
      const message = action.payload as TChatMessageType;
      const existingIndex = state.chatMessages.findIndex(msg => msg.id === message.id);
      
      if (existingIndex !== -1) {
        if (message.user === 'AI') {
          const updatedMessages = [...state.chatMessages];
          const existingMessage = updatedMessages[existingIndex];
          if (existingMessage) {
            updatedMessages[existingIndex] = {
              ...existingMessage,
              content: existingMessage.content + message.content,
            };
          }
          return {
            ...state,
            chatMessages: updatedMessages,
          };
        }
        return state;
      }
      
      return {
        ...state,
        chatMessages: [...state.chatMessages, message],
      };
    
    case 'CLEAR_CHAT_MESSAGES':
      return {
        ...state,
        chatMessages: [],
      };
    
    case 'PERSIST_PREVIOUS_CHAT_SESSION':
      return {
        ...state,
        previousChatSession: action.payload,
      };
    
    case 'PERSIST_PREVIOUS_CHAT_HISTORY':
      return {
        ...state,
        previousChatHistory: action.payload,
      };
    
    case 'UPDATE_MESSAGE_LIKE':
      const updatedMessages = state.chatMessages.map(msg =>
        msg.id === action.payload.messageId
          ? { ...msg, likeStatus: action.payload.likeStatus }
          : msg
      );
      return {
        ...state,
        chatMessages: updatedMessages,
      };
    
    case 'STORE_LIVE_AGENT_HANDOFF_DETAILS':
      return {
        ...state,
        liveAgentHandoffDetails: action.payload,
      };
    
    case 'SET_LIVE_AGENT_HANDOFF_STATUS':
      return {
        ...state,
        isLiveAgentHandoff: action.payload,
      };
    
    case 'SET_IS_LIVE_AGENT_CONNECTED':
      return {
        ...state,
        isLiveAgentConnected: action.payload,
      };
    
    case 'SET_LIVE_AGENT_TO_AI_HANDOFF':
      return {
        ...state,
        liveAgentToAIHandoff: action.payload,
      };
    
    case 'PERSIST_CURRENT_PROP_ID':
      return {
        ...state,
        currentPropId: action.payload,
      };
    
    default:
      return state;
  }
}

// Context Type
interface RiaChatBotContextType {
  state: RiaChatBotState;
  // State setters
  showChatbotLoader: (showLoader: boolean, showMessage?: boolean) => void;
  showChatWithUsModal: (screenName?: string) => void;
  setCurrentAIScreenName: (screenName: string) => void;
  hideChatWithUsModal: () => void;
  setReconnectionAttempt: (attempt: number) => void;
  setConnectedToRoom: (connected: boolean) => void;
  setConnectedToUltron: (connected: boolean) => void;
  setReconnectToRoom: (reconnect: boolean) => void;
  persistChatSessionId: (chatSessionId: string) => void;
  storeChatMessage: (message: TChatMessageType | TChatMessageType[]) => void;
  clearChatMessages: () => void;
  updateMessageLike: (messageId: string, likeStatus: number) => void;
  storeLiveAgentHandoffDetails: (details: TLiveAgentHandoffDetailsType) => void;
  setLiveAgentHandoffStatus: (status: boolean) => void;
  setIsLiveAgentConnected: (connected: boolean) => void;
  setLiveAgentToAIHandoff: (handoff: boolean) => void;
  persistCurrentPropId: (propId: number) => void;
  clearLivekitToken: () => void;
  // API methods
  fetchLivekitToken: (modality?: string, reconnect?: boolean) => Promise<void>;
  checkPreviousChatSession: () => Promise<void>;
  fetchPreviousChatHistory: (chatSessionId: string) => Promise<void>;
  toggleMessageLike: (messageId: string, likeStatus: number) => Promise<void>;
  sendMessageToChatwoot: (messageContent: string, systemGenerated?: boolean) => Promise<void>;
  changeChatOwnership: (newParticipantToken: string) => Promise<void>;
  // API Service
  apiService: ApiService;
}

const RiaChatBotContext = createContext<RiaChatBotContextType | undefined>(undefined);

// Provider Props
interface RiaChatBotProviderProps {
  children: ReactNode;
  config: RiaChatBotConfig;
}

export const RiaChatBotProvider: React.FC<RiaChatBotProviderProps> = ({ children, config }) => {
  const [state, dispatch] = useReducer(riaChatBotReducer, initialState);
  const apiServiceRef = useRef(new ApiService(config));

  // State setters
  const showChatbotLoader = useCallback((showLoader: boolean, showMessage?: boolean) => {
    dispatch({ type: 'SHOW_CHATBOT_LOADER', payload: { showLoader, showMessage } });
  }, []);

  const showChatWithUsModal = useCallback((screenName?: string) => {
    dispatch({ type: 'SHOW_CHAT_WITH_US_MODAL', payload: { screenName } });
  }, []);

  const setCurrentAIScreenName = useCallback((screenName: string) => {
    dispatch({ type: 'SET_CURRENT_AI_SCREEN_NAME', payload: screenName });
  }, []);

  const hideChatWithUsModal = useCallback(() => {
    dispatch({ type: 'HIDE_CHAT_WITH_US_MODAL' });
  }, []);

  const setReconnectionAttempt = useCallback((attempt: number) => {
    dispatch({ type: 'SET_RECONNECTION_ATTEMPT', payload: attempt });
  }, []);

  const setConnectedToRoom = useCallback((connected: boolean) => {
    dispatch({ type: 'SET_CONNECTED_TO_ROOM', payload: connected });
  }, []);

  const setConnectedToUltron = useCallback((connected: boolean) => {
    dispatch({ type: 'SET_CONNECTED_TO_ULTRON', payload: connected });
  }, []);

  const setReconnectToRoom = useCallback((reconnect: boolean) => {
    dispatch({ type: 'SET_RECONNECT_TO_ROOM', payload: reconnect });
  }, []);

  const persistChatSessionId = useCallback((chatSessionId: string) => {
    dispatch({ type: 'PERSIST_CHAT_SESSION_ID', payload: chatSessionId });
  }, []);

  const storeChatMessage = useCallback((message: TChatMessageType | TChatMessageType[]) => {
    dispatch({ type: 'STORE_CHAT_MESSAGE', payload: message });
  }, []);

  const clearChatMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_CHAT_MESSAGES' });
  }, []);

  const updateMessageLike = useCallback((messageId: string, likeStatus: number) => {
    dispatch({ type: 'UPDATE_MESSAGE_LIKE', payload: { messageId, likeStatus } });
  }, []);

  const storeLiveAgentHandoffDetails = useCallback((details: TLiveAgentHandoffDetailsType) => {
    dispatch({ type: 'STORE_LIVE_AGENT_HANDOFF_DETAILS', payload: details });
  }, []);

  const setLiveAgentHandoffStatus = useCallback((status: boolean) => {
    dispatch({ type: 'SET_LIVE_AGENT_HANDOFF_STATUS', payload: status });
  }, []);

  const setIsLiveAgentConnected = useCallback((connected: boolean) => {
    dispatch({ type: 'SET_IS_LIVE_AGENT_CONNECTED', payload: connected });
  }, []);

  const setLiveAgentToAIHandoff = useCallback((handoff: boolean) => {
    dispatch({ type: 'SET_LIVE_AGENT_TO_AI_HANDOFF', payload: handoff });
  }, []);

  const persistCurrentPropId = useCallback((propId: number) => {
    dispatch({ type: 'PERSIST_CURRENT_PROP_ID', payload: propId });
  }, []);

  const clearLivekitToken = useCallback(() => {
    dispatch({ type: 'CLEAR_LIVEKIT_TOKEN' });
  }, []);

  // API methods
  const fetchLivekitToken = useCallback(async (modality: string = 'text', reconnect: boolean = false) => {
    try {
      config.onLog?.('Fetching LiveKit token', { modality, reconnect });
      dispatch({ type: 'GET_LIVEKIT_TOKEN', payload: true });
      
      const response = await apiServiceRef.current.fetchLivekitToken({
        modality,
        reconnect,
        chatSessionId: state.chatSessionId || undefined,
        disableGreet: state.liveAgentToAIHandoff,
      });

      if (response.success && response.access_token) {
        dispatch({ type: 'PERSIST_LIVEKIT_TOKEN', payload: response.access_token });
      } else {
        dispatch({ type: 'PERSIST_LIVEKIT_TOKEN', payload: null });
      }
      
      dispatch({ type: 'GET_LIVEKIT_TOKEN', payload: false });
    } catch (error) {
      config.onError?.(error as Error);
      dispatch({ type: 'PERSIST_LIVEKIT_TOKEN', payload: null });
      dispatch({ type: 'GET_LIVEKIT_TOKEN', payload: false });
    }
  }, [state.chatSessionId, state.liveAgentToAIHandoff, config]);

  const checkPreviousChatSession = useCallback(async () => {
    try {
      config.onLog?.('Checking previous chat session');
      const response = await apiServiceRef.current.checkPreviousChatSession();

      if (response.success && response.chat_session) {
        dispatch({ type: 'PERSIST_PREVIOUS_CHAT_SESSION', payload: response.chat_session });
        
        if (response.chat_session.id) {
          await fetchPreviousChatHistory(response.chat_session.id);
        }
      } else {
        dispatch({ type: 'PERSIST_PREVIOUS_CHAT_SESSION', payload: null });
      }
    } catch (error) {
      config.onError?.(error as Error);
      dispatch({ type: 'PERSIST_PREVIOUS_CHAT_SESSION', payload: null });
    }
  }, [config]);

  const fetchPreviousChatHistory = useCallback(async (chatSessionId: string) => {
    try {
      config.onLog?.('Fetching previous chat history', { chatSessionId });
      
      if (!chatSessionId) {
        dispatch({ type: 'PERSIST_PREVIOUS_CHAT_HISTORY', payload: [] });
        return;
      }

      const chatHistory = await apiServiceRef.current.fetchPreviousChatHistory(chatSessionId);

      if (chatHistory && !state.chatSessionId) {
        dispatch({ type: 'PERSIST_PREVIOUS_CHAT_HISTORY', payload: chatHistory });
        dispatch({ type: 'PERSIST_CHAT_SESSION_ID', payload: chatSessionId });
      }
    } catch (error) {
      config.onError?.(error as Error);
      dispatch({ type: 'PERSIST_PREVIOUS_CHAT_HISTORY', payload: [] });
    }
  }, [state.chatSessionId, config]);

  const toggleMessageLike = useCallback(async (messageId: string, likeStatus: number) => {
    try {
      config.onLog?.('Toggling message like', { messageId, likeStatus });
      
      if (!state.chatSessionId) {
        throw new Error('No chat session ID');
      }

      await apiServiceRef.current.toggleMessageLike(state.chatSessionId, messageId, likeStatus);
    } catch (error) {
      config.onError?.(error as Error);
    }
  }, [state.chatSessionId, config]);

  const sendMessageToChatwoot = useCallback(async (messageContent: string, systemGenerated: boolean = false) => {
    try {
      config.onLog?.('Sending message to Chatwoot', { messageContent, systemGenerated });
      
      if (!state.chatSessionId) {
        throw new Error('No chat session ID');
      }

      await apiServiceRef.current.sendMessageToChatwoot({
        chatSessionId: state.chatSessionId,
        contactId: state.liveAgentHandoffDetails.contact_id,
        conversationId: state.liveAgentHandoffDetails.conversation_id,
        messageContent,
        systemGenerated,
      });
    } catch (error) {
      config.onError?.(error as Error);
    }
  }, [state.chatSessionId, state.liveAgentHandoffDetails, config]);

  const changeChatOwnership = useCallback(async (newParticipantToken: string) => {
    try {
      config.onLog?.('Changing chat ownership', { newParticipantToken });
      await apiServiceRef.current.changeChatOwnership(newParticipantToken);
      
      // Update API service config with new token
      apiServiceRef.current.updateConfig({ participantToken: newParticipantToken });
    } catch (error) {
      config.onError?.(error as Error);
    }
  }, [config]);

  const value: RiaChatBotContextType = {
    state,
    showChatbotLoader,
    showChatWithUsModal,
    setCurrentAIScreenName,
    hideChatWithUsModal,
    setReconnectionAttempt,
    setConnectedToRoom,
    setConnectedToUltron,
    setReconnectToRoom,
    persistChatSessionId,
    storeChatMessage,
    clearChatMessages,
    updateMessageLike,
    storeLiveAgentHandoffDetails,
    setLiveAgentHandoffStatus,
    setIsLiveAgentConnected,
    setLiveAgentToAIHandoff,
    persistCurrentPropId,
    clearLivekitToken,
    fetchLivekitToken,
    checkPreviousChatSession,
    fetchPreviousChatHistory,
    toggleMessageLike,
    sendMessageToChatwoot,
    changeChatOwnership,
    apiService: apiServiceRef.current,
  };

  return <RiaChatBotContext.Provider value={value}>{children}</RiaChatBotContext.Provider>;
};

// Custom hook to use the context
export const useRiaChatBot = () => {
  const context = useContext(RiaChatBotContext);
  if (!context) {
    throw new Error('useRiaChatBot must be used within a RiaChatBotProvider');
  }
  
  // Create a simplified interface with direct access to commonly used state
  return {
    // Direct state accessors
    chatMessages: context.state.chatMessages,
    previousChatSession: context.state.previousChatSession,
    previousChatHistory: context.state.previousChatHistory,
    chatbotLoading: context.state.chatbotLoading,
    showChatbotLoadingMessage: context.state.showChatbotLoadingMessage,
    screenName: context.state.screenName,
    livekitToken: context.state.livekitToken,
    chatSessionId: context.state.chatSessionId,
    connectedToRoom: context.state.connectedToRoom,
    isLiveAgentHandoff: context.state.isLiveAgentHandoff,
    isLiveAgentConnected: context.state.isLiveAgentConnected,
    liveAgentToAIHandoff: context.state.liveAgentToAIHandoff,
    liveAgentHandoffDetails: context.state.liveAgentHandoffDetails,
    showChatWithUsModalState: context.state.showChatWithUsModal,
    
    // Wrapped methods with simplified signatures for easier use in components
    showChatbotLoader: ({ showLoader, showMessage }: { showLoader: boolean; showMessage?: boolean }) => 
      context.showChatbotLoader(showLoader, showMessage),
    setShowChatWithUsModal: (show: boolean) => show ? context.showChatWithUsModal() : context.hideChatWithUsModal(),
    storeChatMessage: context.storeChatMessage,
    persistPreviousChatHistory: (history: TPreviousChatMessageType[]) => {
      // Clear history by updating state indirectly through storing empty messages
      if (history.length === 0) {
        // This would need a proper action - for now just log
        context.state.previousChatHistory = history;
      }
    },
    persistChatSessionId: ({ chatSessionId }: { chatSessionId: string | null }) => {
      if (chatSessionId) {
        context.persistChatSessionId(chatSessionId);
      }
    },
    getLivekitToken: (reconnect: boolean = false) => context.fetchLivekitToken('text', reconnect),
    sendMessageToChatwoot: ({ messageContent, systemGenerated }: { messageContent: string; systemGenerated?: boolean }) => 
      context.sendMessageToChatwoot(messageContent, systemGenerated),
    setLiveAgentHandoffStatus: ({ isLiveAgentHandoff }: { isLiveAgentHandoff: boolean }) => 
      context.setLiveAgentHandoffStatus(isLiveAgentHandoff),
    setIsLiveAgentConnected: context.setIsLiveAgentConnected,
    setLiveAgentToAIHandoff: context.setLiveAgentToAIHandoff,
    setReconnectToRoom: context.setReconnectToRoom,
    setConnectedToUltron: context.setConnectedToUltron,
    storeLiveAgentHandoffDetails: context.storeLiveAgentHandoffDetails,
    setConnectedToRoom: context.setConnectedToRoom,
    updateMessageLike: (messageId: string, likeStatus: number) => context.updateMessageLike(messageId, likeStatus),
    toggleMessageLike: (messageId: string, likeStatus: number) => context.toggleMessageLike(messageId, likeStatus),
    
    // Original context methods for full access
    showChatWithUsModal: context.showChatWithUsModal,
    hideChatWithUsModal: context.hideChatWithUsModal,
    clearChatMessages: context.clearChatMessages,
    fetchLivekitToken: context.fetchLivekitToken,
    checkPreviousChatSession: context.checkPreviousChatSession,
    fetchPreviousChatHistory: context.fetchPreviousChatHistory,
    
    // Full state and context for advanced use
    state: context.state,
    apiService: context.apiService,
  };
};
