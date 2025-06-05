import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2e3b4e',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#5d6b82',
        marginTop: 10,
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#4e73df',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
