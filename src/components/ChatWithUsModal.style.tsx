import { StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

interface TChatWithUsModalStyles {
    overlay: ViewStyle;
    modal: ViewStyle;
    header: ViewStyle;
    title: TextStyle;
    closeButton: ViewStyle;
    closeText: TextStyle;
    content: ViewStyle;
    [key: string]: ViewStyle | TextStyle;
}

export const styles = StyleSheet.create<TChatWithUsModalStyles>({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    closeButton: {
        padding: 5,
    },
    closeText: {
        fontSize: 18,
        color: '#007AFF',
    },
    content: {
        flex: 1,
    },
});