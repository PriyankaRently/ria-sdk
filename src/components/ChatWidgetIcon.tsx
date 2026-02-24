import React, { type JSX } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import type { ViewStyle, ImageStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PopupBubbleText } from './PopupBubbleText';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  interpolate,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';

interface TChatWidgetIconProps {
  bottom?: number;
  right?: number;
  enableShineAnimation?: boolean;
  onPress?: () => void;
  iconUri?: string;
}

export const ChatWidgetIcon = ({
  bottom = 16,
  right = 16,
  enableShineAnimation = true,
  onPress,
  iconUri,
}: TChatWidgetIconProps): JSX.Element => {
  const [showBubble, setShowBubble] = React.useState(false);
  const shineProgress = useSharedValue(0);

  React.useEffect(() => {
    if (!enableShineAnimation) return;

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
  }, [enableShineAnimation, shineProgress]);

  const handlePress = () => {
    if (onPress) onPress();
  };

  const handleLongPress = () => {
    setShowBubble(true);
  };

  const handlePressOut = () => {
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
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View style={[styles.container, { bottom, right }]}>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
      >
        <View style={styles.iconWrapper}>
          {iconUri ? (
            <Image source={{ uri: iconUri }} style={styles.chatIcon} />
          ) : (
            <View style={[styles.chatIcon, styles.defaultIconContainer]}>
              <Text style={styles.defaultChatIcon}>💬</Text>
            </View>
          )}
          {enableShineAnimation && (
            <Animated.View
              pointerEvents="none"
              // @ts-ignore
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
      </TouchableOpacity>
      {showBubble && (
        <PopupBubbleText text="Chat with us" style={styles.bubblePosition} />
      )}
    </View>
  );
};

interface TChatWidgetIconStyles {
  container: ViewStyle;
  bubblePosition: ViewStyle;
  chatIcon: ImageStyle;
  iconWrapper: ViewStyle;
  shineContainer: ViewStyle;
  shineGradient: ViewStyle;
  defaultIconContainer: ViewStyle;
  defaultChatIcon: TextStyle;
  [key: string]: ViewStyle | ImageStyle | TextStyle;
}

const styles = StyleSheet.create<TChatWidgetIconStyles>({
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
  defaultIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
  },
  defaultChatIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});