import React from "react";

function Form({ addTask }) {
    const [task, setTask] = React.useState("");

    const handleChanges = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task);
        setTask("");
    };

    return (
        <form>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                data-testid="newTask"
                value={task}
                onChange={handleChanges}
            />
            <button
                type="submit"
                className="btn btn__primary btn__lg"
                onClick={handleSubmit}
                data-testid="addTask"
            >
                Add
            </button>
        </form>
    );
}

export default Form;
