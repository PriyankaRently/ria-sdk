import RiaSdk from './NativeRiaSdk';
import { AiDisclaimer } from './components/AiDisclaimer';
import { LiveAgentHandoffBadge, NoNetworkBadge } from './components/ChatbotBadges';
import { ChatbotLoader } from './components/ChatbotLoader';
import { ChatMessageText } from './components/ChatMessageText';
import { ChatWidgetIcon } from './components/ChatWidgetIcon';
import { MessageInput } from './components/MessageInput';
import { PopupBubbleText } from './components/PopupBubbleText';
import { TypingDots } from './components/TypingDotsComponent';
import { RiaWidget } from './components/RiaWidget';

export function multiply(a: number, b: number): number {
  return RiaSdk.multiply(a, b);
}

export {
  AiDisclaimer,
  LiveAgentHandoffBadge,
  NoNetworkBadge,
  ChatbotLoader,
  ChatMessageText,
  ChatWidgetIcon,
  MessageInput,
  PopupBubbleText,
  TypingDots,
  RiaWidget,
};
