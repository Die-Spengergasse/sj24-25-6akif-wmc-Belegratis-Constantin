import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: true, title: 'Kategorien' }}>
            <Stack.Screen name="topics" />
        </Stack>
    );
}
