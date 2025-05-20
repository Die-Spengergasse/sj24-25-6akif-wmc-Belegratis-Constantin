import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalDialog from "../components/ModalDialog";
import { TodoItem } from "../types/TodoItem";
import { createEmptyErrorResponse, ErrorResponse, isErrorResponse } from "../utils/apiClient";
import { editTodoItem } from "./todosApiClient";

type TodoEditProps = {
    todo: TodoItem;
    onCancel: () => void;
    onEdited: () => void;
}

async function handleSubmit(
    todoGuid: string,
    setError: Dispatch<SetStateAction<ErrorResponse>>,
    onEdited: () => void,
) {
    const response = await editTodoItem(todoGuid);
    if (isErrorResponse(response)) {
        setError(response);
    } else {
        onEdited();
    }
}

export default function TodoEdit({todo, onCancel, onEdited}: TodoEditProps) {
    const [error, setError] = useState<ErrorResponse>(createEmptyErrorResponse());

    useEffect(() => {
        if (error.message) {
            alert(error.message);
        }
    }, [error]);

    return (
        <div>
            <ModalDialog
                title={`Edit Todo ${todo.title}`}
                onCancel={onCancel}
                onOk={() => handleSubmit(todo.guid, setError, onEdited)}>

                <p>Möchtest du das Todo "{todo.title}" wirklich bearbeiten?</p>
            </ModalDialog>
        </div>
    );
}