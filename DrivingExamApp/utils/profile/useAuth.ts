import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const token = await SecureStore.getItemAsync('authCookie');
            setIsAuthenticated(!!token);
        };
        checkLogin();
    }, []);

    const logout = async () => {
        await SecureStore.deleteItemAsync('authCookie');
        setIsAuthenticated(false);
    };

    return { isAuthenticated, logout, loginSuccess: () => setIsAuthenticated(true) };
}
