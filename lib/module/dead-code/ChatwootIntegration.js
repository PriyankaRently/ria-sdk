"use strict";

import { logger } from "../../../components/Logger/logger";
import { CHATBOT_USER_ENUM } from "../../../constants/Constants";
import { heapTrackEvent } from "../../../constants/helper/heapAnalytics";
import { HEAP_RIA_CHATBOT_EVENTS } from "../../../constants/helper/heapEvents";
import { luxonHelper } from "../../../constants/helper/luxonHelper";
import { chatWootWSUrl, chatwootAccountId } from '@rently-team/rently-renter-config';
/**
 * Establishes a WebSocket connection to Chatwoot for live agent handoff.
 * Handles incoming messages and conversation resolution events.
 *
 * @param {string} pubsubToken - The PubSub token for authenticating the WebSocket connection.
 * @param {function} onMessage - Callback invoked when a new message is received from Chatwoot.
 * @param {function} onConversationResolved - Callback invoked when the conversation is resolved.
 * @returns {WebSocket} The established WebSocket connection to Chatwoot.
 */

export const connectToChatwoot = (pubsubToken, onMessage, onConversationResolved) => {
  let ws = new WebSocket(chatWootWSUrl, null, {
    headers: {
      "User-Agent": "renter-app"
    }
  });

  /**
   * WebSocket Connection Handler
   * 
   * Subscribes to RoomChannel using pubsub_token for authentication.
   * Sends subscription message to receive live agent messages.
   */
  ws.onopen = () => {
    const subscribeMsg = {
      command: "subscribe",
      identifier: JSON.stringify({
        channel: "RoomChannel",
        account_id: chatwootAccountId,
        pubsub_token: pubsubToken
      })
    };
    ws.send(JSON.stringify(subscribeMsg));
  };

  /**
   * Message Handler - Chatwoot Event Processor
   * Processes different message types from Chatwoot WebSocket
   * Converts Chatwoot messages to app format and invokes callbacks.
   */
  ws.onmessage = async event => {
    const data = JSON.parse(event.data);
    // Handle different message types
    if (data.type === "ping") {
      return;
    }
    if (data.type === "welcome") {
      heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.CHATWOOT_STATUS, {
        status: "Welcome message received",
        pubsub_token: pubsubToken
      });
      return;
    }
    if (data.type === "confirm_subscription") {
      heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.CHATWOOT_STATUS, {
        status: "Subscription confirmed",
        pubsub_token: pubsubToken
      });
      return;
    }
    if (data.message) {
      const messagePayload = data.message;
      if (messagePayload.event === 'conversation.status_changed') {
        if (messagePayload.data.status === 'resolved' && onConversationResolved) {
          onConversationResolved();
          return;
        }
      }
      if (messagePayload.event === 'message.created') {
        try {
          if (messagePayload.data.message_type === 1) {
            const chatMessage = {
              user: CHATBOT_USER_ENUM.LIVE_AGENT,
              id: messagePayload.data.id.toString(),
              content: messagePayload.data.content?.replace(/\n+$/, ""),
              timestamp: luxonHelper.isoToLuxonDateTimeWithZone(new Date(messagePayload.data.created_at).toISOString(), 'local').toFormat('MMM d, h:mm a'),
              senderName: messagePayload.data.sender.name
            };
            onMessage(chatMessage);
          }
        } catch (error) {
          logger.error("[Chatwoot WS] Error calling onMessage:", error);
        }
      }
    }
  };

  // Error Handler
  ws.onerror = error => {
    heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.CHATWOOT_WEBSOCKET_ERROR, {
      error: error,
      pubsub_token: pubsubToken
    });
  };

  // Close Handler - Reconnection Logic
  ws.onclose = event => {
    heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.LIVE_AGENT_HANDOFF_DISCONNECTED, {
      code: event.code,
      reason: event.reason
    });
    const closeCodeDetails = {
      1000: "[Chatwoot WS] Normal closure",
      1001: "[Chatwoot WS] Going away",
      1002: "[Chatwoot WS] Protocol error",
      1003: "[Chatwoot WS] Unsupported data",
      1006: "[Chatwoot WS] Abnormal closure (network issue)",
      1011: "[Chatwoot WS] Server error"
    };
    heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.CHATWOOT_WEBSOCKET_CLOSED, {
      code: event.code,
      closeType: closeCodeDetails[event.code],
      reason: event.reason
    });
    if (event.code !== 1000) {
      ws = connectToChatwoot(pubsubToken, onMessage, onConversationResolved);
    }
  };
  return ws;
};
//# sourceMappingURL=ChatwootIntegration.js.map