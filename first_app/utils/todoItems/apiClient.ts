import { TodoItem } from '@/types/TodoItem';
import { isErrorResponse } from '@/utils/apiClient';

export async function getTodoItems(): Promise<TodoItem[] | { message: string }> {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/TodoItems`);
        if (!response.ok) {
            return { message: 'Failed to fetch Todo Items' };
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching Todo Items:', error);
        return { message: 'An error occurred' };
    }
}