import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Picker, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTodoItems } from '@/utils/todoItems/apiClient';
import { TodoItem } from '@/types/TodoItem';


export default function TodoItemsIndexScreen() {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    async function loadTodoItems() {
        console.log('Loading Todo Items...');
        const response = await getTodoItems();
        if ('message' in response) {
            console.error('Error fetching Todo Items:', response.message);
            return;
        }
        setTodoItems(response);
    }

    useFocusEffect(
        useCallback(() => {
            loadTodoItems();
        }, [])
    );

    const filteredTodoItems = selectedCategory !== ""
            ? todoItems.filter((item) => item.categoryGuid === selectedCategory)
            : todoItems;

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
                style={styles.picker}
            >
                <Picker.Item label="All Categories" value="" />
                {[...new Set(todoItems.map((item) => item.categoryGuid))].map((categoryGuid) => {
                    const categoryName = todoItems.find((item) => item.categoryGuid === categoryGuid)?.categoryName;
                    return <Picker.Item key={categoryGuid} label={categoryName || ''} value={categoryGuid} />;
                })}
            </Picker>
            <FlatList
                data={filteredTodoItems}
                keyExtractor={(item) => item.guid}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    picker: {
        marginBottom: 16,
    },
    card: {
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});