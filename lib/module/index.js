"use strict";

import RiaSdk from "./NativeRiaSdk.js";
import { AiDisclaimer } from "./components/AiDisclaimer.js";
import { LiveAgentHandoffBadge, NoNetworkBadge } from "./components/ChatbotBadges.js";
import { ChatbotLoader } from "./components/ChatbotLoader.js";
import { ChatMessageText } from "./components/ChatMessageText.js";
import { ChatWidgetIcon } from "./components/ChatWidgetIcon.js";
import { MessageInput } from "./components/MessageInput.js";
import { PopupBubbleText } from "./components/PopupBubbleText.js";
import { TypingDots } from "./components/TypingDotsComponent.js";
import { RiaWidget } from "./components/RiaWidget.js";
import { ChatWithUsModal } from "./components/ChatWithUsModal.js";
export function multiply(a, b) {
  return RiaSdk.multiply(a, b);
}

// Export components
export { AiDisclaimer, LiveAgentHandoffBadge, NoNetworkBadge, ChatbotLoader, ChatMessageText, ChatWidgetIcon, MessageInput, PopupBubbleText, TypingDots, RiaWidget, ChatWithUsModal };

// Export context and hooks
export { RiaChatBotProvider, useRiaChatBot } from "./context/index.js";
export { useChatbotContext, useChatMessages, useLiveAgent, useLiveKitRoom, useReconnectionToChatbot } from "./hooks/index.js";

// Export types

// Export services
export { ApiService } from "./services/index.js";
//# sourceMappingURL=index.js.map