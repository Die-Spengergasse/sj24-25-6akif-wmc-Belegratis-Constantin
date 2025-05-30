import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { isErrorResponse } from "@/utils/apiClient";
import { getQuestionsForTopic, checkAnswer } from "@/utils/questions/apiClient";
import { Question } from "@/types/Question";
import {View, Text, TouchableOpacity, Button, Alert, Image, Pressable} from "react-native";
import styles from "@/utils/questions/index.style";
import { Answer } from "@/types/Answer";

type CheckedAnswerMap = Record<string, boolean>;

export default function QuestionsScreen() {
    const { moduleId, topicId } = useLocalSearchParams<{
        moduleId?: string;
        topicId?: string;
    }>();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<CheckedAnswerMap>({});
    const [checkResult, setCheckResult] = useState<Record<string, boolean> | null>(null);

    useEffect(() => {
        const loadQuestions = async () => {
            if (!moduleId || !topicId) {
                console.warn("Missing moduleId or topicId in route params.");
                return;
            }

            const response = await getQuestionsForTopic(topicId, moduleId);
            if (isErrorResponse(response)) {
                console.error("Error fetching questions:", response.message);
                return;
            }
            setQuestions(response);
            setCurrentIndex(0);
            setSelectedAnswers({});
            setCheckResult(null);
        };

        loadQuestions();
    }, [moduleId, topicId]);

    const currentQuestion = questions[currentIndex];

    const handleAnswerToggle = (answerGuid: string) => {
        if (checkResult) return; // nach Prüfung keine Änderungen mehr

        setSelectedAnswers((prev) => ({
            ...prev,
            [answerGuid]: !prev[answerGuid],
        }));
    };

    const submitAnswers = async () => {
        if (!currentQuestion) return;

        if (!Object.values(selectedAnswers).some((v) => v)) {
            Alert.alert("Bitte wählen Sie mindestens eine Antwort aus.");
            return;
        }

        const payload = currentQuestion.answers.map((answer) => ({
            guid: answer.guid,
            isChecked: !!selectedAnswers[answer.guid],
        }));

        const response = await checkAnswer(currentQuestion.guid, payload);

        if (isErrorResponse(response)) {
            Alert.alert("Fehler", "Beim Überprüfen der Antwort ist ein Fehler aufgetreten.");
            return;
        }

        const result = response as Answer;

        setCheckResult(result.checkResult);
    };

    const handleNextQuestion = () => {
        setSelectedAnswers({});
        setCheckResult(null);
        setCurrentIndex((prev) => prev + 1);
    };

    if (!currentQuestion) {
        return (
            <View style={styles.container}>
                <Text style={styles.questionTitle}>Alle Fragen wurden beantwortet!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {currentQuestion.imageUrl ? (
                <Image
                    source={{ uri: currentQuestion.imageUrl }}
                    style={styles.questionImage}
                    resizeMode="contain"
                />
            ) : null}
            <Text style={styles.questionTitle}>{currentQuestion.text}</Text>
            <View style={styles.questionDetails}>
                <Text style={styles.questionNumber}>Frage #{currentQuestion.number}</Text>
                <Text style={styles.questionPoints}>{currentQuestion.points} Punkte</Text>
            </View>

            <View style={styles.questionAnswers}>
                {currentQuestion.answers.map((answer) => {
                    const isSelected = !!selectedAnswers[answer.guid];
                    const isCorrect = checkResult ? !!checkResult[answer.guid] : false;

                    const backgroundColor = (() => {
                        if (!checkResult) {
                            // Vor Prüfung: grau, wenn ausgewählt, sonst hellgrau
                            return isSelected ? "#ccc" : "#eee";
                        }

                        // Nach Prüfung:
                        if (!isCorrect && isSelected) {
                            return "#eb5757";
                        }
                        if (isCorrect && isSelected) {
                            return "#6fcf97";
                        }
                        if (!isCorrect) {
                            return "#f2c94c";
                        }
                    })();


                    return (
                        <TouchableOpacity
                            key={answer.guid}
                            style={[styles.answerItem, { backgroundColor }]}
                            onPress={() => handleAnswerToggle(answer.guid)}
                            disabled={!!checkResult}
                        >
                            <Text style={styles.answerText}>{answer.text}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {!checkResult ? (
                <Pressable onPress={submitAnswers} style={styles.button}>
                <Text style={styles.buttonText}>Zurück zur Modulauswahl</Text>
                </Pressable>
            ) : (
                <Pressable onPress={handleNextQuestion} style={styles.button}>
                    <Text style={styles.buttonText}>Zurück zur Modulauswahl</Text>
                </Pressable>
            )}
        </View>
    );
}
