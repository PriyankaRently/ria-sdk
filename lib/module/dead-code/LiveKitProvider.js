"use strict";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LiveKitRoom } from "@livekit/react-native";
import { liveKitWebSocketUrl } from '@rently-team/rently-renter-config';
import { useReconnectionToChatbot } from "./ChatBotHooks/useReconnectionToChatbot";
import { heapTrackEvent } from "../../../constants/helper/heapAnalytics";
import { HEAP_RIA_CHATBOT_EVENTS } from "../../../constants/helper/heapEvents";
import { checkPreviousChatSessionAction, fetchLivekitTokenAction, getLivekitTokenAction, setConnectedToRoomAction, setReconnectionAttemptAction, setReconnectToRoomAction, showChatBotLoaderAction } from "./actions.js";

/**
 * LiveKit Provider Component
 * 
 * Provides LiveKit real-time communication infrastructure for the RIA chatbot system.
 * Manages connection lifecycle, token generation, and retry logic for AI chatbot interactions.
 * 
 * @param {React.ReactNode} children - Child components that need access to LiveKit room context
 * 
 * @description
 * Core Responsibilities:
 * - Token Management: Fetches and refreshes LiveKit access tokens
 * - Connection Retry: Implements exponential backoff with 10 attempt limit
 * - Room State: Tracks connection status and manages reconnection logic
 * - Error Handling: Shows appropriate UI feedback for connection failures
 * - Analytics: Tracks connection events and token generation
 * 
 * Token Retry Logic:
 * - Attempts token fetch every 3 seconds
 * - Max 10 attempts before showing error message
 * - Resets counter on successful connection
 * 
 * Connection Flow:
 * 1. Redux triggers getLivekitToken flag
 * 2. Provider fetches token via API
 * 3. Sets connectToRoom=true when token received
 * 4. LiveKitRoom establishes WebRTC connection
 * 5. onConnected callback updates Redux state
 * 
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const LiveKitProvider = ({
  children
}) => {
  const {
    livekitToken: livekitAccessToken,
    getLivekitToken,
    chatSessionId,
    reconnectionAttempt,
    chatMessages
  } = useSelector(state => state.riaChatBot);
  const authKey = useSelector(state => state.auth.authKey);
  const dispatch = useDispatch();
  const {
    connectToRoom,
    setConnectToRoom
  } = useReconnectionToChatbot();
  useEffect(() => {
    if (chatMessages.length > 0) return;
    dispatch(checkPreviousChatSessionAction());
  }, [authKey]);
  useEffect(() => {
    if (!getLivekitToken) return;

    // Reset connection state and start token fetch attempts
    setConnectToRoom(false);

    // Fetch token immediately on first attempt
    if (reconnectionAttempt === 0) {
      dispatch(fetchLivekitTokenAction({}));
      dispatch(setReconnectionAttemptAction(1));
    }

    // Set up retry interval for subsequent attempts
    const intervalId = setInterval(() => {
      if (livekitAccessToken) {
        heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.LIVEKIT_TOKEN_GENERATED, {
          reconnectAttempts: reconnectionAttempt
        });
        dispatch(getLivekitTokenAction(false));
        setConnectToRoom(true);
        clearInterval(intervalId);
      } else if (reconnectionAttempt < 10) {
        // Retry fetching LiveKit token
        dispatch(fetchLivekitTokenAction({}));
        dispatch(setReconnectionAttemptAction(reconnectionAttempt + 1));
      } else if (reconnectionAttempt === 10) {
        // Exhausted all attempts, show error UI
        dispatch(showChatBotLoaderAction({
          showLoader: true,
          showMessage: true
        }));
        heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.EXHAUSTED_10_ATTEMPTS_FOR_TOKEN);
        clearInterval(intervalId);
      } else {
        clearInterval(intervalId);
      }
    }, 1500);
    return () => clearInterval(intervalId);
  }, [getLivekitToken, livekitAccessToken, reconnectionAttempt]);
  useEffect(() => {
    if (authKey && chatSessionId) {
      // To be handled once working in backend
      // dispatch(changeChatOwnershipAction());
    }
  }, [authKey]);

  // LiveKitRoom component handles the actual WebRTC connection using the provided token
  // It manages the connection lifecycle, including joining and leaving the room.
  return /*#__PURE__*/_jsx(LiveKitRoom, {
    serverUrl: liveKitWebSocketUrl // LiveKit server WebSocket endpoint
    ,
    token: livekitAccessToken // JWT token for room authentication  
    ,
    connect: connectToRoom // Controls when to establish connection
    ,
    audio: false // Audio disabled - text communication only
    ,
    onConnected: () => {
      heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.CONNECTED_TO_LIVEKIT_ROOM);
      dispatch(setConnectedToRoomAction(true));
    } // onConnected callback
    ,
    onDisconnected: () => {
      dispatch(setConnectedToRoomAction(false));
      dispatch(setReconnectToRoomAction(true));
    } // onDisconnected callback
    ,
    children: children
  });
};
//# sourceMappingURL=LiveKitProvider.js.map