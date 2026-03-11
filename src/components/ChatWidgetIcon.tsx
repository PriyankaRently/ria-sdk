import { useState, useEffect, type JSX } from 'react';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  interpolate,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { SDKPressable } from './ui';
import { PopupBubbleText } from './PopupBubbleText';
import { useRiaChatBot } from '../context/RiaChatBotContext';

interface ChatWidgetIconProps {
  bottom?: number;
  right?: number;
  screenName: string;
  enableShineAnimation?: boolean;
  iconUri?: string | ImageSourcePropType;
  onPress?: (screenName: string) => void;
}

export const ChatWidgetIcon = ({
  bottom = 16,
  right = 16,
  screenName,
  enableShineAnimation = true,
  iconUri,
  onPress: onPressCallback,
}: ChatWidgetIconProps): JSX.Element | null => {
  const { showChatWithUsModalState, setShowChatWithUsModal } = useRiaChatBot();
  const [showBubble, setShowBubble] = useState(false);
  const shineProgress = useSharedValue(0);

  // Determine image source - use passed iconUri or fallback to SDK default
  const imageSource = iconUri
    ? typeof iconUri === 'string'
      ? { uri: iconUri }
      : iconUri
    : require('../assets/chatWidget.png');

  useEffect(() => {
    if (!enableShineAnimation || showChatWithUsModalState) return;

    const startShineAnimation = () => {
      shineProgress.value = withSequence(
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 0 })
      );
    };

    startShineAnimation();

    const interval = setInterval(() => {
      startShineAnimation();
    }, 3000);

    return () => clearInterval(interval);
  }, [enableShineAnimation, showChatWithUsModalState, shineProgress]);

  const onPress = () => {
    onPressCallback?.(screenName);
    setShowChatWithUsModal(true);
  };

  const onLongPress = () => {
    setShowBubble(true);
  };

  const onPressOut = () => {
    setShowBubble(false);
  };

  const shineAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      shineProgress.value,
      [0, 0.3, 0.7, 1],
      [0, 1, 1, 0],
      Extrapolate.CLAMP
    );

    const translateX = interpolate(
      shineProgress.value,
      [0, 1],
      [-80, 80],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      shineProgress.value,
      [0, 1],
      [-80, 80],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX: translateX }, { translateY: translateY }] as any,
    };
  });

  if (showChatWithUsModalState) {
    return null;
  }

  return (
    <View style={[styles.container, { bottom, right }]}>
      <SDKPressable
        onPress={onPress}
        onLongPress={onLongPress}
        onPressOut={onPressOut}
      >
        <View style={styles.iconWrapper}>
          <Image source={imageSource} style={styles.chatIcon} />
          {enableShineAnimation && (
            <Animated.View
              pointerEvents="none"
              // @ts-ignore - Type instantiation depth issue with Animated styles
              style={[styles.shineContainer, shineAnimatedStyle]}
            >
              <LinearGradient
                colors={[
                  'transparent',
                  'transparent',
                  'transparent',
                  'rgba(220, 220, 220, 0.99)',
                  'rgba(255, 255, 255, 1)',
                  'rgba(220, 220, 220, 0.99)',
                  'transparent',
                  'transparent',
                  'transparent',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.shineGradient}
              />
            </Animated.View>
          )}
        </View>
      </SDKPressable>
      {showBubble && (
        <PopupBubbleText text="Chat with us" style={styles.bubblePosition} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 25,
    position: 'relative',
  },
  chatIcon: {
    height: 50,
    width: 50,
  },
  bubblePosition: {
    position: 'absolute',
    right: 60,
    bottom: 0,
  },
  shineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50,
  },
  shineGradient: {
    width: '100%',
    height: '100%',
  },
});
