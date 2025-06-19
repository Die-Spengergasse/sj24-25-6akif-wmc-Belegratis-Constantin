import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/utils/profile/index.style';
import { useAuth } from '@/utils/profile/useAuth';
import AuthWebView from './AuthWebView';

export default function ProfileScreen() {
    const { isAuthenticated, logout, loginSuccess } = useAuth();
    const [showLoginWebView, setShowLoginWebView] = React.useState(false);

    if (showLoginWebView) {
        return <AuthWebView onLoginSuccess={() => {
            setShowLoginWebView(false);
            loginSuccess();
        }} />;
    }

    return (
        <View style={styles.container}>
            {isAuthenticated ? (
                <>
                    <Text style={styles.title}>✅ Du bist angemeldet</Text>
                    <Text style={styles.subtitle}>📝 Deine Prüfungen werden geladen...</Text>
                    <TouchableOpacity style={styles.button} onPress={logout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.title}>🔐 Microsoft Anmeldung</Text>
                    <Text style={styles.subtitle}>Melde dich an, um deine Prüfungen zu sehen</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setShowLoginWebView(true)}>
                        <Text style={styles.buttonText}>Mit Microsoft anmelden</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}
