/**
 * Hook to manage live agent handoff lifecycle through Chatwoot WebSocket integration.
 * Handles connecting to Chatwoot when live agent is needed, managing WebSocket events,
 * and handling conversation resolution with timeout.
 */
export declare const useLiveAgent: ({ ChatwootIntegration, onAnalyticsEvent, }: {
    ChatwootIntegration?: any;
    onAnalyticsEvent?: (eventName: string, properties?: any) => void;
}) => {
    connectedToLiveAgent: boolean;
    chatwootIntegration: any;
};
//# sourceMappingURL=useLiveAgent.d.ts.map