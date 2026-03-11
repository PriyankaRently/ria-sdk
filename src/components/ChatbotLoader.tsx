import React from 'react';
import { View, StyleSheet, Animated, Easing, type ViewStyle } from 'react-native';
import { SDKText } from './ui';
import { Spacings } from '../assets';
import { useRiaChatBot } from '../context';

interface TChatbotLoaderProps {
  style?: ViewStyle;
}

export const ChatbotLoader = ({ style }: TChatbotLoaderProps) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const { state } = useRiaChatBot();
  const { showChatbotLoadingMessage } = state;

  React.useEffect(() => {
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    scaleAnimation.start();

    return () => {
      scaleAnimation.stop();
    };
  }, [scaleValue]);

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        source={require('../assets/icons/rentlyChatIcon.png')}
        style={[styles.image, { transform: [{ scale: scaleValue }] }]}
        resizeMode="contain"
      />
      {showChatbotLoadingMessage && (
        <SDKText variant="Small" weight="Regular" style={styles.text}>
          Loading...
        </SDKText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacings.sm,
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    marginTop: Spacings.sm,
  },
});
