import React, { type JSX } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { Platform } from 'react-native';
import { Colors } from '../tokens';

interface TMessageInputProps {
  onInputFocus?: () => void;
  keyboardVisible?: boolean;
  onInputHeightChange?: () => void;
  text?: string;
  onTextChange?: (text: string) => void;
  onSend?: () => void;
  disabled?: boolean;
}

export const MessageInput = ({
  onInputFocus,
  keyboardVisible = false,
  onInputHeightChange,
  text = '',
  onTextChange,
  onSend,
  disabled = false,
}: TMessageInputProps): JSX.Element => {
  const [inputHeight, setInputHeight] = React.useState(40);

  const handleHeightChange = (height: number) => {
    if (height !== inputHeight) {
      setInputHeight(height);
      onInputHeightChange?.();
    }
  };

  const handleSendMessage = () => {
    if (!text.trim() || disabled) return;
    Keyboard.dismiss();
    onSend?.();
  };

  const sendBackgroundColor = !disabled ? Colors.blue[500] : Colors.neutral[300];

  return (
    <View
      style={[
        styles.sendTextContainer,
        { marginBottom: Platform.OS === 'android' && keyboardVisible ? -20 : 0 },
      ]}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        handleHeightChange(height);
      }}
    >
      <TextInput
        style={styles.textInput}
        placeholder="Start a search or ask a question..."
        placeholderTextColor={Colors.gray[400]}
        onChangeText={onTextChange}
        value={text}
        multiline={true}
        editable={!disabled}
        onFocus={onInputFocus}
      />
      <TouchableOpacity
        disabled={disabled}
        onPress={handleSendMessage}
        style={styles.sendIconContainer}
      >
        <View
          style={[
            styles.sendIcon,
            { backgroundColor: sendBackgroundColor },
          ]}
        >
          <Text style={styles.sendIconText}>➤</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sendTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.neutral[600],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 10,
    borderColor: Colors.neutral[300],
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 10,
    marginTop: 8,
    backgroundColor: Colors.white,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  sendIconContainer: {
    alignSelf: 'flex-end',
  },
  sendIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIconText: {
    color: Colors.white,
    fontSize: 16,
    transform: [{ rotate: '90deg' }],
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    marginRight: 12,
    marginLeft: 4,
    color: Colors.gray[800],
    minHeight: 40,
    maxHeight: 100,
  },
});