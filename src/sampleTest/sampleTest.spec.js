/// <reference types="cypress" />

import "../cypress/support/commands";

describe("ToDoList Part 2:", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("after clicking check styles needs to be correct!", () => {
    cy.addTask();
    cy.get("button#check-1").click();
    cy.get(".item-text").find("span.checked");
    cy.get(".tooltip").find(".priority-checked");
    cy.get("button.green[disabled='true']");
    cy.get("button.disabled");
  });

  it("checking edit functions while making the text edited!", () => {
    cy.addTask();
    cy.get("button.blue").click();
    cy.get("input#edit-input-1").should("have.value", "This is my first Task!");
    cy.get("button#edit-priority").click();
    cy.get(".modal-section").should("be.visible");
    cy.get("button#priority-3").click();
    cy.get(".tooltiptext").eq(0).should("be.hidden").invoke("show");
    cy.get(".tooltiptext")
      .eq(0)
      .should(($element) => {
        const text = $element.text();
        expect(text).to.include("Low");
      });
    cy.get(".priority-3");
    cy.get("input#edit-input-1").type(" (with my custum edited Value !)");
    cy.get("button#edit-yes").click();
    cy.get("#text-1").should(($element) => {
      const text = $element.text();
      expect(text).to.include("This is my first Task! (with my custum edited Value !)");
    });
    cy.get(".priority-3");
    cy.get(".tooltiptext").eq(0).should("be.hidden").invoke("show");
    cy.get(".tooltiptext")
      .eq(0)
      .should(($element) => {
        const text = $element.text();
        expect(text).to.include("Low");
      });
    cy.get(".blue");
    cy.get(".green");
    cy.get(".red");
  });

  it("check delete functionality.", () => {
    cy.addTasks();
    cy.get("button#delete-1").click();
    cy.get("button#delete-2").click();
    cy.get("#item-1").should("not.exist");
    cy.get("#item-2").should("not.exist");
  });
});
