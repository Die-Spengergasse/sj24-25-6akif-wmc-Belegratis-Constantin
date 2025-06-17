import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from '@/utils/examHistory/index.style';

type ExamResult = {
    earnedPoints: number;
    totalPoints: number;
    date: string;
};

export default function ExamHistoryScreen() {
    const [results, setResults] = useState<ExamResult[]>([]);
    const [loading, setLoading] = useState(true);

    const loadResults = async () => {
        try {
            setLoading(true);
            const storedResults = await AsyncStorage.getItem('examResults');
            if (storedResults) {
                setResults(JSON.parse(storedResults));
            }
        } catch (error) {
            console.error('Fehler beim Laden der Ergebnisse:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadResults();
        }, [])
    );

    if (loading) {
        return <ActivityIndicator style={styles.loading} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Prüfungsergebnisse</Text>
            {results.length > 0 ? (
                <FlatList
                    data={results}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.resultItem}>
                            <Text style={styles.resultText}>Datum: {new Date(item.date).toLocaleDateString()}</Text>
                            <Text style={styles.resultText}>Erreichte Punkte: {item.earnedPoints}</Text>
                            <Text style={styles.resultText}>Gesamtpunkte: {item.totalPoints}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noResults}>Keine Ergebnisse verfügbar</Text>
            )}
        </View>
    );
}