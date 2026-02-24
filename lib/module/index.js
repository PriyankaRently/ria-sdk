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
export function multiply(a, b) {
  return RiaSdk.multiply(a, b);
}
export { AiDisclaimer, LiveAgentHandoffBadge, NoNetworkBadge, ChatbotLoader, ChatMessageText, ChatWidgetIcon, MessageInput, PopupBubbleText, TypingDots, RiaWidget };
//# sourceMappingURL=index.js.map