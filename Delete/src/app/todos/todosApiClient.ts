"use server";
import { ErrorResponse, axiosInstance, createErrorResponse } from "@/app/utils/apiClient";
import { revalidatePath } from "next/cache";
import { Category, isCategory } from "@/app/types/Category";
import exp from "constants";
import {isTodoItem, TodoItem} from "@/app/types/TodoItem";


export async function deleteTodoItem(guid: string, deleteTasks: boolean): Promise<ErrorResponse | undefined> {
    try {
        await axiosInstance.delete(`/TodoItems/${guid}`, {params: {deleteTasks}});
        revalidatePath("/todos");
    } catch (e) {
        return createErrorResponse(e);
    }
}

export async function editTodoItem(todoGuid: string): Promise<ErrorResponse | undefined> {
    try {
        await axiosInstance.put(`/TodoItems/${todoGuid}`);
        revalidatePath("/todos");
    } catch (e) {
        return createErrorResponse(e);
    }
}