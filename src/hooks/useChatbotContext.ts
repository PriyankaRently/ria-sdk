import { useEffect } from 'react';
import { useRiaChatBot } from '../context';

/**
 * Simple hook for managing chatbot context - notifies AI when live agent conversation ends.
 * All complex data formatting and publishing should be done by the SDK consumer using
 * the room object and their own helper functions.
 * 
 * For SDK consumers: Use `useRoomContext()` from @livekit/react-native directly
 * to publish data to the room using room.localParticipant.publishData().
 */
export const useChatbotContext = () => {
  const { state, setLiveAgentToAIHandoff } = useRiaChatBot();
  const { connectedToUltron, liveAgentToAIHandoff } = state;

  // Handle Live Agent to AI handoff.
  // Notifies the AI that the live agent conversation has ended, allowing the AI to resume.
  // This event is published once after reconnecting to the AI following a live agent interaction.
  useEffect(() => {
    if (connectedToUltron && liveAgentToAIHandoff) {
      setLiveAgentToAIHandoff(false);
      // SDK consumers should handle publishing 'chatwoot_conversation_resolved' to their room
    }
  }, [connectedToUltron, liveAgentToAIHandoff]);

  return {
    connectedToUltron,
    liveAgentToAIHandoff,
  };
};
