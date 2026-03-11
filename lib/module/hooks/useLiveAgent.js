"use strict";

import { useEffect, useRef } from 'react';
import { useRiaChatBot } from "../context/index.js";

/**
 * Hook to manage live agent handoff lifecycle through Chatwoot WebSocket integration.
 * Handles connecting to Chatwoot when live agent is needed, managing WebSocket events,
 * and handling conversation resolution with timeout.
 */
export const useLiveAgent = ({
  ChatwootIntegration,
  onAnalyticsEvent
}) => {
  const {
    state,
    setLiveAgentToAIHandoff,
    setReconnectToRoom
  } = useRiaChatBot();
  const {
    liveAgentHandoffDetails
  } = state;
  const connectedToLiveAgentRef = useRef(false);
  const liveAgentTimeoutRef = useRef(null);
  const chatwootIntegrationRef = useRef(null);

  // Initialize Chatwoot connection when live agent handoff occurs
  useEffect(() => {
    if (!liveAgentHandoffDetails || connectedToLiveAgentRef.current || !ChatwootIntegration) {
      return;
    }
    connectedToLiveAgentRef.current = true;
    const chatwootIntegration = new ChatwootIntegration();
    chatwootIntegrationRef.current = chatwootIntegration;

    // Handle incoming messages from Chatwoot
    const onMessageHandler = data => {
      if (data && data.message_type === 0 && data.sender_type === 'AgentBot') {
        onAnalyticsEvent?.('chatwoot_message_received', {
          message_type: data.message_type,
          sender_type: data.sender_type
        });
      }
    };

    // Handle conversation resolution
    const onConversationResolvedHandler = () => {
      onAnalyticsEvent?.('chatwoot_conversation_resolved');
      handleConversationEnd();
    };

    // Connect to Chatwoot WebSocket
    chatwootIntegration.connectToChatwoot(liveAgentHandoffDetails, onMessageHandler, onConversationResolvedHandler);

    // Set timeout for live agent connection (5 minutes)
    liveAgentTimeoutRef.current = setTimeout(() => {
      onAnalyticsEvent?.('live_agent_timeout');
      handleConversationEnd();
    }, 300000); // 5 minutes

    return () => {
      if (liveAgentTimeoutRef.current) {
        clearTimeout(liveAgentTimeoutRef.current);
      }
    };
  }, [liveAgentHandoffDetails]);

  // Cleanup: Disconnect from Chatwoot when chat modal is closed
  useEffect(() => {
    if (!state.showChatWithUsModal && connectedToLiveAgentRef.current && chatwootIntegrationRef.current) {
      chatwootIntegrationRef.current.disconnectFromChatwoot();
      chatwootIntegrationRef.current = null;
      connectedToLiveAgentRef.current = false;
      if (liveAgentTimeoutRef.current) {
        clearTimeout(liveAgentTimeoutRef.current);
        liveAgentTimeoutRef.current = null;
      }
    }
  }, [state.showChatWithUsModal]);

  // Handle conversation end - cleanup and reconnect to AI
  const handleConversationEnd = () => {
    if (chatwootIntegrationRef.current) {
      chatwootIntegrationRef.current.disconnectFromChatwoot();
      chatwootIntegrationRef.current = null;
    }
    connectedToLiveAgentRef.current = false;
    if (liveAgentTimeoutRef.current) {
      clearTimeout(liveAgentTimeoutRef.current);
      liveAgentTimeoutRef.current = null;
    }

    // Set flags to reconnect to AI chatbot
    setLiveAgentToAIHandoff(true);
    setReconnectToRoom(true);
  };
  return {
    connectedToLiveAgent: connectedToLiveAgentRef.current,
    chatwootIntegration: chatwootIntegrationRef.current
  };
};
//# sourceMappingURL=useLiveAgent.js.map