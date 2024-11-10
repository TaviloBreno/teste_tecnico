// cypress/e2e/login.cy.js
describe("Login Flow", () => {
  it("logs in successfully with valid credentials", () => {
    cy.visit("/login");
    cy.get("#email").type("user@example.com");
    cy.get("#password").type("password123");
    cy.get("form").submit();

    // Verifica se redirecionou para a página de tarefas
    cy.url().should("include", "/tasks");
  });

  it("shows error on invalid login attempt", () => {
    cy.visit("/login");
    cy.get("#email").type("user@example.com");
    cy.get("#password").type("wrongpassword");
    cy.get("form").submit();

    // Verifica se a mensagem de erro foi exibida
    cy.contains("Credenciais inválidas").should("be.visible");
  });
});
