'use client';

import React, {useReducer, useState} from "react";
import {TodoItem} from "../types/TodoItem";
import {Category} from "../types/Category";
import styles from "./style.module.css";
import ModalDialog from "@/app/components/ModalDialog";
import CategoryEdit from "@/app/categories/CategoryEdit";
import CategoryDelete from "@/app/categories/CategoryDelete";
import TodosDelete from "@/app/todos/TodosDelete";
import TodosEdit from "./TodosEdit"

type Props = {
    todoItems: TodoItem[];
    categories: Category[];
};

type TodoDeleteReducerAction =
    | { type: null; todo: null }
    | { type: "edit" | "delete"; todo: TodoItem };
type TodoDeleteState =
    | { actionType: null; todo: null }
    | { actionType: "edit" | "delete"; todo: TodoItem };

function EditDeleteReducer(
    state: TodoDeleteState,
    action: TodoDeleteReducerAction
): TodoDeleteState {
    switch (action.type) {
        case "edit":
            return {todo: action.todo, actionType: "edit"};
        case "delete":
            return {todo: action.todo, actionType: "delete"};
        default:
            return {todo: null, actionType: null};
    }
}

export default function TodosClient({todoItems, categories}: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedTodo, selectedTodoDispatch] = useReducer(EditDeleteReducer, {todo: null, actionType: null});

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const filteredTodoItems = selectedCategory
        ? todoItems.filter(item => item.categoryName === selectedCategory)
        : todoItems;

    return (
        <div className={styles.categories}>
            <h1>Todo Liste</h1>
            <select onChange={handleCategoryChange}>
                <option value="">Alle Kategorien</option>
                {categories.map(category => (
                    <option key={category.guid} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            <ul>
                {filteredTodoItems.map(item => (
                    <li
                        key={item.guid}
                        className={
                            new Date(item.dueDate) < new Date() ? styles.overdue : styles.onTime
                        }
                    >
                        <div className={styles.categoryHeader}>
                            <h2>{item.title}</h2>
                            <div className={styles.rowDiv}>
                                <span
                                    className={styles.editIcon}
                                    title="Edit"
                                    onClick={() => selectedTodoDispatch({type: "edit", todo: item})}
                                >
                                    ✏️
                                </span>
                                <span
                                    className={styles.deleteIcon}
                                    title="Delete"
                                    onClick={() => selectedTodoDispatch({type: "delete", todo: item})}
                                >
                                    🗑️
                                </span>
                            </div>
                        </div>
                        <p>{item.description}</p>
                        <p>Kategorie: {item.categoryName} (GUID {item.categoryGuid})</p>
                        <p>Fällig am: {new Date(item.dueDate).toLocaleDateString()}</p>
                        <p>Status: {item.isCompleted ? "Abgeschlossen" : "Ausstehend"}</p>
                    </li>
                ))}
            </ul>

            {selectedTodo.actionType == "delete" && (
                <TodosDelete todo={selectedTodo.todo}
                             onCancel={() => selectedTodoDispatch({type: null, todo: null})}
                             onDeleted={() => selectedTodoDispatch({type: null, todo: null})}/>
            )}

            {selectedTodo.actionType == "edit" && (
                <TodosEdit todo={selectedTodo.todo}
                             onCancel={() => selectedTodoDispatch({type: null, todo: null})}
                             onEdited={() => selectedTodoDispatch({type: null, todo: null})}/>
            )}
        </div>
    );
}
