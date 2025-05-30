import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f2f2f2",
    },
    questionItem: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        elevation: 3, // Android
        shadowColor: "#000", // iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    questionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1f1f1f",
        marginBottom: 12,
    },
    questionDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    questionNumber: {
        fontSize: 13,
        color: "#888",
    },
    questionPoints: {
        fontSize: 13,
        color: "#888",
    },
    questionAnswers: {
        marginTop: 12,
    },
    answerItem: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    answerText: {
        fontSize: 15,
        color: "#1f1f1f",
    },
    nextButton: {
        marginTop: 20,
        alignSelf: "center",
        width: "60%",
    },
    questionImage: {
        width: '100%',
        height: 200,
        marginBottom: 12,
        borderRadius: 8,
    },

});

export default styles;
