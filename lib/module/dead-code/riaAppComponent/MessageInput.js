"use strict";

import React from "react";
import { useChat, useRoomContext } from "@livekit/react-native";
import { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { RDColors, Spacings } from "theme/ui/tokens";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { RDBadge, RDPressableOpacity } from "theme/ui/components";
import { vs } from "theme/ui/lib";
import { useDispatch, useSelector } from "react-redux";
import { getLivekitTokenAction, sendMessageToChatwootAction, storeChatMessageAction } from "../actions.js";
import { luxonHelper } from "../../../../constants/helper/luxonHelper";
import { CHATBOT_USER_ENUM } from "../../../../constants/Constants";
import { generateRandomKey } from "../chatbotHelperFunctions.js";
import { heapTrackEvent } from "../../../../constants/helper/heapAnalytics";
import { HEAP_RIA_CHATBOT_EVENTS } from "../../../../constants/helper/heapEvents";
import { Platform } from "react-native";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MessageInput = ({
  onInputFocus,
  keyboardVisible,
  onInputHeightChange
}) => {
  const [textMessage, setTextMessage] = useState("");
  const room = useRoomContext();
  const {
    send
  } = useChat();
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const {
    isLiveAgentConnected,
    chatSessionId,
    connectedToRoom
  } = useSelector(state => state.riaChatBot);
  const actionToDisable = useSelector(state => state.networkState.offline);
  const disableSend = actionToDisable || !textMessage.trim() || !connectedToRoom && !isLiveAgentConnected;
  const [inputHeight, setInputHeight] = useState(40);
  const sendBackgroundColor = !disableSend ? RDColors.secondary[600] : RDColors.neutral[300];
  const handleHeightChange = height => {
    if (height !== inputHeight) {
      setInputHeight(height);
      onInputHeightChange?.();
    }
  };
  const handleSendMessage = async () => {
    if (!textMessage.trim()) return;
    Keyboard.dismiss();
    if (isLiveAgentConnected) {
      const message = {
        id: generateRandomKey(),
        content: textMessage,
        timestamp: luxonHelper.getCurrentDateTime('h:mm a'),
        user: CHATBOT_USER_ENUM.PROSPECT
      };
      dispatch(storeChatMessageAction(message));
      dispatch(sendMessageToChatwootAction({
        messageContent: textMessage
      }));
      heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.LIVE_AGENT_SEND_MESSAGE_TO_USER, {
        chat_session_id: chatSessionId,
        isLiveAgentConnected: true
      });
    } else {
      if (textMessage.trim() && !isSending && room) {
        setIsSending(true);
        try {
          await send(textMessage);
          heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.MESSAGE_SENT, {
            chat_session_id: chatSessionId,
            isLiveAgentConnected: false
          });
        } catch (error) {
          heapTrackEvent(HEAP_RIA_CHATBOT_EVENTS.MESSAGE_SEND_FAILED, {
            chat_session_id: chatSessionId,
            error: error.message
          });
          dispatch(getLivekitTokenAction(true));
        } finally {
          setIsSending(false);
        }
      }
    }
    setTextMessage("");
  };
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.sendTextContainer, {
      marginBottom: Platform.OS === 'android' && keyboardVisible ? -20 : 0
    }],
    onLayout: event => {
      const {
        height
      } = event.nativeEvent.layout;
      handleHeightChange(height);
    },
    children: [/*#__PURE__*/_jsx(BottomSheetTextInput, {
      style: styles.textInput,
      placeholder: "Start a search or ask a question...",
      placeholderTextColor: RDColors.neutral[400],
      onChangeText: setTextMessage,
      value: textMessage,
      multiline: true,
      onFocus: onInputFocus
    }), /*#__PURE__*/_jsx(RDPressableOpacity, {
      disabled: disableSend,
      onPress: () => handleSendMessage(),
      style: styles.sendIconContainer,
      children: /*#__PURE__*/_jsx(RDBadge, {
        iconName: "PaperAirplaneIcon",
        iconColor: RDColors.neutral[50],
        backgroundColor: sendBackgroundColor,
        iconSize: 24,
        iconStyle: styles.sendIconStyle,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 10
      })
    })]
  });
};
const styles = StyleSheet.create({
  sendTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: RDColors.neutral[500],
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 10,
    borderColor: RDColors.neutral[300],
    borderWidth: 1,
    borderRadius: Spacings.big,
    paddingHorizontal: vs(10),
    marginTop: Spacings.sm,
    backgroundColor: RDColors.shades[0],
    paddingVertical: Platform.OS === 'ios' ? vs(12) : vs(8)
  },
  sendIconStyle: {
    transform: [{
      rotate: '90deg'
    }]
  },
  sendIconContainer: {
    alignSelf: 'flex-end'
  },
  textInput: {
    flex: 1,
    fontSize: vs(14),
    marginRight: Spacings.md,
    marginLeft: Spacings.xx_sm,
    color: RDColors.neutral[800],
    minHeight: vs(40),
    maxHeight: vs(100)
  }
});
//# sourceMappingURL=MessageInput.js.map