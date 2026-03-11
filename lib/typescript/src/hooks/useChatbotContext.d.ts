/**
 * Simple hook for managing chatbot context - notifies AI when live agent conversation ends.
 * All complex data formatting and publishing should be done by the SDK consumer using
 * the room object and their own helper functions.
 *
 * For SDK consumers: Use `useRoomContext()` from @livekit/react-native directly
 * to publish data to the room using room.localParticipant.publishData().
 */
export declare const useChatbotContext: () => {
    connectedToUltron: boolean;
    liveAgentToAIHandoff: boolean;
};
//# sourceMappingURL=useChatbotContext.d.ts.map