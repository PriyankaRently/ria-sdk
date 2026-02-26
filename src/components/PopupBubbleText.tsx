import { type JSX } from 'react';
import { View, StyleSheet, Text, type ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacings } from '../tokens';

interface TPopupBubbleTextProps {
  text: string;
  style?: ViewStyle;
}
/**
 * PopupBubbleText component for displaying a pop up bubble with text.
 * Uses a linear gradient background for the bubble border.
 */
export const PopupBubbleText = ({ text, style = {} }: TPopupBubbleTextProps): JSX.Element => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[Colors.primary[600], Colors.secondary[600]]}
        start={{ x: 0.01, y: 0 }}
        end={{ x: 0.99, y: 0 }}
        angle={89.42}
        style={styles.gradientBorder}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    alignSelf: 'flex-start',
  },
  gradientBorder: {
    borderRadius: 80,
    opacity: 1,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  textContainer: {
    backgroundColor: Colors.neutral[900],
    paddingHorizontal: Spacings.md,
    paddingVertical: Spacings.x_sm,
    borderRadius: 80,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    gap: Spacings.x_sm,
  },
  text: {
    color: Colors.neutral[100],
    fontSize: 12,
    fontWeight: '500',
  },
});
