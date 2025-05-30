// utils/modules/index.style.ts
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 44;

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: STATUSBAR_HEIGHT + 24, // Mehr Abstand oben
        backgroundColor: '#f9fafb',
    },
    moduleCard: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    description: {
        marginTop: 6,
        fontSize: 14,
        color: '#6b7280',
    },
});
