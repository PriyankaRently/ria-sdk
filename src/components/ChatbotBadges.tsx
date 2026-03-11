
import { View, type ViewStyle, StyleSheet, Image } from 'react-native';
import { SDKText } from './ui';
import { RDColors, Spacings } from '../assets';

interface LiveAgentHandoffBadgeProps {
  timeExceeded?: boolean;
  style?: ViewStyle;
}

export const LiveAgentHandoffBadge = ({ timeExceeded: _timeExceeded, style }: LiveAgentHandoffBadgeProps) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../assets/icons/rentlyChatIcon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <SDKText variant="Small" weight="Medium">
        Connecting to a live agent...
      </SDKText>
    </View>
  );
};

interface NoNetworkBadgeProps {
  style?: ViewStyle;
}

export const NoNetworkBadge = ({ style }: NoNetworkBadgeProps) => {
  return (
    <View style={[styles.container, styles.errorContainer, style]}>
      <SDKText variant="Small" weight="Medium" color={RDColors.neutral[700]}>
        No Internet Connection
      </SDKText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacings.md,
    paddingVertical: Spacings.sm,
    backgroundColor: RDColors['background-overlays'][600],
    borderRadius: 20,
    gap: Spacings.x_sm,
  },
  errorContainer: {
    backgroundColor: RDColors.neutral[100],
  },
  icon: {
    width: 24,
    height: 24,
  },
});
