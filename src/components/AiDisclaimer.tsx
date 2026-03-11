import { View, StyleSheet } from 'react-native';
import { SDKText } from './ui';
import { RDColors, Spacings } from '../assets';
import { useRiaChatBot } from '../context';

interface AiDisclaimerProps {
  showDisclaimer?: boolean;
}

export const AiDisclaimer = ({ showDisclaimer }: AiDisclaimerProps) => {
  const { state } = useRiaChatBot();
  const { previousChatSession, chatMessages } = state;

  if (previousChatSession?.id || !showDisclaimer || chatMessages.length > 2) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SDKText variant="XSmall" weight="Regular" style={styles.disclaimerText}>
        When using RIA, you are agreeing to Rently's{' '}
        <SDKText
          variant="XSmall"
          weight="Regular"
          style={styles.linkText}
        >
          Terms of Use
        </SDKText>
        {' '}and{' '}
        <SDKText
          variant="XSmall"
          weight="Regular"
          style={styles.linkText}
        >
          Privacy Policy
        </SDKText>
        . All conversations are recorded, shared, reviewed, and retained to improve Rently's AI performance.
      </SDKText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.md,
    paddingVertical: Spacings.sm,
  },
  disclaimerText: {
    color: RDColors.neutral[500],
    textAlign: 'center',
  },
  linkText: {
    color: RDColors.tertiary[600],
    textDecorationLine: 'underline',
  },
});
