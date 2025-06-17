import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    resultItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    resultText: {
        fontSize: 16,
        color: '#333',
    },
    noResults: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
        marginTop: 50,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});