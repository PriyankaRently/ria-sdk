import React, { type JSX } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { ViewStyle, TextStyle } from 'react-native';

interface TChatWidgetIconProps {
  bottom?: number;
  right?: number;
  enableShineAnimation?: boolean;
  onPress?: () => void;
}

export const ChatWidgetIcon = ({
  bottom = 20,
  right = 20,
  enableShineAnimation = true,
  onPress,
}: TChatWidgetIconProps): JSX.Element => {
  const shineValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (enableShineAnimation) {
      const shineAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(shineValue, {
            toValue: 1,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(shineValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
      const interval = setInterval(() => {
        shineAnimation.start();
      }, 3000);
      return () => {
        clearInterval(interval);
        shineAnimation.stop();
      };
    }
    return;
  }, [enableShineAnimation]);

  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <View style={[styles.container, { bottom, right }]}>
      <TouchableOpacity onPress={handlePress} style={styles.iconWrapper}>
        <View style={styles.iconWrapper}>
          <Text style={styles.chatIcon}>💬</Text>
          {enableShineAnimation && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.shineContainer,
                {
                  opacity: shineValue.interpolate({
                    inputRange: [0, 0.3, 0.7, 1],
                    outputRange: [0, 1, 1, 0],
                  }),
                  transform: [
                    {
                      translateX: shineValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-80, 80],
                      }),
                    },
                    {
                      translateY: shineValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-80, 80],
                      }),
                    },
                  ],
                },
              ]}
            >
              <LinearGradient
                colors={['transparent', 'transparent', 'transparent', 'rgba(220, 220, 220, 0.99)', 'rgba(255, 255, 255, 1)', 'rgba(220, 220, 220, 0.99)', 'transparent', 'transparent', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.shineGradient}
              />
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

interface TChatWidgetIconStyles {
  container: ViewStyle;
  iconWrapper: ViewStyle;
  chatIcon: TextStyle;
  shineContainer: ViewStyle;
  shineGradient: ViewStyle;
  [key: string]: ViewStyle | TextStyle;
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
  },
  chatIcon: {
    fontSize: 24,
    color: '#FFFFFF',
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