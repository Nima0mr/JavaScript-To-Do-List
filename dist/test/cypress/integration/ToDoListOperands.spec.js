/// <reference types="cypress" />

import "../support/commands";

describe("ToDoList Part 2:", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("checking for text and priority and check btn styles after clicking on check btn!", () => {
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
    cy.get("input#edit-input-1").type(" (with Edited Value !)");
    cy.get("button#edit-yes").click();
    cy.get("#text-1").should(($element) => {
      const text = $element.text();
      expect(text).to.include("This is my first Task! (with Edited Value !)");
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

  it("check if variables are stored correctly in localStorage", () => {
    cy.addTasks();

    cy.window().then((win) => {
      const storedList = JSON.parse(win.localStorage.getItem("list"));
      const expectedList = [
        {
          id: 3,
          text: "This is my 3rd Task!",
          isChecked: false,
          priority: {
            id: 1,
            title: "High",
          },
        },
        {
          id: 1,
          text: "This is my first Task!",
          isChecked: false,
          priority: {
            id: 2,
            title: "Medium",
          },
        },
        {
          id: 2,
          text: "This is my 2nd Task!",
          isChecked: false,
          priority: {
            id: 3,
            title: "Low",
          },
        },
      ];
      expect(storedList).to.deep.equal(expectedList);

      const storedId = JSON.parse(win.localStorage.getItem("id"));
      const expectedId = 4;
      expect(storedId).to.equal(expectedId);
    });
  });
});
