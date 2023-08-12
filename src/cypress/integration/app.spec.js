/// <reference types="cypress" />

import '../support/commands'

describe('Tests:', () => {
    beforeEach(() => {
        cy.visit('index.html')
    })

    it('AddToDo btn should give an alert if empty!', () => {
        cy.contains('button', 'Add To Do !').click();
        cy.get('#modal').should('not.be.visible')
        cy.get('#add-input').type('   ')
        cy.contains('button', 'Add To Do !').click();
        cy.get('#modal').should('not.be.visible')
      });

    it('should add a ask for priority after clicking addToDo btn!' , () => {
        cy.get('#add-input').type('This is my first Task!')
        cy.contains('button', 'Add To Do !').click()
        cy.get('.modal-section').should('be.visible')
    })

    it('should add tasks to the task list after asking for priority!', () => {
        cy.addTasks()
    })

    it('priority element should be visible in each task and it should contain the tooltip mentioned', () => {
        cy.addTasks()
        cy.get('.tooltip').eq(0).should('be.visible')
        cy.get('.tooltiptext').eq(0).should('be.hidden').invoke('show')
        cy.get('.tooltiptext').eq(0).should(($element) => {
            const text = $element.text();
            const High = 'High';
            const Medium = 'Medium';
            expect(text).to.include(High) || expect(text).to.include(Medium);
          });
    })

    it('should sort the tasks depends on priority from High to Low', () => {
        cy.addTasks()
        cy.get('.to-do-item').eq(0).contains('This is my 3rd Task!')
        cy.get('.to-do-item').eq(1).contains('This is my first Task!')
        cy.get('.to-do-item').eq(2).contains('This is my 2nd Task!')

    })
})