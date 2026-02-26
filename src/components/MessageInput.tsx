import React, { type JSX } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View, Text, Platform } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Colors, Spacings } from '../tokens';

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

  const sendBackgroundColor = !disabled ? Colors.secondary[600] : Colors.neutral[300];

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
      <BottomSheetTextInput
        style={styles.textInput}
        placeholder="Start a search or ask a question..."
        placeholderTextColor={Colors.neutral[400]}
        onChangeText={onTextChange}
        value={text}
        multiline={true}
        onFocus={onInputFocus}
      />
      <TouchableOpacity
        disabled={disabled}
        onPress={() => handleSendMessage()}
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
    shadowColor: Colors.neutral[500],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 10,
    borderColor: Colors.neutral[300],
    borderWidth: 1,
    borderRadius: Spacings.big,
    paddingHorizontal: 10,
    marginTop: Spacings.sm,
    backgroundColor: Colors.shades[0],
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  sendIconContainer: {
    alignSelf: 'flex-end',
  },
  sendIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sendIconText: {
    color: Colors.neutral[50],
    fontSize: 24,
    transform: [{ rotate: '90deg' }],
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    marginRight: Spacings.md,
    marginLeft: Spacings.xx_sm,
    color: Colors.neutral[800],
    minHeight: 40,
    maxHeight: 100,
  },
});