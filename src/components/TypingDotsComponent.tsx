import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { Colors, Spacings } from '../tokens';

export const TypingDots = ({
  dotColor = Colors.neutral[600],
  animationDuration = 1500,
  textStyle = {},
}) => {
  const scale1 = React.useRef(new Animated.Value(1)).current;
  const scale2 = React.useRef(new Animated.Value(1)).current;
  const scale3 = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = (animatedValue: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: 1.6,
            duration: animationDuration / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: animationDuration / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate(scale1, 0);
    animate(scale2, 200);
    animate(scale3, 400);
  }, [animationDuration]);

  const interpolateOpacity = (scale: Animated.Value) => {
    return scale.interpolate({
      inputRange: [1, 1.6],
      outputRange: [0.4, 1],
    });
  };

  const interpolateColor = (scale: Animated.Value) => {
    return scale.interpolate({
      inputRange: [1, 1.2, 1.6],
      outputRange: [dotColor, Colors.neutral[300], Colors.neutral[300]],
    });
  };

  return (
    <View style={styles.typingIndicator}>
      <Text style={[styles.typingIndicatorAnimated, textStyle]}>Typing</Text>
      <View style={styles.typingIndicatorDots}>
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [{ scale: scale1 }],
              opacity: interpolateOpacity(scale1),
              backgroundColor: interpolateColor(scale1),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [{ scale: scale2 }],
              opacity: interpolateOpacity(scale2),
              backgroundColor: interpolateColor(scale2),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [{ scale: scale3 }],
              opacity: interpolateOpacity(scale3),
              backgroundColor: interpolateColor(scale3),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  typingIndicator: {
    paddingBottom: Spacings.sm,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'transparent',
  },
  typingIndicatorAnimated: {
    display: 'flex',
    alignItems: 'baseline',
    marginLeft: Spacings.x_sm,
    marginRight: Spacings.xx_sm, // Use Spacings for margin between text and dots
  },
  typingIndicatorDots: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacings.xx_sm, // Use Spacings for gap between dots
  },
  dot: {
    width: 2,
    height: 2,
    backgroundColor: Colors.neutral[600],
    borderRadius: 9999,
    opacity: 0.4,
  },
});
