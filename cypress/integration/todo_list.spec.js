describe("test todo list", () => {
    it("should render the todo list", () => {
        cy.visit("http://localhost:3001");

        // Toggle task status
        cy.get('[data-testid="toggle-todo-1"]').click();
        cy.get('[data-testid="toggle-todo-1"]').should("have.value", "on");

        // Add new task
        cy.get('[data-testid="newTask"]').type("Code");
        cy.get('[data-testid="addTask"]').click();
        cy.get('[data-testid="newTask"]').should("have.value", "");
        cy.contains("Code");

        // Edit task
        cy.get('[data-testid="edit-button-todo-0"]').click();
        cy.get('[data-testid="edit-input-todo-0"]').type("Work");
        cy.get('[data-testid="save-button-todo-0"]').click();
        cy.contains("Work");

        // Delete task
        cy.get('[data-testid="delete-button-todo-1"]').click();
        cy.contains("Sleep").should("not.exist");

        // Filter tasks
        cy.get('[data-testid="filter-Active"]').click();
        cy.contains("2 tasks remaining");
        cy.get('[data-testid="filter-Completed"]').click();
        cy.contains("1 task remaining");
        cy.get('[data-testid="filter-All"]').click();
        cy.contains("3 tasks remaining");
    });
});
