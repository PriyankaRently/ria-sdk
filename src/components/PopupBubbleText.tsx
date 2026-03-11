import React from 'react';
import { View, type ViewStyle, StyleSheet, Animated } from 'react-native';
import { SDKText } from './ui';
import { RDColors, Spacings } from '../assets';

interface PopupBubbleTextProps {
  text: string;
  visible?: boolean;
  style?: ViewStyle;
}

export const PopupBubbleText = ({ text, visible = true, style }: PopupBubbleTextProps) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(10)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 10,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, opacity, translateY]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <SDKText variant="Small" weight="Medium" color={RDColors.shades[0]}>
        {text}
      </SDKText>
      <View style={styles.arrow} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: RDColors.secondary[600],
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
    borderRadius: 12,
    maxWidth: 200,
    shadowColor: RDColors.neutral[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  arrow: {
    position: 'absolute',
    bottom: -6,
    right: 20,
    width: 12,
    height: 12,
    backgroundColor: RDColors.secondary[600],
    transform: [{ rotate: '45deg' }],
  },
});
