import {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, Pressable} from 'react-native';
import {useFocusEffect, useRouter} from 'expo-router';
import {getModules} from '@/utils/modules/apiClient';
import {Module} from '@/types/Module';
import styles from '../../utils/modules/index.style';
import {ErrorResponse, isErrorResponse} from '@/utils/apiClient';

export default function ModulesScreen() {
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    async function loadModules() {
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
    }

    useFocusEffect(
        useCallback(() => {
            loadModules();
        }, [])
    );

    if (loading) {
        return <ActivityIndicator style={{marginTop: 50}}/>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={modules}
                keyExtractor={(item) => item.guid}
                renderItem={({item}) => (
                    <Pressable
                        onPress={() =>
                            router.push({
                                pathname: './[moduleId]/topics',
                                params: {moduleId: item.guid},
                            })
                        }
                        style={styles.moduleCard}
                    >
                        <Text style={styles.title}>{item.name}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
}
