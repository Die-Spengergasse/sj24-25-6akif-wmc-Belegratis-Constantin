import { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable, Alert, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Question } from '@/types/Question';
import { getExamQuestions } from '@/utils/exam/apiClient';
import { checkAnswer } from '@/utils/questions/apiClient';
import { isErrorResponse } from '@/utils/apiClient';
import styles from '../../utils/exam/index.style';

type CheckResult = Record<string, boolean>;

export default function ExamScreen() {
    const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
    const router = useRouter();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, boolean>>({});
    const [checkResult, setCheckResult] = useState<CheckResult | null>(null);
    const [totalPoints, setTotalPoints] = useState(0);
    const [earnedPoints, setEarnedPoints] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (!moduleId) return;

        async function loadQuestions() {
            setLoading(true);
            try {
                const response = await getExamQuestions(moduleId);
                if (isErrorResponse(response)) {
                    console.error('Fehler beim Laden der Fragen:', response.message);
                    Alert.alert('Fehler', 'Fragen konnten nicht geladen werden.');
                    return;
                }
                setQuestions(response);
                setCurrentIndex(0);
                setSelectedAnswers({});
                setCheckResult(null);
                setTotalPoints(0);
                setEarnedPoints(0);
                setFinished(false);
            } catch {
                Alert.alert('Fehler', 'Fragen konnten nicht geladen werden.');
            } finally {
                setLoading(false);
            }
        }

        loadQuestions();
    }, [moduleId]);

    const currentQuestion = questions[currentIndex];

    const toggleAnswer = (guid: string) => {
        if (checkResult) return;
        setSelectedAnswers(prev => ({ ...prev, [guid]: !prev[guid] }));
    };

    const submitAnswer = useCallback(async () => {
        if (!currentQuestion) return;
        if (!Object.values(selectedAnswers).some(Boolean)) {
            Alert.alert('Bitte wählen Sie mindestens eine Antwort aus.');
            return;
        }

        try {
            const payload = currentQuestion.answers.map(a => ({
                guid: a.guid,
                isChecked: !!selectedAnswers[a.guid],
            }));
            const response = await checkAnswer(currentQuestion.guid, payload);
            if (isErrorResponse(response)) {
                Alert.alert('Fehler', 'Beim Überprüfen der Antwort ist ein Fehler aufgetreten.');
                return;
            }

            setCheckResult(response.checkResult);
            setTotalPoints(prev => prev + response.pointsReachable);
            setEarnedPoints(prev => prev + response.pointsReached);
        } catch {
            Alert.alert('Fehler', 'Antwortprüfung fehlgeschlagen.');
        }
    }, [currentQuestion, selectedAnswers]);

    const nextQuestion = () => {
        setSelectedAnswers({});
        setCheckResult(null);
        if (currentIndex + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (loading) return <ActivityIndicator style={styles.loading} />;

    if (!moduleId)
        return (
            <View style={styles.centerContainer}>
                <Text>Kein Modul ausgewählt</Text>
            </View>
        );

    if (finished)
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.finishedTitle}>Prüfung beendet!</Text>
                <Text style={styles.finishedText}>
                    Erreichte Punkte: {earnedPoints} / {totalPoints}
                </Text>
                <Pressable onPress={() => router.back()} style={styles.button}>
                    <Text style={styles.buttonText}>Zurück zur Modulauswahl</Text>
                </Pressable>
            </View>
        );

    if (!currentQuestion)
        return (
            <View style={styles.centerContainer}>
                <Text>Keine Fragen verfügbar</Text>
            </View>
        );

    return (
        <ScrollView style={styles.container}>
            {currentQuestion.imageUrl && (
                <Image source={{ uri: currentQuestion.imageUrl }} style={styles.image} />
            )}

            <Text style={styles.questionTitle}>
                Frage #{currentQuestion.number} ({currentQuestion.points} Punkte)
            </Text>
            <Text style={styles.questionText}>{currentQuestion.text}</Text>

            {currentQuestion.answers.map(answer => {
                const isSelected = !!selectedAnswers[answer.guid];
                const isCorrect = checkResult ? !!checkResult[answer.guid] : false;

                let backgroundColor = '#eee';
                if (!checkResult) {
                    backgroundColor = isSelected ? '#ccc' : '#eee';
                } else {
                    if (!isCorrect && isSelected) backgroundColor = '#eb5757';
                    else if (!isCorrect) backgroundColor = '#f2c94c';
                    else if (isCorrect && isSelected) backgroundColor = '#6fcf97';
                }

                return (
                    <Pressable
                        key={answer.guid}
                        onPress={() => toggleAnswer(answer.guid)}
                        disabled={!!checkResult}
                        style={[styles.answer, { backgroundColor }]}
                    >
                        <Text style={styles.answerText}>{answer.text}</Text>
                    </Pressable>
                );
            })}

            {!checkResult ? (
                <Pressable onPress={submitAnswer} style={styles.button}>
                    <Text style={styles.buttonText}>Antwort prüfen</Text>
                </Pressable>
            ) : (
                <Pressable onPress={nextQuestion} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {currentIndex + 1 === questions.length ? 'Prüfung beenden' : 'Nächste Frage'}
                    </Text>
                </Pressable>
            )}
        </ScrollView>
    );
}
