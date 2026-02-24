import React from 'react';
type Message = {
    id: string;
    content: string;
    timestamp: string;
    user: 'AI' | 'PROSPECT' | 'LIVE_AGENT';
    likeStatus?: number;
};
interface RiaWidgetProps {
    onClose?: () => void;
    initialMessages?: Message[];
    showNoNetwork?: boolean;
    showLiveAgentHandoff?: boolean;
    showLoader?: boolean;
    timeExceeded?: boolean;
}
export declare const RiaWidget: React.FC<RiaWidgetProps>;
export {};
//# sourceMappingURL=RiaWidget.d.ts.map