"use strict";

import { useEffect, useRef, useState } from "react";
import { useChat, useRoomContext } from "@livekit/react-native";
import { ConnectionState } from "livekit-client";
import { useRiaChatBot } from "../context/index.js";
const CHATBOT_USER_ENUM = {
  CHATBOT: 'CHATBOT',
  USER: 'USER'
};

/**
 * Custom hook to manage chat messages and typing state for the chatbot.
 * Handles storing new messages, formatting previous chat history, and managing typing indicators.
 * Returns the current typing state.
 */
export const useChatMessages = () => {
  const {
    chatMessages: userChatMessages
  } = useChat();
  const room = useRoomContext();
  const isConnected = room?.state === ConnectionState.Connected;
  const {
    state,
    storeChatMessage
  } = useRiaChatBot();
  const {
    previousChatHistory,
    chatMessages
  } = state;
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  //Storing message sent by local user to context
  useEffect(() => {
    if (userChatMessages.length > 0) {
      const latestChatMessage = userChatMessages[userChatMessages.length - 1];
      if (latestChatMessage && !chatMessages.some(msg => msg.id === latestChatMessage.id)) {
        const newMessage = {
          id: latestChatMessage.id,
          user: CHATBOT_USER_ENUM.USER,
          content: latestChatMessage.message,
          timestamp: new Date(latestChatMessage.timestamp).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
          }),
          likeStatus: 0
        };
        storeChatMessage(newMessage);
      }
    }
  }, [userChatMessages, chatMessages]);

  // Format and store previous chat history to context
  useEffect(() => {
    if (previousChatHistory && previousChatHistory.length > 0) {
      const formattedMessages = previousChatHistory.map(item => ({
        user: item.role?.toString() || 'CHATBOT',
        content: item.content,
        id: item.id,
        timestamp: new Date(item.created_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        }),
        likeStatus: item.helpful,
        senderName: item.agent_name || "Live Agent"
      }));
      storeChatMessage(formattedMessages);
    }
  }, [previousChatHistory]);

  // Determine if typing based on chatMessages
  useEffect(() => {
    if (chatMessages.length === 0) {
      return;
    }
    const lastMessage = chatMessages[chatMessages.length - 1];
    if (lastMessage) {
      setIsTyping(lastMessage.user === CHATBOT_USER_ENUM.USER && previousChatHistory.length === 0);
    }
  }, [chatMessages, isConnected]);

  // Timeout for typing indicator
  useEffect(() => {
    if (isTyping) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 30000); // 30 seconds
    } else {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [isTyping]);
  return {
    isTyping
  };
};
//# sourceMappingURL=useChatMessages.js.map