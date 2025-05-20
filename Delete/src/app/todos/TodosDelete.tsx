import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalDialog from "../components/ModalDialog";
import { TodoItem } from "../types/TodoItem";
import { createEmptyErrorResponse, ErrorResponse, isErrorResponse } from "../utils/apiClient";
import { deleteTodoItem } from "./todosApiClient";

type TodoDeleteProps = {
    todo: TodoItem;
    onCancel: () => void;
    onDeleted: () => void;
}

async function handleSubmit(
    todoGuid: string,
    setError: Dispatch<SetStateAction<ErrorResponse>>,
    onDeleted: () => void,
    deleteTasks: boolean
) {
    const response = await deleteTodoItem(todoGuid, deleteTasks);
    if (isErrorResponse(response)) {
        setError(response);
    } else {
        onDeleted();
    }
}

export default function TodoDelete({todo, onCancel, onDeleted}: TodoDeleteProps) {
    const [error, setError] = useState<ErrorResponse>(createEmptyErrorResponse());
    const [deleteTasks, setDeleteTasks] = useState<boolean>(false);

    useEffect(() => {
        if (error.message) {
            alert(error.message);
        }
    }, [error]);

    return (
        <div>
            <ModalDialog
                title={`Delete Todo ${todo.title}`}
                onCancel={onCancel}
                onOk={() => handleSubmit(todo.guid, setError, onDeleted, deleteTasks)}>
                <p>Möchtest du das Todo "{todo.title}" wirklich löschen?</p>
                <p>
                    <span>Sollen alle verbundenen Tasks gelöscht werden? </span>
                    <input type={"checkbox"} onChange={() => setDeleteTasks(!deleteTasks)} />
                </p>
            </ModalDialog>
        </div>
    );
}