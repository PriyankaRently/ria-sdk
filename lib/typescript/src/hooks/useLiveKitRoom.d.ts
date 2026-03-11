interface UseLiveKitRoomProps {
    onAnalyticsEvent?: (eventName: string, properties?: any) => void;
    onFetchGeocodeSuggestions?: (city: string) => void;
}
/**
 * Hook to manage LiveKit room events, data messages, transcriptions, and participant state.
 * Handles all real-time communication with the AI chatbot through LiveKit.
 */
export declare const useLiveKitRoom: ({ onAnalyticsEvent, onFetchGeocodeSuggestions, }?: UseLiveKitRoomProps) => {
    rawDataFromAI: any;
    participantCount: number;
    isConnected: boolean;
};
export {};
//# sourceMappingURL=useLiveKitRoom.d.ts.map