import { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { getModules } from '@/utils/modules/apiClient';
import { Module } from '@/types/Module';
import styles from '../../utils/modules/index.style';
import { isErrorResponse } from '@/utils/apiClient';

export default function ModulesScreen() {
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const loadModules = async () => {
        setLoading(true);
        try {
            const response = await getModules();
            if (isErrorResponse(response)) {
                console.error('Error fetching modules:', response.message);
                return;
            }
            setModules(response);
        } catch (error) {
            console.error('Error fetching modules:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => {
        loadModules();
    }, []));

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 60 }} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={modules}
                keyExtractor={(item) => item.guid}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() =>
                            router.push({
                                pathname: './exam',
                                params: { moduleId: item.guid },
                            })
                        }
                        style={({ pressed }) => [
                            styles.moduleCard,
                            pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
                        ]}
                    >
                        <Text style={styles.title}>{item.name}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
}
