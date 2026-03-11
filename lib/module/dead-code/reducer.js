"use strict";

import { logger } from "../../../components/Logger/logger";
import { CHATBOT_USER_ENUM } from "../../../constants/Constants";
import { getActionType } from "../../../multifamily/common/store/rootaction";
import { clearChatMessagesAction, clearLivekitTokenAction, setConnectedToRoomAction, getLivekitTokenAction, hideChatWithUsModalAction, persistChatSessionIdAction, persistLivekitTokenAction, persistPreviousChatHistoryAction, persistPreviousChatSessionDetailsAction, setIsLiveAgentConnectedAction, setLiveAgentHandoffStatusAction, setReconnectToRoomAction, showChatWithUsModalAction, storeChatMessageAction, storeLiveAgentHandoffDetailsAction, updateMessageLikeAction, setLiveAgentToAIHandoffAction, showChatBotLoaderAction, setReconnectionAttemptAction, setConnectedToUltronAction, persistCurrentPropIdAction, setCurrentAIScreenNameAction } from "./actions.js";
export const riaChatBotInitialState = {
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
  screenName: "",
  previousChatSession: {
    id: null,
    created_at: "",
    ended_at: null,
    livekit_session_id: "",
    participant_id: "",
    participant_type: "",
    phone_number: null,
    started_at: "",
    summary: null,
    tags: null,
    updated_at: ""
  },
  liveAgentHandoffDetails: {
    contact_id: "",
    conversation_id: "",
    email: "",
    name: "",
    phone_number: "",
    pubsub_token: "",
    salesforce_case_id: ""
  },
  isLiveAgentHandoff: false,
  isLiveAgentConnected: false,
  previousChatHistory: [],
  chatMessages: [],
  chatSessionId: null,
  liveAgentToAIHandoff: false
};
export const riaChatBot = (state = riaChatBotInitialState, action) => {
  switch (action.type) {
    case getActionType(showChatBotLoaderAction):
      logger.log("RiaChatBot/reducer.ts ~ showChatBotLoaderAction", action.payload);
      return {
        ...state,
        chatbotLoading: action.payload.showLoader,
        showChatbotLoadingMessage: action.payload.showMessage
      };
    case getActionType(showChatWithUsModalAction):
      const {
        screenName = ""
      } = action.payload;
      logger.log("RiaChatBot/reducer.ts ~ showChatWithUsModalAction", action.payload);
      return {
        ...state,
        showChatWithUsModal: true,
        screenName: screenName
      };
    case getActionType(setCurrentAIScreenNameAction):
      const currentScreenName = action.payload;
      logger.log("RiaChatBot/reducer.ts ~ setCurrentAIScreenNameAction", action.payload);
      return {
        ...state,
        screenName: currentScreenName
      };
    case getActionType(hideChatWithUsModalAction):
      logger.log("RiaChatBot/reducer.ts ~ hideChatWithUsModalAction");
      return {
        ...state,
        showChatWithUsModal: false,
        showChatbotLoadingMessage: false
      };
    case getActionType(persistLivekitTokenAction):
      logger.log("RiaChatBot/reducer.ts ~ persistLivekitTokenAction", action.payload);
      return {
        ...state,
        livekitToken: action.payload
      };
    case getActionType(getLivekitTokenAction):
      logger.log("RiaChatBot/reducer.ts ~ getLivekitTokenAction", action.payload);
      const getLivekitToken = action.payload;
      return {
        ...state,
        livekitToken: getLivekitToken ? null : state.livekitToken,
        getLivekitToken: action.payload
      };
    case getActionType(setReconnectionAttemptAction):
      logger.log("RiaChatBot/reducer.ts ~ setReconnectionAttemptAction", action.payload);
      return {
        ...state,
        reconnectionAttempt: action.payload
      };
    case getActionType(clearLivekitTokenAction):
      logger.log("RiaChatBot/reducer.ts ~ clearLivekitTokenAction");
      return {
        ...state,
        livekitToken: null
      };
    case getActionType(setConnectedToRoomAction):
      logger.log("RiaChatBot/reducer.ts ~ connectedToRoomAction", action.payload);
      return {
        ...state,
        connectedToRoom: action.payload
      };
    case getActionType(setConnectedToUltronAction):
      logger.log("RiaChatBot/reducer.ts ~ setConnectedToUltronAction", action.payload);
      return {
        ...state,
        connectedToUltron: action.payload
      };
    case getActionType(setReconnectToRoomAction):
      logger.log("RiaChatBot/reducer.ts ~ setReconnectToRoomAction", action.payload);
      return {
        ...state,
        reconnectToRoom: action.payload
      };
    case getActionType(persistChatSessionIdAction):
      logger.log("RiaChatBot/reducer.ts ~ persistChatSessionIdAction", action.payload);
      return {
        ...state,
        chatSessionId: action.payload.chatSessionId
      };
    case getActionType(storeChatMessageAction):
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          chatMessages: action.payload
        };
      }
      const existingIndex = state.chatMessages.findIndex(msg => msg.id === action.payload.id);
      if (existingIndex !== -1) {
        if (action.payload.user === CHATBOT_USER_ENUM.AI) {
          const updatedMessages = [...state.chatMessages];
          updatedMessages[existingIndex] = {
            ...updatedMessages[existingIndex],
            content: updatedMessages[existingIndex].content + action.payload.content
          };
          return {
            ...state,
            chatMessages: updatedMessages
          };
        } else {
          return state;
        }
      } else {
        return {
          ...state,
          chatMessages: [...state.chatMessages, action.payload]
        };
      }
    case getActionType(clearChatMessagesAction):
      return {
        ...state,
        chatMessages: []
      };
    case getActionType(persistPreviousChatSessionDetailsAction):
      logger.log("RiaChatBot/reducer.ts ~ persistPreviousChatSessionDetailsAction", action.payload);
      return {
        ...state,
        previousChatSession: action.payload
      };
    case getActionType(persistPreviousChatHistoryAction):
      logger.log("RiaChatBot/reducer.ts ~ persistPreviousChatHistoryAction", action.payload);
      return {
        ...state,
        previousChatHistory: action.payload
      };
    case getActionType(updateMessageLikeAction):
      const {
        messageId,
        likeStatus
      } = action.payload;
      const updatedMessages = state.chatMessages.map(msg => {
        if (msg.id === messageId) {
          return {
            ...msg,
            likeStatus
          };
        }
        return msg;
      });
      return {
        ...state,
        chatMessages: updatedMessages
      };
    case getActionType(storeLiveAgentHandoffDetailsAction):
      logger.log("RiaChatBot/reducer.ts ~ storeLiveAgentHandoffDetailsAction", action.payload);
      return {
        ...state,
        liveAgentHandoffDetails: action.payload
      };
    case getActionType(setLiveAgentHandoffStatusAction):
      logger.log("RiaChatBot/reducer.ts ~ setLiveAgentHandoffStatusAction", action.payload);
      return {
        ...state,
        isLiveAgentHandoff: action.payload.isLiveAgentHandoff
      };
    case getActionType(setIsLiveAgentConnectedAction):
      logger.log("RiaChatBot/reducer.ts ~ setIsLiveAgentConnectedAction", action.payload);
      return {
        ...state,
        isLiveAgentConnected: action.payload
      };
    case getActionType(setLiveAgentToAIHandoffAction):
      logger.log("RiaChatBot/reducer.ts ~ setLiveAgentToAIHandoffAction", action.payload);
      return {
        ...state,
        liveAgentToAIHandoff: action.payload
      };
    case getActionType(persistCurrentPropIdAction):
      logger.log("RiaChatBot/reducer.ts ~ persistCurrentPropIdAction", action.payload);
      return {
        ...state,
        currentPropId: action.payload
      };
    default:
      return state;
  }
};
//# sourceMappingURL=reducer.js.map