import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import WebView from 'react-native-webview';
import * as SecureStore from 'expo-secure-store';

const AUTH_URL = 'http://192.168.56.1:5080/oauth/login?redirectUri=https://localhost:5080/profile';
const COOKIE_KEY = 'authCookie';

export default function AuthWebView({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [loading, setLoading] = useState(true);
    const [showWebView, setShowWebView] = useState(false);
    const webViewRef = useRef(null);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                console.log('Initialisiere Authentifizierung...');
                await SecureStore.deleteItemAsync(COOKIE_KEY);

                const cookie = await SecureStore.getItemAsync(COOKIE_KEY);
                console.log('Cookie gefunden:', cookie);

                if (!cookie) {
                    console.log('Kein Cookie vorhanden, WebView wird angezeigt.');
                    setShowWebView(true);
                } else {
                    console.log('Cookie vorhanden, WebView wird übersprungen.');
                }
            } catch (error) {
                console.error('Fehler bei der Initialisierung:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const handleNavigationChange = async (navState: any) => {
        const { url } = navState;
        console.log('Navigationsänderung:', url);

        if (url.includes('/profile')) {
            try {
                await SecureStore.setItemAsync(COOKIE_KEY, 'true');
                console.log('Cookie gespeichert.');
                onLoginSuccess();
            } catch (error) {
                console.error('Fehler beim Speichern des Cookies:', error);
            }
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text>Wird geladen...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {showWebView ? (
                <WebView
                    ref={webViewRef}
                    source={{ uri: AUTH_URL }}
                    onLoadEnd={() => console.log('WebView geladen.')}
                    onNavigationStateChange={handleNavigationChange}
                    javaScriptEnabled
                    sharedCookiesEnabled
                    thirdPartyCookiesEnabled
                    domStorageEnabled
                />
            ) : (
                <Text>Keine WebView verfügbar. Überprüfe die Cookie-Logik.</Text>
            )}
        </View>
    );
}