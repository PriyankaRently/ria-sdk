import { useCallback, useEffect, useRef, useState, type JSX } from 'react';
import {
  BackHandler,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native';
import { useRoomContext } from '@livekit/react-native';
import { ConnectionState } from 'livekit-client';
import { RDColors } from '../assets/colors';
import { Spacings } from '../assets/spacings';
import {
  SDKBadge,
  SDKButton,
  SDKHeroIcon,
  SDKPressable,
  SDKText,
} from './ui';
import { TypingDots } from './TypingDotsComponent';
import { MessageInput } from './MessageInput';
import { useLiveKitRoom } from '../hooks/useLiveKitRoom';
import { useChatMessages } from '../hooks/useChatMessages';
import { useChatbotContext } from '../hooks/useChatbotContext';
import { ChatMessageText } from './ChatMessageText';
import { ChatbotLoader } from './ChatbotLoader';
import { LiveAgentHandoffBadge, NoNetworkBadge } from './ChatbotBadges';
import { useLiveAgent } from '../hooks/useLiveAgent';
import { AiDisclaimer } from './AiDisclaimer';
import { useRiaChatBot } from '../context/RiaChatBotContext';
import { CHATBOT_USER_ENUM } from '../types';

interface ChatWithUsModalCallbacks {
  onModalOpened?: (params: { screenName: string; prospectId?: string }) => void;
  onModalClosed?: (params: { screenName: string }) => void;
  onSendMessage?: (params: {
    message: string;
    chatSessionId: string | null;
    isLiveAgentConnected: boolean;
  }) => void;
  onSendMessageFailed?: (params: {
    error: string;
    chatSessionId: string | null;
  }) => void;
  onLikePress?: (params: { messageId: string; likeStatus: number }) => void;
  onEndChat?: () => void;
}

interface ChatWithUsModalProps extends ChatWithUsModalCallbacks {
  prospectId?: string;
  isOffline?: boolean;
}

/**
 * ChatWithUsModal renders a chat modal for users to interact with RIA chatbot or a live agent.
 * Features include message display, agent handoff, LiveKit integration, and conversation controls.
 *
 * @returns {JSX.Element} Chat modal component.
 */
export const ChatWithUsModal = ({
  prospectId,
  isOffline = false,
  onModalOpened,
  onModalClosed,
  onSendMessage,
  onSendMessageFailed,
  onLikePress,
  onEndChat: onEndChatCallback,
}: ChatWithUsModalProps = {}): JSX.Element => {
  const {
    showChatWithUsModalState,
    setShowChatWithUsModal,
    screenName,
    chatMessages,
    isLiveAgentHandoff,
    isLiveAgentConnected,
    previousChatSession,
    previousChatHistory,
    livekitToken,
    liveAgentToAIHandoff,
    chatbotLoading,
    connectedToRoom,
    showChatbotLoader,
    storeChatMessage,
    persistPreviousChatHistory,
    persistChatSessionId,
    getLivekitToken,
    sendMessageToChatwoot,
    setLiveAgentHandoffStatus,
    setIsLiveAgentConnected,
    setLiveAgentToAIHandoff,
  } = useRiaChatBot();

  const snapPoints = ['100%'];

  const [showTextInput, setShowTextInput] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showEndDropdown, setShowEndDropdown] = useState(false);

  const scrollViewRef = useRef<any>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const scrollDownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevMessagesLengthRef = useRef(0);
  const prevLastMessage = useRef<string | undefined>(undefined);

  const actionToDisable = isOffline;

  const room = useRoomContext();
  const isConnected = room?.state === ConnectionState.Connected;

  useLiveKitRoom();
  useChatbotContext();
  const { isTyping } = useChatMessages();
  const { connectedToLiveAgent, chatwootIntegration } = useLiveAgent({
    ChatwootIntegration: undefined,
    onAnalyticsEvent: undefined,
  });

  useEffect(() => {
    if (connectedToRoom && isOffline) {
      room?.disconnect();
    }
  }, [connectedToRoom, isOffline, room]);

  useEffect(() => {
    const showSub =
      Platform.OS === 'ios'
        ? Keyboard.addListener('keyboardWillShow', () => {
            setKeyboardVisible(true);
          })
        : Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
          });

    const hideSub =
      Platform.OS === 'ios'
        ? Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardVisible(false);
          })
        : Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
          });

    return () => {
      showSub.remove();
      hideSub.remove();
      clearScrollDownTimeout();
    };
  }, []);

  useEffect(() => {
    if (
      !isConnected &&
      !isLiveAgentConnected &&
      !isOffline &&
      previousChatHistory.length === 0
    ) {
      showChatbotLoader({ showLoader: true });
      if (liveAgentToAIHandoff) {
        showChatbotLoader({ showLoader: false });
      }
    }
  }, [
    isConnected,
    liveAgentToAIHandoff,
    isLiveAgentConnected,
    isOffline,
    previousChatHistory.length,
    showChatbotLoader,
    connectedToLiveAgent,
  ]);

  useEffect(() => {
    if (showChatWithUsModalState) {
      onModalOpened?.({ screenName, prospectId });
      bottomSheetModalRef.current?.present();
      const hasNoPreviousChatHistory = !previousChatSession?.id;
      if (!livekitToken && hasNoPreviousChatHistory) {
        setShowTextInput(true);
        getLivekitToken(true);
      }
      if (previousChatHistory.length > 0) {
        showChatbotLoader({ showLoader: false });
      }
      if (previousChatHistory && previousChatHistory.length === 0) {
        setShowTextInput(true);
      }
    } else {
      onCloseModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showChatWithUsModalState]);

  const onCloseModal = () => {
    if (keyboardVisible) {
      Keyboard.dismiss();
    }
    onModalClosed?.({ screenName });
    bottomSheetModalRef.current?.dismiss();
    setShowChatWithUsModal(false);
  };

  const onPressNotContinueChat = useCallback(() => {
    setShowTextInput(true);
    showChatbotLoader({ showLoader: true });
    persistPreviousChatHistory([]);
    persistChatSessionId({ chatSessionId: null });
    storeChatMessage([]);
    getLivekitToken(true);
  }, [
    showChatbotLoader,
    persistPreviousChatHistory,
    persistChatSessionId,
    storeChatMessage,
    getLivekitToken,
  ]);

  const onPressYesContinueChat = useCallback(() => {
    setShowTextInput(true);
    persistPreviousChatHistory([]);
    showChatbotLoader({ showLoader: true });
    getLivekitToken(true);
  }, [persistPreviousChatHistory, showChatbotLoader, getLivekitToken]);

  const onEndChat = useCallback(() => {
    if (isLiveAgentHandoff) {
      sendMessageToChatwoot({
        messageContent:
          'This is a system generated message,\n The user has ended the conversation.',
        systemGenerated: true,
      });
      chatwootIntegration?.close();
      setLiveAgentHandoffStatus({ isLiveAgentHandoff: false });
      setIsLiveAgentConnected(false);
      setLiveAgentToAIHandoff(true);
      onEndChatCallback?.();
    }
  }, [
    isLiveAgentHandoff,
    sendMessageToChatwoot,
    chatwootIntegration,
    setLiveAgentHandoffStatus,
    setIsLiveAgentConnected,
    setLiveAgentToAIHandoff,
    onEndChatCallback,
  ]);

  useEffect(() => {
    const backAction = () => {
      if (bottomSheetModalRef.current) {
        setShowChatWithUsModal(false);
        return true;
      }
      return false;
    };

    if (showChatWithUsModalState) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
      return () => backHandler.remove();
    }
    return undefined;
  }, [showChatWithUsModalState, setShowChatWithUsModal]);

  const clearScrollDownTimeout = () => {
    if (scrollDownTimeoutRef.current) {
      clearTimeout(scrollDownTimeoutRef.current);
      scrollDownTimeoutRef.current = null;
    }
  };

  const onInputHeightChange = () => {
    handleScrollDown();
  };

  const handleScrollDown = () => {
    clearScrollDownTimeout();
    scrollDownTimeoutRef.current = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd?.({ animated: false });
    }, 150);
  };

  useEffect(() => {
    if (chatMessages.length === 0) return;

    const lastMessage = chatMessages[chatMessages.length - 1];
    if (!lastMessage) return;
    
    const prevLength = prevMessagesLengthRef.current;
    const prevContent = prevLastMessage.current;

    const isNewMessage = prevLength !== chatMessages.length;
    const isContentChanged = prevContent !== lastMessage.content;

    if (isNewMessage || isContentChanged) {
      if (lastMessage.user === CHATBOT_USER_ENUM.AI) {
        scrollViewRef.current?.scrollToEnd?.({ animated: false });
      } else {
        handleScrollDown();
      }
      prevMessagesLengthRef.current = chatMessages.length;
      prevLastMessage.current = lastMessage.content;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessages]);

  const handleInputFocus = () => {
    setShowDisclaimer(false);
    handleScrollDown();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onDismiss={() => {
          if (showChatWithUsModalState) {
            setShowChatWithUsModal(false);
          }
        }}
        enableOverDrag={false}
        enablePanDownToClose={true}
        handleIndicatorStyle={[
          styles.indicatorStyle,
          Platform.OS === 'ios' ? { marginTop: Spacings.xx_big } : null,
        ]}
        backgroundComponent={({ style }): JSX.Element => (
          <View
            style={[
              style,
              Platform.OS === 'ios'
                ? {
                    flex: 1,
                    backgroundColor: RDColors['chat-bot'][100],
                    opacity: 0.95,
                  }
                : styles.backgroundContainer,
            ]}
          />
        )}
      >
        <BottomSheetView style={styles.modalContainer}>
          {chatbotLoading ? (
            <ChatbotLoader />
          ) : (
            <Pressable
              style={styles.contentContainer}
              onPress={() => {
                if (showEndDropdown) setShowEndDropdown(false);
              }}
            >
              <View style={styles.headingContainer}>
                <View>
                  <SDKText variant="H5" weight="SemiBold">
                    Chat with us
                  </SDKText>
                  {isLiveAgentConnected && (
                    <SDKText variant="XSmall" weight="Medium">
                      🟢 Connected to live agent
                    </SDKText>
                  )}
                </View>
                <View style={styles.sideHeader}>
                  {isLiveAgentHandoff && (
                    <SDKPressable
                      onPress={() => setShowEndDropdown(!showEndDropdown)}
                    >
                      <SDKBadge
                        text="End"
                        backgroundColor={RDColors['background-overlays'][601]}
                        borderColor={RDColors.neutral[300]}
                        textColor={RDColors.shades[200]}
                        paddingHorizontal={Spacings.md}
                        paddingVertical={6}
                        borderWidth={1}
                        borderRadius={12}
                        textVariant="Small"
                        textWeight="Medium"
                      />
                    </SDKPressable>
                  )}
                  <SDKPressable
                    onPress={() => {
                      Keyboard.dismiss();
                      bottomSheetModalRef.current?.dismiss();
                      setShowChatWithUsModal(false);
                    }}
                  >
                    <SDKHeroIcon
                      iconName="MinusIcon"
                      color={RDColors.neutral[700]}
                      size={24}
                    />
                  </SDKPressable>
                </View>
              </View>
              <SDKPressable
                style={[
                  styles.endChatButton,
                  {
                    display:
                      showEndDropdown && isLiveAgentHandoff ? 'flex' : 'none',
                  },
                ]}
                onPress={() => {
                  setShowEndDropdown(false);
                  onEndChat();
                }}
              >
                <SDKBadge
                  text="Leave conversation"
                  backgroundColor={RDColors.neutral[100]}
                  textColor={RDColors.shades[200]}
                  paddingHorizontal={Spacings.sm}
                  paddingVertical={Spacings.x_sm}
                  borderRadius={8}
                  textVariant="Small"
                  textWeight="Medium"
                />
              </SDKPressable>
              <View style={styles.messageArea}>
                <ScrollView
                  ref={scrollViewRef}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={
                    keyboardVisible ? styles.scrollViewContent : {}
                  }
                  onContentSizeChange={() => {
                    handleScrollDown();
                  }}
                >
                  {chatMessages.map((item, index) => (
                    <ChatMessageText
                      key={index}
                      message={item}
                      onLikePress={onLikePress}
                    />
                  ))}
                  {isTyping && <TypingDots />}
                </ScrollView>
              </View>
              {isLiveAgentHandoff && !isLiveAgentConnected && (
                <LiveAgentHandoffBadge />
              )}
              {actionToDisable && <NoNetworkBadge />}
              <AiDisclaimer showDisclaimer={showDisclaimer} />
              {showTextInput ? (
                <MessageInput
                  onInputFocus={handleInputFocus}
                  keyboardVisible={keyboardVisible}
                  onInputHeightChange={onInputHeightChange}
                  onSendMessage={onSendMessage}
                  onSendMessageFailed={onSendMessageFailed}
                  isOffline={isOffline}
                />
              ) : (
                <View style={styles.footerContainer}>
                  <SDKText weight="Medium">Show previous conversation?</SDKText>
                  <View style={styles.footerButtonContainer}>
                    <SDKButton
                      title="No"
                      variant="secondary"
                      disabled={isOffline}
                      onPress={() => {
                        onPressNotContinueChat();
                      }}
                      style={styles.footerButton}
                    />
                    <SDKButton
                      title="Yes"
                      variant="primary"
                      disabled={isOffline}
                      onPress={() => {
                        onPressYesContinueChat();
                      }}
                      style={styles.footerButton}
                    />
                  </View>
                </View>
              )}
              {showTextInput && !keyboardVisible && (
                <SDKText
                  style={styles.accuracyText}
                  variant="XSmall"
                  weight="Regular"
                >
                  RIA Beta • AI-generated content may not always be accurate, be
                  sure to verify any information.
                </SDKText>
              )}
            </Pressable>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: RDColors.neutral[400],
    width: 40,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: RDColors['chat-bot'][100],
    opacity: 0.9,
  },
  modalContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Spacings.md,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacings.sm,
  },
  sideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.sm,
  },
  endChatButton: {
    position: 'absolute',
    top: 45,
    right: 60,
    zIndex: 100,
  },
  messageArea: {
    flex: 1,
    marginBottom: Spacings.sm,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  footerContainer: {
    marginBottom: Spacings.md,
    alignItems: 'center',
  },
  footerButtonContainer: {
    flexDirection: 'row',
    gap: Spacings.sm,
    marginTop: Spacings.sm,
  },
  footerButton: {
    flex: 1,
  },
  accuracyText: {
    textAlign: 'center',
    marginTop: Spacings.x_sm,
    color: RDColors.neutral[500],
  },
});
