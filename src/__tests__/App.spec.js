import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import Todo from "../components/Todo";

describe("Rendering App", () => {
    it("renders without crashing", () => {
        const { getByTestId } = render(<App />);
        const app = getByTestId("app");
        expect(app).toBeDefined();
    });
});

describe("todo functionalities", () => {
    // toggle task status
    it("should toggle task status", () => {
        const mockToggleTask = jest.fn().mockName("toggleTask");
        const { getByTestId } = render(
            <Todo
                id="todo-1"
                name="Sleep"
                completed={false}
                toggleTask={mockToggleTask}
            />
        );
        fireEvent.click(getByTestId("toggle-todo-1"));
        expect(mockToggleTask).toHaveBeenCalled();
    });

    // add todo
    it("adds new task", () => {
        const { getByTestId } = render(<App />);
        userEvent.type(getByTestId("newTask"), "Code");
        fireEvent.click(getByTestId("addTask"));
        expect(getByTestId("newTask").value).toEqual("");
    });

    // edit todo
    it("edits task", () => {
        const mockEditTask = jest.fn().mockName("editTask");
        const { getByTestId } = render(
            <Todo
                id="todo-1"
                name="Sleep"
                completed={false}
                editTask={mockEditTask}
            />
        );
        fireEvent.click(getByTestId("edit-button-todo-1"));
        userEvent.type(getByTestId("edit-input-todo-1"), "Work");
        fireEvent.click(getByTestId("save-button-todo-1"));
        expect(mockEditTask).toHaveBeenCalled();
    });

    // delete todo
    it("deletes task", () => {
        const mockDelete = jest.fn().mockName("mockDelete");
        const todoRender = render(
            <Todo
                id="todo-1"
                name="Sleep"
                completed={false}
                deleteTask={mockDelete}
            />
        );
        fireEvent.click(todoRender.getByTestId("delete-button-todo-1"));
        expect(mockDelete).toHaveBeenCalled();
    });
});