import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveExamResult = async (earnedPoints: number, totalPoints: number) => {
    try {
        const newResult = { earnedPoints, totalPoints, date: new Date().toISOString() };

        // Bestehendes Array abrufen
        const existingResults = await AsyncStorage.getItem('examResults');
        const resultsArray = existingResults ? JSON.parse(existingResults) : [];

        // Neues Ergebnis hinzufügen
        resultsArray.push(newResult);

        // Aktualisiertes Array speichern
        await AsyncStorage.setItem('examResults', JSON.stringify(resultsArray));
    } catch (error) {
        console.error('Fehler beim Speichern der Prüfungsergebnisse:', error);
    }
};