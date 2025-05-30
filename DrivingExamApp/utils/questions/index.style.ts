// utils/questions/index.style.ts
import { StyleSheet, Platform, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 44;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: STATUSBAR_HEIGHT + 24,
        paddingHorizontal: 16,
        backgroundColor: "#f9fafb",
    },
    questionItem: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    questionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 16,
        textAlign: "left",
    },
    questionDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    questionNumber: {
        fontSize: 14,
        color: "#6b7280",
    },
    questionPoints: {
        fontSize: 14,
        color: "#6b7280",
    },
    questionAnswers: {
        marginTop: 8,
    },
    answerItem: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#d1d5db",
    },
    answerText: {
        fontSize: 16,
        color: "#1f2937",
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
    questionImage: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: "#e5e7eb",
    },
});

export default styles;
