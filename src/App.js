import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const FILTER_MAP = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed,
};

function App({ data }) {
    const [tasks, setTasks] = useState(data ? data : []);
    const [filter, setFilter] = useState("All");
    const listHeadingRef = useRef();
    const prevTaskLength = usePrevious(tasks.length);

    // toggle task status
    const toggleTask = (id) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(newTasks);
    };

    // Add new task
    const addTask = (task) => {
        const newTask = {
            id: `todo-` + nanoid(),
            name: task,
            completed: false,
        };
        if (tasks) setTasks([newTask, ...tasks]);
    };

    // Edit task
    const editTask = (id, editedTask) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                task.name = editedTask;
            }
            return task;
        });
        setTasks(newTasks);
    };

    // Delete task
    const deleteTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };

    // Creating the tasks for renderering
    const taskList = tasks
        ?.filter(FILTER_MAP[filter])
        .map((task) => (
            <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    // Filter buttons
    const filterButtons = Object.keys(FILTER_MAP).map((fil) => (
        <FilterButton
            key={fil}
            filter={fil}
            active={filter === fil}
            onClickAction={() => setFilter(fil)}
        />
    ));

    // Tasks counter
    const tasksCounter = tasks ? tasks.filter(FILTER_MAP[filter]).length : 0;

    // Focusing the heading
    useEffect(() => {
        console.log(prevTaskLength, tasks.length);
        console.log(tasks.length - prevTaskLength === -1);
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
        <div className="todoapp stack-large" data-testid="app">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterButtons}
            </div>
            <h2 id="list-heading" ref={listHeadingRef} tabIndex="-1">
                {tasksCounter} {tasksCounter === 1 ? "task" : "tasks"} remaining
            </h2>
            <ul
                className="todo-list stack-large stack-exception"
                data-testid="todoList"
            >
                {taskList}
            </ul>
        </div>
    );
}

export default App;
