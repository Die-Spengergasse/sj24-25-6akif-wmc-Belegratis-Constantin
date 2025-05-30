// app/exam/index.style.ts
import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loading: {
        marginTop: 50,
    },
    image: {
        width: '100%',
        height: width * 0.5,
        marginBottom: 12,
        borderRadius: 8,
        resizeMode: 'contain',
    },
    questionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2e3b4e',
    },
    questionText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#4a5568',
    },
    answer: {
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
    },
    answerText: {
        fontSize: 16,
    },
    button: {
        padding: 15,
        backgroundColor: '#2196F3',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    finishedTitle: {
        fontSize: 24,
        marginBottom: 10,
        color: '#2e3b4e',
        fontWeight: 'bold',
    },
    finishedText: {
        fontSize: 18,
        marginBottom: 5,
        color: '#4a5568',
    },
});

export default styles;
