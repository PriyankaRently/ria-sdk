import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, BackHandler, Keyboard, Platform, Pressable} from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { AiDisclaimer } from './AiDisclaimer';
import { LiveAgentHandoffBadge, NoNetworkBadge } from './ChatbotBadges';
import { ChatbotLoader } from './ChatbotLoader';
import { ChatMessageText } from './ChatMessageText';
import { MessageInput } from './MessageInput';
import { TypingDots } from './TypingDotsComponent';
import { Colors, Spacings } from '../tokens';
import { ChatWithUsModalStyles } from './ChatWithUsModal.style';

type Message = {
  id: string;
  content: string;
  timestamp: string;
  user: 'AI' | 'PROSPECT' | 'LIVE_AGENT';
  likeStatus?: number;
};

interface ChatWithUsModalProps {
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
}

export const ChatWithUsModal: React.FC<ChatWithUsModalProps> = ({
  showModal = false,
  onClose,
  chatMessages = [],
  isTyping = false,
  showLoader = false,
  showNoNetwork = false,
  showLiveAgentHandoff = false,
  timeExceeded = false,
  showDisclaimer = true,
  previousChatSession,
  onInputFocus,
  keyboardVisible = false,
  onInputHeightChange,
  onSend,
  disabled = false,
  text = '',
  onTextChange,
  showTextInput = true,
  onPressNotContinueChat,
  onPressYesContinueChat,
  isOffline = false,
  isLiveAgentConnected = false,
  isLiveAgentHandoff = false,
  onEndChat,
  showEndDropdown = false,
  onToggleEndDropdown,
}) => {
  const snapPoints = ["90%"];
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const scrollViewRef = useRef<any>(null);
  const scrollDownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevMessagesLengthRef = useRef(0);
  const prevLastMessage = useRef<string | undefined>(undefined);

  const [localShowEndDropdown, setLocalShowEndDropdown] = useState(showEndDropdown);
  const [localKeyboardVisible, setLocalKeyboardVisible] = useState(keyboardVisible);

  useEffect(() => {
    if (showModal) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [showModal]);

  useEffect(() => {
    const backAction = () => {
      onClose?.();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [onClose]);

  useEffect(() => {
    const showSub = Platform.OS === "ios"
      ? Keyboard.addListener("keyboardWillShow", () => {
        setLocalKeyboardVisible(true);
      })
      : Keyboard.addListener("keyboardDidShow", () => {
        setLocalKeyboardVisible(true);
      });

    const hideSub = Platform.OS === "ios"
      ? Keyboard.addListener("keyboardWillHide", () => {
        setLocalKeyboardVisible(false);
      })
      : Keyboard.addListener("keyboardDidHide", () => {
        setLocalKeyboardVisible(false);
      });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const clearScrollDownTimeout = () => {
    if (scrollDownTimeoutRef.current) {
      clearTimeout(scrollDownTimeoutRef.current);
      scrollDownTimeoutRef.current = null;
    }
  };

  const handleScrollDown = () => {
    clearScrollDownTimeout();
    scrollDownTimeoutRef.current = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
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
      if (lastMessage.user === 'AI') {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      } else {
        handleScrollDown();
      }
      prevMessagesLengthRef.current = chatMessages.length;
      prevLastMessage.current = lastMessage.content;
    }
  }, [chatMessages]);

  const handleInputFocus = () => {
    onInputFocus?.();
    handleScrollDown();
  };

  const handleToggleEndDropdown = () => {
    setLocalShowEndDropdown(!localShowEndDropdown);
    onToggleEndDropdown?.();
  };

  const handleEndChat = () => {
    setLocalShowEndDropdown(false);
    onEndChat?.();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onDismiss={onClose}
        enableOverDrag={false}
        enablePanDownToClose={true}
        handleIndicatorStyle={[ChatWithUsModalStyles.indicatorStyle, Platform.OS === "ios" ? { marginTop: Spacings.xx_big } : null]}
        backgroundComponent={({ style }) => (
          Platform.OS === "ios" ? (
            <View
              style={[
                style,
                {
                  flex: 1,
                  backgroundColor: Colors.chatBot[200],
                }
              ]}
            />
          ) : (
            <View
              style={[
                style,
                ChatWithUsModalStyles.backgroundContainer
              ]}
            />
          )
        )}
      >
        <BottomSheetView style={ChatWithUsModalStyles.modalContainer}>
          {showLoader ? (
            <ChatbotLoader />
          ) : (
            <Pressable style={ChatWithUsModalStyles.contentContainer} onPress={() => {
              if (localShowEndDropdown) setLocalShowEndDropdown(false);
            }}>
              <View style={ChatWithUsModalStyles.headingContainer}>
                <View>
                  <Text style={{fontSize: 20, fontWeight: '600', color: Colors.neutral[900]}} >Chat with us</Text>
                  {isLiveAgentConnected && <Text style={{fontSize: 10, fontWeight: '500', color: Colors.neutral[600]}} >🟢 Connected to live agent</Text>}
                </View>
                <View style={ChatWithUsModalStyles.sideHeader}>
                  {isLiveAgentHandoff && (<TouchableOpacity onPress={handleToggleEndDropdown} style={{marginRight: Spacings.sm}}>
                    <View style={{backgroundColor: Colors.backgroundOverlays[601], borderColor: Colors.neutral[300], paddingHorizontal: Spacings.md, paddingVertical: 6, borderWidth: 1, borderRadius: 12}} >
                      <Text style={{color: Colors.shades[200], fontSize: 12, fontWeight: '500'}} >End</Text>
                    </View>
                  </TouchableOpacity>)}
                  <TouchableOpacity onPress={onClose}>
                    <Text style={{fontSize: 24, color: Colors.neutral[700]}} >−</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={[ChatWithUsModalStyles.endChatButton, { display: localShowEndDropdown && isLiveAgentHandoff ? "flex" : "none" }]}
                onPress={handleEndChat}
              >
                <Text style={{color: Colors.shades[200], fontSize: 12, fontWeight: '500'}} >Leave conversation</Text>
              </TouchableOpacity>
              <View style={ChatWithUsModalStyles.messageArea}>
                <ScrollView ref={scrollViewRef}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={localKeyboardVisible ? 
                    ChatWithUsModalStyles.scrollViewContent 
                  : {}}
                  onContentSizeChange={handleScrollDown}
                  simultaneousHandlers={[]}
                >
                  {chatMessages.map((item, index) => (
                    <ChatMessageText key={index} message={item} />
                  ))}
                  {isTyping && <TypingDots />}
                </ScrollView>
              </View>
              {isLiveAgentHandoff && !isLiveAgentConnected && <LiveAgentHandoffBadge timeExceeded={timeExceeded} />}
              {showNoNetwork && <NoNetworkBadge />}
              <AiDisclaimer showDisclaimer={showDisclaimer} />
              {showTextInput ?
                <MessageInput onInputFocus={handleInputFocus} keyboardVisible={localKeyboardVisible} onInputHeightChange={onInputHeightChange} text={text} onTextChange={onTextChange} onSend={onSend} disabled={disabled} />
                :
                (<View style={ChatWithUsModalStyles.footerContainer} >
                  <Text style={{fontSize: 14, fontWeight: '500', color: Colors.neutral[900]}} >Show previous conversation?</Text>
                  <View style={ChatWithUsModalStyles.footerButtonContainer} >
                    <TouchableOpacity style={{backgroundColor: Colors.neutral[100], padding: Spacings.sm, borderRadius: 8, alignItems: 'center', flex: 1, marginRight: Spacings.sm}} onPress={onPressNotContinueChat} disabled={isOffline} >
                      <Text style={{color: Colors.neutral[900], fontSize: 14, fontWeight: '500'}} >No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: Colors.primary[600], padding: Spacings.sm, borderRadius: 8, alignItems: 'center', flex: 1, marginLeft: Spacings.sm}} onPress={onPressYesContinueChat} disabled={isOffline} >
                      <Text style={{color: Colors.neutral[100], fontSize: 14, fontWeight: '500'}} >Yes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                )}
              {
                showTextInput && !localKeyboardVisible && <Text style={[ChatWithUsModalStyles.accuracyText, {color: Colors.neutral[500]}]} >RIA Beta • AI-generated content may not always be accurate, be sure to verify any information.</Text>
              }
            </Pressable>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
