// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('addTasks', () => {
    cy.get('#add-input').type('This is my first Task!')
    cy.contains('button', 'Add To Do !').click()
    cy.get('.modal-section').should('be.visible')
    cy.get('#priority-2').click()
    cy.get('#add-input').type('This is my 2nd Task!')
    cy.contains('button', 'Add To Do !').click()
    cy.get('.modal-section').should('be.visible')
    cy.get('#priority-3').click()
    cy.get('#add-input').type('This is my 3rd Task!')
    cy.contains('button', 'Add To Do !').click()
    cy.get('.modal-section').should('be.visible')
    cy.get('#priority-1').click()
    cy.get('.to-do-item').should('be.visible')
  });