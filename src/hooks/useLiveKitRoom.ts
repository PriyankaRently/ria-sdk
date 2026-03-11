import { useEffect, useRef, useState } from 'react';
import { useRoomContext } from '@livekit/react-native';
import { ConnectionState, RoomEvent } from 'livekit-client';
import { useRiaChatBot } from '../context';
import type { TChatMessageType } from '../types';

const CHATBOT_USER_ENUM = {
  CHATBOT: 'CHATBOT',
  USER: 'USER',
};

interface UseLiveKitRoomProps {
  onAnalyticsEvent?: (eventName: string, properties?: any) => void;
  onFetchGeocodeSuggestions?: (city: string) => void;
}

/**
 * Hook to manage LiveKit room events, data messages, transcriptions, and participant state.
 * Handles all real-time communication with the AI chatbot through LiveKit.
 */
export const useLiveKitRoom = ({
  onAnalyticsEvent,
  onFetchGeocodeSuggestions,
}: UseLiveKitRoomProps = {}) => {
  const room = useRoomContext();
  const { state, storeChatMessage, setConnectedToUltron, setReconnectToRoom, storeLiveAgentHandoffDetails } = useRiaChatBot();
  const {  } = state;

  const [rawDataFromAI, setRawDataFromAI] = useState<any>(null);
  const [participantCount, setParticipantCount] = useState(0);
  const isConnected = room?.state === ConnectionState.Connected;

  // Timeout refs for connection management
  const timeoutFor10SecondsRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutFor20SecondsRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutFor30SecondsRef = useRef<NodeJS.Timeout | null>(null);

  // Track participant state
  useEffect(() => {
    if (isConnected && room) {
      const updateParticipantCount = () => {
        const participants = Array.from(room.remoteParticipants.values());
        setParticipantCount(participants.length);
      };

      updateParticipantCount();
      room.on(RoomEvent.ParticipantConnected, updateParticipantCount);
      room.on(RoomEvent.ParticipantDisconnected, updateParticipantCount);

      return () => {
        room.off(RoomEvent.ParticipantConnected, updateParticipantCount);
        room.off(RoomEvent.ParticipantDisconnected, updateParticipantCount);
      };
    }
    return undefined;
  }, [isConnected, room]);

  // Handle data received from AI
  const handleDataReceived = (payload: Uint8Array, participant?: any, _kind?: any, topic?: string) => {
    if (!payload) return;

    const decoder = new TextDecoder();
    const strData = decoder.decode(payload);
    const data = JSON.parse(strData);

    onAnalyticsEvent?.('livekit_data_received', { topic, participant: participant?.identity });

    switch (topic) {
      case 'search_params':
        setRawDataFromAI(data);
        if (data?.city && onFetchGeocodeSuggestions) {
          onFetchGeocodeSuggestions(data.city);
        }
        break;

      case 'live_agent_redirect':
        onAnalyticsEvent?.('live_agent_redirect', data);
        storeLiveAgentHandoffDetails(data);
        setConnectedToUltron(false);
        break;

      case 'terminate_session':
        onAnalyticsEvent?.('session_terminated', data);
        setReconnectToRoom(false);
        break;

      default:
        break;
    }
  };

  // Handle AI transcription (streaming messages)
  const transcriptionHandler = (
    segments: any[],
    participant: any,
    _publication: any
  ) => {
    if (!segments || segments.length === 0) return;

    const firstSegment = segments[0];
    const isTranscriptionFinal = firstSegment.final;
    const transcriptionText = firstSegment.text;

    if (!transcriptionText) return;

    onAnalyticsEvent?.('transcription_received', {
      participant: participant?.identity,
      final: isTranscriptionFinal,
    });

    const newMessage: TChatMessageType = {
      id: `transcription-${Date.now()}`,
      user: CHATBOT_USER_ENUM.CHATBOT,
      content: transcriptionText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      likeStatus: 0,
      isFinal: isTranscriptionFinal,
    };

    storeChatMessage(newMessage);
  };

  // Handle participant attributes change (e.g., chat_session_id)
  const attributesChangeHandler = (changedAttributes: any, _participant: any) => {
    if (changedAttributes?.chat_session_id) {
      onAnalyticsEvent?.('chat_session_id_received', {
        sessionId: changedAttributes.chat_session_id,
      });
      // Store chat_session_id if needed
    }
  };

  // Register event listeners
  useEffect(() => {
    if (!room || !isConnected) return;

    setConnectedToUltron(true);

    // Clear any existing timeouts when connected
    if (timeoutFor10SecondsRef.current) {
      clearTimeout(timeoutFor10SecondsRef.current);
      timeoutFor10SecondsRef.current = null;
    }
    if (timeoutFor20SecondsRef.current) {
      clearTimeout(timeoutFor20SecondsRef.current);
      timeoutFor20SecondsRef.current = null;
    }
    if (timeoutFor30SecondsRef.current) {
      clearTimeout(timeoutFor30SecondsRef.current);
      timeoutFor30SecondsRef.current = null;
    }

    // Register event handlers
    room.on(RoomEvent.DataReceived, handleDataReceived);
    room.on(RoomEvent.TranscriptionReceived, transcriptionHandler);
    room.on(RoomEvent.ParticipantAttributesChanged, attributesChangeHandler);

    return () => {
      room.off(RoomEvent.DataReceived, handleDataReceived);
      room.off(RoomEvent.TranscriptionReceived, transcriptionHandler);
      room.off(RoomEvent.ParticipantAttributesChanged, attributesChangeHandler);
    };
  }, [isConnected, room]);

  // Handle connection timeouts
  useEffect(() => {
    if (!isConnected) {
      // Set progressive timeouts for connection attempts
      timeoutFor10SecondsRef.current = setTimeout(() => {
        onAnalyticsEvent?.('connection_timeout_10s');
      }, 10000);

      timeoutFor20SecondsRef.current = setTimeout(() => {
        onAnalyticsEvent?.('connection_timeout_20s');
      }, 20000);

      timeoutFor30SecondsRef.current = setTimeout(() => {
        onAnalyticsEvent?.('connection_timeout_30s');
        setReconnectToRoom(false);
      }, 30000);
    }

    return () => {
      if (timeoutFor10SecondsRef.current) clearTimeout(timeoutFor10SecondsRef.current);
      if (timeoutFor20SecondsRef.current) clearTimeout(timeoutFor20SecondsRef.current);
      if (timeoutFor30SecondsRef.current) clearTimeout(timeoutFor30SecondsRef.current);
    };
  }, [isConnected]);

  // Handle disconnection
  useEffect(() => {
    if (!isConnected) {
      setConnectedToUltron(false);
    }
  }, [isConnected]);

  return {
    rawDataFromAI,
    participantCount,
    isConnected,
  };
};
