import { type JSX } from "react";
interface AiDisclaimerProps {
    showDisclaimer?: boolean;
    previousChatSession?: {
        id?: string | null;
    };
    chatMessages?: any[];
}
export declare const AiDisclaimer: ({ showDisclaimer, previousChatSession, chatMessages }: AiDisclaimerProps) => JSX.Element | null;
export {};
//# sourceMappingURL=AiDisclaimer.d.ts.map