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
                        <Ionicons name="book-outline" color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="(exam)"
                options={{
                    title: 'Prüfung',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="clipboard-outline" color={color} size={size}/>                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home-outline" color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="(examHistory)"
                options={{
                    title: 'History',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="time-outline" color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="(profile)"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="person-outline" color={color} size={size}/>
                    ),
                }}
            />
        </Tabs>
    );
}
