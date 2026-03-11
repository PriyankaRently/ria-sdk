"use strict";

import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';
import { ApiService } from "../services/apiService.js";

// Initial State
import { jsx as _jsx } from "react/jsx-runtime";
const initialState = {
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
    salesforce_case_id: ''
  },
  isLiveAgentHandoff: false,
  isLiveAgentConnected: false,
  previousChatHistory: [],
  chatMessages: [],
  chatSessionId: null,
  liveAgentToAIHandoff: false,
  isOffline: false
};

// Action Types

// Reducer
function riaChatBotReducer(state, action) {
  switch (action.type) {
    case 'SHOW_CHATBOT_LOADER':
      return {
        ...state,
        chatbotLoading: action.payload.showLoader,
        showChatbotLoadingMessage: action.payload.showMessage || false
      };
    case 'SHOW_CHAT_WITH_US_MODAL':
      return {
        ...state,
        showChatWithUsModal: true,
        screenName: action.payload.screenName || ''
      };
    case 'SET_CURRENT_AI_SCREEN_NAME':
      return {
        ...state,
        screenName: action.payload
      };
    case 'HIDE_CHAT_WITH_US_MODAL':
      return {
        ...state,
        showChatWithUsModal: false,
        showChatbotLoadingMessage: false
      };
    case 'PERSIST_LIVEKIT_TOKEN':
      return {
        ...state,
        livekitToken: action.payload
      };
    case 'GET_LIVEKIT_TOKEN':
      return {
        ...state,
        livekitToken: action.payload ? null : state.livekitToken,
        getLivekitToken: action.payload
      };
    case 'SET_RECONNECTION_ATTEMPT':
      return {
        ...state,
        reconnectionAttempt: action.payload
      };
    case 'CLEAR_LIVEKIT_TOKEN':
      return {
        ...state,
        livekitToken: null
      };
    case 'SET_CONNECTED_TO_ROOM':
      return {
        ...state,
        connectedToRoom: action.payload
      };
    case 'SET_CONNECTED_TO_ULTRON':
      return {
        ...state,
        connectedToUltron: action.payload
      };
    case 'SET_RECONNECT_TO_ROOM':
      return {
        ...state,
        reconnectToRoom: action.payload
      };
    case 'PERSIST_CHAT_SESSION_ID':
      return {
        ...state,
        chatSessionId: action.payload
      };
    case 'STORE_CHAT_MESSAGE':
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          chatMessages: action.payload
        };
      }
      const message = action.payload;
      const existingIndex = state.chatMessages.findIndex(msg => msg.id === message.id);
      if (existingIndex !== -1) {
        if (message.user === 'AI') {
          const updatedMessages = [...state.chatMessages];
          const existingMessage = updatedMessages[existingIndex];
          if (existingMessage) {
            updatedMessages[existingIndex] = {
              ...existingMessage,
              content: existingMessage.content + message.content
            };
          }
          return {
            ...state,
            chatMessages: updatedMessages
          };
        }
        return state;
      }
      return {
        ...state,
        chatMessages: [...state.chatMessages, message]
      };
    case 'CLEAR_CHAT_MESSAGES':
      return {
        ...state,
        chatMessages: []
      };
    case 'PERSIST_PREVIOUS_CHAT_SESSION':
      return {
        ...state,
        previousChatSession: action.payload
      };
    case 'PERSIST_PREVIOUS_CHAT_HISTORY':
      return {
        ...state,
        previousChatHistory: action.payload
      };
    case 'UPDATE_MESSAGE_LIKE':
      const updatedMessages = state.chatMessages.map(msg => msg.id === action.payload.messageId ? {
        ...msg,
        likeStatus: action.payload.likeStatus
      } : msg);
      return {
        ...state,
        chatMessages: updatedMessages
      };
    case 'STORE_LIVE_AGENT_HANDOFF_DETAILS':
      return {
        ...state,
        liveAgentHandoffDetails: action.payload
      };
    case 'SET_LIVE_AGENT_HANDOFF_STATUS':
      return {
        ...state,
        isLiveAgentHandoff: action.payload
      };
    case 'SET_IS_LIVE_AGENT_CONNECTED':
      return {
        ...state,
        isLiveAgentConnected: action.payload
      };
    case 'SET_LIVE_AGENT_TO_AI_HANDOFF':
      return {
        ...state,
        liveAgentToAIHandoff: action.payload
      };
    case 'PERSIST_CURRENT_PROP_ID':
      return {
        ...state,
        currentPropId: action.payload
      };
    default:
      return state;
  }
}

// Context Type

const RiaChatBotContext = /*#__PURE__*/createContext(undefined);

// Provider Props

export const RiaChatBotProvider = ({
  children,
  config
}) => {
  const [state, dispatch] = useReducer(riaChatBotReducer, initialState);
  const apiServiceRef = useRef(new ApiService(config));

  // State setters
  const showChatbotLoader = useCallback((showLoader, showMessage) => {
    dispatch({
      type: 'SHOW_CHATBOT_LOADER',
      payload: {
        showLoader,
        showMessage
      }
    });
  }, []);
  const showChatWithUsModal = useCallback(screenName => {
    dispatch({
      type: 'SHOW_CHAT_WITH_US_MODAL',
      payload: {
        screenName
      }
    });
  }, []);
  const setCurrentAIScreenName = useCallback(screenName => {
    dispatch({
      type: 'SET_CURRENT_AI_SCREEN_NAME',
      payload: screenName
    });
  }, []);
  const hideChatWithUsModal = useCallback(() => {
    dispatch({
      type: 'HIDE_CHAT_WITH_US_MODAL'
    });
  }, []);
  const setReconnectionAttempt = useCallback(attempt => {
    dispatch({
      type: 'SET_RECONNECTION_ATTEMPT',
      payload: attempt
    });
  }, []);
  const setConnectedToRoom = useCallback(connected => {
    dispatch({
      type: 'SET_CONNECTED_TO_ROOM',
      payload: connected
    });
  }, []);
  const setConnectedToUltron = useCallback(connected => {
    dispatch({
      type: 'SET_CONNECTED_TO_ULTRON',
      payload: connected
    });
  }, []);
  const setReconnectToRoom = useCallback(reconnect => {
    dispatch({
      type: 'SET_RECONNECT_TO_ROOM',
      payload: reconnect
    });
  }, []);
  const persistChatSessionId = useCallback(chatSessionId => {
    dispatch({
      type: 'PERSIST_CHAT_SESSION_ID',
      payload: chatSessionId
    });
  }, []);
  const storeChatMessage = useCallback(message => {
    dispatch({
      type: 'STORE_CHAT_MESSAGE',
      payload: message
    });
  }, []);
  const clearChatMessages = useCallback(() => {
    dispatch({
      type: 'CLEAR_CHAT_MESSAGES'
    });
  }, []);
  const updateMessageLike = useCallback((messageId, likeStatus) => {
    dispatch({
      type: 'UPDATE_MESSAGE_LIKE',
      payload: {
        messageId,
        likeStatus
      }
    });
  }, []);
  const storeLiveAgentHandoffDetails = useCallback(details => {
    dispatch({
      type: 'STORE_LIVE_AGENT_HANDOFF_DETAILS',
      payload: details
    });
  }, []);
  const setLiveAgentHandoffStatus = useCallback(status => {
    dispatch({
      type: 'SET_LIVE_AGENT_HANDOFF_STATUS',
      payload: status
    });
  }, []);
  const setIsLiveAgentConnected = useCallback(connected => {
    dispatch({
      type: 'SET_IS_LIVE_AGENT_CONNECTED',
      payload: connected
    });
  }, []);
  const setLiveAgentToAIHandoff = useCallback(handoff => {
    dispatch({
      type: 'SET_LIVE_AGENT_TO_AI_HANDOFF',
      payload: handoff
    });
  }, []);
  const persistCurrentPropId = useCallback(propId => {
    dispatch({
      type: 'PERSIST_CURRENT_PROP_ID',
      payload: propId
    });
  }, []);
  const clearLivekitToken = useCallback(() => {
    dispatch({
      type: 'CLEAR_LIVEKIT_TOKEN'
    });
  }, []);

  // API methods
  const fetchLivekitToken = useCallback(async (modality = 'text', reconnect = false) => {
    try {
      config.onLog?.('Fetching LiveKit token', {
        modality,
        reconnect
      });
      dispatch({
        type: 'GET_LIVEKIT_TOKEN',
        payload: true
      });
      const response = await apiServiceRef.current.fetchLivekitToken({
        modality,
        reconnect,
        chatSessionId: state.chatSessionId || undefined,
        disableGreet: state.liveAgentToAIHandoff
      });
      if (response.success && response.access_token) {
        dispatch({
          type: 'PERSIST_LIVEKIT_TOKEN',
          payload: response.access_token
        });
      } else {
        dispatch({
          type: 'PERSIST_LIVEKIT_TOKEN',
          payload: null
        });
      }
      dispatch({
        type: 'GET_LIVEKIT_TOKEN',
        payload: false
      });
    } catch (error) {
      config.onError?.(error);
      dispatch({
        type: 'PERSIST_LIVEKIT_TOKEN',
        payload: null
      });
      dispatch({
        type: 'GET_LIVEKIT_TOKEN',
        payload: false
      });
    }
  }, [state.chatSessionId, state.liveAgentToAIHandoff, config]);
  const checkPreviousChatSession = useCallback(async () => {
    try {
      config.onLog?.('Checking previous chat session');
      const response = await apiServiceRef.current.checkPreviousChatSession();
      if (response.success && response.chat_session) {
        dispatch({
          type: 'PERSIST_PREVIOUS_CHAT_SESSION',
          payload: response.chat_session
        });
        if (response.chat_session.id) {
          await fetchPreviousChatHistory(response.chat_session.id);
        }
      } else {
        dispatch({
          type: 'PERSIST_PREVIOUS_CHAT_SESSION',
          payload: null
        });
      }
    } catch (error) {
      config.onError?.(error);
      dispatch({
        type: 'PERSIST_PREVIOUS_CHAT_SESSION',
        payload: null
      });
    }
  }, [config]);
  const fetchPreviousChatHistory = useCallback(async chatSessionId => {
    try {
      config.onLog?.('Fetching previous chat history', {
        chatSessionId
      });
      if (!chatSessionId) {
        dispatch({
          type: 'PERSIST_PREVIOUS_CHAT_HISTORY',
          payload: []
        });
        return;
      }
      const chatHistory = await apiServiceRef.current.fetchPreviousChatHistory(chatSessionId);
      if (chatHistory && !state.chatSessionId) {
        dispatch({
          type: 'PERSIST_PREVIOUS_CHAT_HISTORY',
          payload: chatHistory
        });
        dispatch({
          type: 'PERSIST_CHAT_SESSION_ID',
          payload: chatSessionId
        });
      }
    } catch (error) {
      config.onError?.(error);
      dispatch({
        type: 'PERSIST_PREVIOUS_CHAT_HISTORY',
        payload: []
      });
    }
  }, [state.chatSessionId, config]);
  const toggleMessageLike = useCallback(async (messageId, likeStatus) => {
    try {
      config.onLog?.('Toggling message like', {
        messageId,
        likeStatus
      });
      if (!state.chatSessionId) {
        throw new Error('No chat session ID');
      }
      await apiServiceRef.current.toggleMessageLike(state.chatSessionId, messageId, likeStatus);
    } catch (error) {
      config.onError?.(error);
    }
  }, [state.chatSessionId, config]);
  const sendMessageToChatwoot = useCallback(async (messageContent, systemGenerated = false) => {
    try {
      config.onLog?.('Sending message to Chatwoot', {
        messageContent,
        systemGenerated
      });
      if (!state.chatSessionId) {
        throw new Error('No chat session ID');
      }
      await apiServiceRef.current.sendMessageToChatwoot({
        chatSessionId: state.chatSessionId,
        contactId: state.liveAgentHandoffDetails.contact_id,
        conversationId: state.liveAgentHandoffDetails.conversation_id,
        messageContent,
        systemGenerated
      });
    } catch (error) {
      config.onError?.(error);
    }
  }, [state.chatSessionId, state.liveAgentHandoffDetails, config]);
  const changeChatOwnership = useCallback(async newParticipantToken => {
    try {
      config.onLog?.('Changing chat ownership', {
        newParticipantToken
      });
      await apiServiceRef.current.changeChatOwnership(newParticipantToken);

      // Update API service config with new token
      apiServiceRef.current.updateConfig({
        participantToken: newParticipantToken
      });
    } catch (error) {
      config.onError?.(error);
    }
  }, [config]);
  const value = {
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
    apiService: apiServiceRef.current
  };
  return /*#__PURE__*/_jsx(RiaChatBotContext.Provider, {
    value: value,
    children: children
  });
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
    showChatbotLoader: ({
      showLoader,
      showMessage
    }) => context.showChatbotLoader(showLoader, showMessage),
    setShowChatWithUsModal: show => show ? context.showChatWithUsModal() : context.hideChatWithUsModal(),
    storeChatMessage: context.storeChatMessage,
    persistPreviousChatHistory: history => {
      // Clear history by updating state indirectly through storing empty messages
      if (history.length === 0) {
        // This would need a proper action - for now just log
        context.state.previousChatHistory = history;
      }
    },
    persistChatSessionId: ({
      chatSessionId
    }) => {
      if (chatSessionId) {
        context.persistChatSessionId(chatSessionId);
      }
    },
    getLivekitToken: (reconnect = false) => context.fetchLivekitToken('text', reconnect),
    sendMessageToChatwoot: ({
      messageContent,
      systemGenerated
    }) => context.sendMessageToChatwoot(messageContent, systemGenerated),
    setLiveAgentHandoffStatus: ({
      isLiveAgentHandoff
    }) => context.setLiveAgentHandoffStatus(isLiveAgentHandoff),
    setIsLiveAgentConnected: context.setIsLiveAgentConnected,
    setLiveAgentToAIHandoff: context.setLiveAgentToAIHandoff,
    setReconnectToRoom: context.setReconnectToRoom,
    setConnectedToUltron: context.setConnectedToUltron,
    storeLiveAgentHandoffDetails: context.storeLiveAgentHandoffDetails,
    setConnectedToRoom: context.setConnectedToRoom,
    updateMessageLike: (messageId, likeStatus) => context.updateMessageLike(messageId, likeStatus),
    toggleMessageLike: (messageId, likeStatus) => context.toggleMessageLike(messageId, likeStatus),
    // Original context methods for full access
    showChatWithUsModal: context.showChatWithUsModal,
    hideChatWithUsModal: context.hideChatWithUsModal,
    clearChatMessages: context.clearChatMessages,
    fetchLivekitToken: context.fetchLivekitToken,
    checkPreviousChatSession: context.checkPreviousChatSession,
    fetchPreviousChatHistory: context.fetchPreviousChatHistory,
    // Full state and context for advanced use
    state: context.state,
    apiService: context.apiService
  };
};
//# sourceMappingURL=RiaChatBotContext.js.map