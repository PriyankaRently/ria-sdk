"use strict";

import { useEffect } from 'react';
import { useRiaChatBot } from "../context/index.js";

/**
 * Hook to manage reconnection to the chatbot when chat window becomes visible
 * and connection is needed but not established.
 */
export const useReconnectionToChatbot = () => {
  const {
    state,
    fetchLivekitToken
  } = useRiaChatBot();
  const {
    showChatWithUsModal,
    reconnectToRoom,
    isOffline
  } = state;
  useEffect(() => {
    if (showChatWithUsModal && reconnectToRoom && !isOffline) {
      fetchLivekitToken();
    }
  }, [showChatWithUsModal, reconnectToRoom, isOffline]);
};
//# sourceMappingURL=useReconnectionToChatbot.js.map