// utils/topics/index.style.ts
import { StyleSheet, Platform, StatusBar } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 44;

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: STATUSBAR_HEIGHT,
        paddingHorizontal: 16,
        backgroundColor: '#f9fafb',
    },
    topicItem: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topicTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
});
