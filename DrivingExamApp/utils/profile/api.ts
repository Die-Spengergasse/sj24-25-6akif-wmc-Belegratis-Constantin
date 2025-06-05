import axios from 'axios';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    withCredentials: true,
});

export async function getMe() {
    try {
        const res = await api.get('/oauth/me');
        return res.data;
    } catch (err) {
        console.error('Nicht authentifiziert', err);
        return null;
    }
}
