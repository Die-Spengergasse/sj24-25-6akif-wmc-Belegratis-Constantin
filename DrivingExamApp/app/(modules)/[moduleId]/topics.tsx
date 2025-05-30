import {router, useLocalSearchParams} from 'expo-router';
import {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Pressable} from 'react-native';
import {getTopicsForModule} from '@/utils/topics/apiClient';
import {Topic} from '@/types/Topic';
import styles from '@/utils/topics/index.style';
import {isErrorResponse} from '@/utils/apiClient';

export default function TopicsScreen() {
    const {moduleId} = useLocalSearchParams();
    const [topics, setTopics] = useState<Topic[]>([]);

    const loadTopics = useCallback(async () => {
        console.log('Loading topics for moduleId:', moduleId);

        const response = await getTopicsForModule(moduleId.toString());
        if (isErrorResponse(response)) {
            console.error('Error fetching topics:', response.message);
            return;
        }
        setTopics(response);
    }, [moduleId]);

    useEffect(() => {
        loadTopics();
    }, [loadTopics]);

    return (
        <View style={styles.container}>
            <FlatList
                data={topics}
                keyExtractor={(item) => item.guid}
                renderItem={({item}) => (
                    <Pressable
                        onPress={() =>
                            router.push({
                            pathname: './[topicId]/questions',
                            params: {topicId: item.guid}
                            })
                        }
                        style={styles.topicItem}
                    >
                        <Text style={styles.topicTitle}>{item.name}</Text>
                        <Text>{item.questionCount}</Text>
                    </Pressable>

                )}
            />
        </View>
    );
}
