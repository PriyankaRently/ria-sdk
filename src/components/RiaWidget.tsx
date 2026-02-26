import React from "react";
import { ChatWithUsModal } from "./ChatWithUsModal";

/**
 * RiaWidget component serves as the root entry point for chatbot-related features within the application.
 * 
 * @remarks
 * This component is designed with future scalability in mind, acting as the foundational wrapper for all chatbot functionalities.
 * It currently renders the `ChatWithUsModal` component, but is intended to be extended to support additional features such as voice assistant and other interactive capabilities.
 * All future enhancements and features related to the chatbot will have their root integration within this file.
 */

type Message = {
  id: string;
  content: string;
  timestamp: string;
  user: 'AI' | 'PROSPECT' | 'LIVE_AGENT';
  likeStatus?: number;
};

interface RiaWidgetProps {
  showModal?: boolean;
  onClose?: () => void;
  chatMessages?: Message[];
  isTyping?: boolean;
  showLoader?: boolean;
  showNoNetwork?: boolean;
  showLiveAgentHandoff?: boolean;
  timeExceeded?: boolean;
  showDisclaimer?: boolean;
  previousChatSession?: any;
  onInputFocus?: () => void;
  keyboardVisible?: boolean;
  onInputHeightChange?: () => void;
  onSend?: () => void;
  disabled?: boolean;
  text?: string;
  onTextChange?: (text: string) => void;
  showTextInput?: boolean;
  onPressNotContinueChat?: () => void;
  onPressYesContinueChat?: () => void;
  isOffline?: boolean;
  isLiveAgentConnected?: boolean;
  isLiveAgentHandoff?: boolean;
  onEndChat?: () => void;
  showEndDropdown?: boolean;
  onToggleEndDropdown?: () => void;
  logoUri?: string;
  onLike?: (messageId: string, likeStatus: number) => void;
  onDislike?: (messageId: string, likeStatus: number) => void;
  chatWidgetUri?: string;
  rentlyChatIconUri?: string;
}

export const RiaWidget: React.FC<RiaWidgetProps> = (props) => {
    return (
        <ChatWithUsModal {...props} />
    );
};