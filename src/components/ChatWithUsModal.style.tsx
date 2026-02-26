import { StyleSheet, Platform } from 'react-native';
import { Colors, Spacings } from '../tokens';

export const ChatWithUsModalStyles = StyleSheet.create({
    indicatorStyle: {
        backgroundColor: Colors.neutral[400],
        width: 32,
        height: 4,
    },
    backgroundContainer: {
        backgroundColor: Colors.neutral[100], // Approximate chat-bot[100]
    },
    modalContainer: {
        flex: 1,
        paddingHorizontal: Spacings.md,
        paddingTop: Platform.OS === "ios" ? Spacings.sm : Spacings.md,
    },
    contentContainer: {
        flex: 1,
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacings.sm,
    },
    sideHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacings.sm,
    },
    endChatButton: {
        position: 'absolute',
        top: 50,
        right: Spacings.md,
        zIndex: 1,
    },
    messageArea: {
        flex: 1,
        marginBottom: Spacings.sm,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    footerContainer: {
        gap: Spacings.sm,
        alignItems: 'center',
    },
    footerButtonContainer: {
        width: '100%',
    },
    accuracyText: {
        textAlign: 'center',
        color: Colors.neutral[500],
        marginTop: Spacings.x_sm,
    },
});