import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';
import * as SecureStore from 'expo-secure-store';

const AUTH_URL = 'http://10.91.58.208:5080/oauth/login?redirectUri=https://localhost:5080/profile';
const COOKIE_KEY = 'authCookie';

export default function AuthWebView({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [loading, setLoading] = useState(true);
    const webViewRef = useRef(null);

    const handleNavigationChange = async (navState: any) => {
        const { url } = navState;
        if (url.includes('/profile')) {
            await SecureStore.setItemAsync(COOKIE_KEY, 'true');
            onLoginSuccess();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator size="large" />}
            <WebView
                ref={webViewRef}
                source={{ uri: AUTH_URL }}
                onLoadEnd={() => setLoading(false)}
                onNavigationStateChange={handleNavigationChange}
                javaScriptEnabled
                sharedCookiesEnabled
                thirdPartyCookiesEnabled
                domStorageEnabled
            />
        </View>
    );
}
