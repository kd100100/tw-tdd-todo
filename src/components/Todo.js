import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function Todo({ id, name, completed, toggleTask, deleteTask, editTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState();
    const editInputRef = useRef();
    const editButtonRef = useRef();
    const wasEditing = usePrevious(isEditing);

    const handleChange = (e) => {
        setEditedTask(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        editTask(id, editedTask);
        setEditedTask("");
    };

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editInputRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [isEditing]);

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={id}>
                    New name for {name}
                </label>
                <input
                    id={id}
                    className="todo-text"
                    type="text"
                    value={editedTask}
                    onChange={handleChange}
                    data-testid={"edit-input-" + id}
                    ref={editInputRef}
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setIsEditing(false)}
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn__primary todo-edit" data-testid={"save-button-" + id}>
                    Save
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <>
            <div className="c-cb">
                <input
                    id="todo-0"
                    type="checkbox"
                    defaultChecked={completed}
                    onClick={toggleTask}
                    data-testid={"toggle-" + id}
                />
                <label className="todo-label" htmlFor="todo-0" data-testid={id}>
                    {name}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setIsEditing(true)}
                    data-testid={"edit-button-" + id}
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">Eat</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => deleteTask(id)}
                    data-testid={"delete-button-" + id}
                >
                    Delete <span className="visually-hidden">Eat</span>
                </button>
            </div>
        </>
    );

    return (
        <li className="todo stack-small">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}

export default Todo;
