import { type JSX } from "react";
import { Linking, View, StyleSheet, Text } from "react-native"
import type { TextStyle, ViewStyle } from 'react-native';

interface AiDisclaimerProps {
    showDisclaimer?: boolean;
    previousChatSession?: { id?: string | null };
    chatMessages?: any[];
}

export const AiDisclaimer = ({ showDisclaimer = true, previousChatSession = { id: null }, chatMessages = [] }: AiDisclaimerProps): JSX.Element | null => {
    if (previousChatSession?.id || !showDisclaimer || chatMessages.length > 2) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.disclaimerText}>
                When using RIA, you are agreeing to Rently’s{' '}
                <Text
                    style={styles.linkText}
                    onPress={() => Linking.openURL("https://use.rently.com/terms-of-use")}
                >
                    Terms of Use
                </Text>
                {' '}and{' '}
                <Text
                    style={styles.linkText}
                    onPress={() => Linking.openURL("https://use.rently.com/privacy-policy")}
                >
                    Privacy Policy
                </Text>
                . All conversations are recorded, shared, reviewed, and retained to improve Rently's AI performance.
            </Text>
        </View>
    )
}

interface TAiDisclaimerStyles {
    container: ViewStyle;
    disclaimerText: TextStyle;
    linkText: TextStyle;
    [key: string]: ViewStyle | TextStyle;
}

const styles = StyleSheet.create<TAiDisclaimerStyles>({
    container: {
        marginHorizontal: 4,
        marginTop: 8,
    },
    disclaimerText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#6B7280',
    },
    linkText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#7C3AED',
    },
})