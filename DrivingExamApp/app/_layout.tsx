import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

export default function RootLayout() {
    return (
        <Tabs
            initialRouteName={"index"}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 0.3,
                    borderTopColor: '#ccc',
                },
            }}
        >
            <Tabs.Screen
                name="(modules)"
                options={{
                    title: 'Module',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="book" color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="(exam)"
                options={{
                    title: 'Prüfung',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="checkbox-outline" color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="(profile)"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="checkbox-outline" color={color} size={size}/>
                    ),
                }}
            />
        </Tabs>
    );
}
