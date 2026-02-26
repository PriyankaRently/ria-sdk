import { StyleSheet } from 'react-native';
import { Colors, Spacings } from '../tokens';

interface TChatWithUsModalStyles {
    modalContainer: any;
    backgroundContainer: any;
    headingContainer: any;
    contentContainer: any;
    messageArea: any;
    indicatorStyle: any;
    footerContainer: any;
    footerButtonContainer: any;
    sideHeader: any;
    scrollViewContent: any;
    endChatButton: any;
    textInput: any;
    typingText: any;
    accuracyText: any;
}

export const ChatWithUsModalStyles = StyleSheet.create<TChatWithUsModalStyles>({
    modalContainer: {
        flex: 1,
        height: '100%',
    },
    backgroundContainer: {
        backgroundColor: Colors.chatBot[200],
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Spacings.x_sm,
    },
    contentContainer: {
        flex: 1,
        padding: Spacings.big,
        position: 'relative',
    },
    messageArea: {
        flex: 1,
    },
    indicatorStyle: {
        backgroundColor: Colors.neutral[400],
        marginTop: Spacings.xx_sm,
        width: 56
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: Spacings.sm
    },
    footerButtonContainer: {
        backgroundColor: Colors.shades.transparent,
        paddingHorizontal: Spacings.xx_sm,
        flexDirection: 'row',
    },
    sideHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: Spacings.sm
    },
    endChatButton: {
        position: "absolute",
        top: 70,
        right: 60,
        zIndex: 1000,
        borderWidth: 1,
        padding: Spacings.xx_sm,
        borderColor: Colors.neutral[50],
        borderRadius: 14,
        backgroundColor: Colors.shades[0],
    },
    scrollViewContent: {
        paddingBottom: Spacings.md,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        marginRight: Spacings.lg,
        marginLeft: Spacings.xx_sm,
        color: Colors.neutral[800],
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 72,
        minHeight: 30,
    },
    typingText: {
        marginTop: Spacings.sm,
    },
    accuracyText: {
        marginHorizontal: Spacings.x_sm,
        marginTop: Spacings.sm
    }
});