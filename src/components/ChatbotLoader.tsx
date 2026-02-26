import React, { type JSX } from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Colors, Spacings } from '../tokens';

interface TChatbotLoaderProps {
  style?: ViewStyle;
  showChatbotLoadingMessage?: boolean;
  logoUri?: string;
}

export const ChatbotLoader = ({ style, showChatbotLoadingMessage = false, logoUri }: TChatbotLoaderProps): JSX.Element => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

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
    return () => scaleAnimation.stop();
  }, [scaleValue]);

  return (
    <View style={[styles.container, style]}>
      {logoUri ? (
        <Animated.Image
          source={{ uri: logoUri }}
          style={[
            styles.logo,
            { transform: [{ scale: scaleValue }] },
          ]}
        />
      ) : (
        <Animated.View
          style={[
            styles.logo,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <Text style={styles.logoText}>💬</Text>
        </Animated.View>
      )}
      {showChatbotLoadingMessage && (
        <View style={styles.textContainer}>
          <Text style={styles.loaderMessage}>
            We're having issues connecting to our servers. Try closing the app and starting a new conversation.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacings.lg,
  },
  textContainer: {
    marginTop: Spacings.md,
    marginHorizontal: Spacings.lg,
  },
  loaderMessage: {
    textAlign: 'center',
  },
  logo: {
    width: 32,
    height: 48,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 12,
    color: Colors.neutral[600],
  },
});
