import { type JSX } from "react";
import { View, StyleSheet, Text } from "react-native"
import { Colors, Spacings } from '../tokens';

interface TChatbotBadgeProps {
    timeExceeded: boolean;
}

export const LiveAgentHandoffBadge = ({ timeExceeded }: TChatbotBadgeProps): JSX.Element => {
    const message = timeExceeded
        ? "Due to higher than usual wait times, the next available representative will contact you directly from the following number: 1 (888) 340-6340"
        : "Hang tight! We're connecting you to someone now—this may take up to 5 minutes.";
    return (
        <View style={styles.badge}>
            <Text style={styles.text}>
                {message}
            </Text>
        </View>
    )
}

export const NoNetworkBadge = (): JSX.Element => {
    return (
        <View style={styles.badge}>
            <Text style={styles.text}>
                No network connection available.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 8,
        padding: Spacings.sm,
        marginVertical: Spacings.xx_sm,
    },
    text: {
        fontSize: 14,
        color: Colors.white,
    },
});