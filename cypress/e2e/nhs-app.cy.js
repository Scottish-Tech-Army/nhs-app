/// <reference types="cypress" />

const DISCLAIMER_TEXT =
  "This application is for demo use only. It is not intended for real life use.";
const STORAGE_AREA_TITLE = "Trauma Tower";
const BOX_FOUR_TITLE = "Trauma Chest Drain - Box 4";
const   LOCAL_HOST_PORT =  "http://localhost:3000"
    
describe("disclaimer pop-up", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains(DISCLAIMER_TEXT);
  });

  it("clicking accept button disengages disclaimer", () => {
    cy.contains("Accept").click();
    cy.contains(DISCLAIMER_TEXT).should("not.exist");
  });

  it("clicking anywhere on gray screen does nothing", () => {
    cy.root().click(100, 100);
    cy.contains(DISCLAIMER_TEXT);
  });
});

describe("storage area", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    cy.contains(STORAGE_AREA_TITLE);
  });

  it("select box", () => {
    cy.contains(BOX_FOUR_TITLE)
      .parent()
      .find(".check-box")
      .click();
    cy.contains(STORAGE_AREA_TITLE).should("not.exist");
    cy.contains(BOX_FOUR_TITLE);
    cy.contains("Sterile gloves (Small)");
  });

  it("navigated to items needed", () => {
    cy.contains("Items needed").click();
    cy.contains(STORAGE_AREA_TITLE).should("not.exist");
    cy.contains("Items to replace");
  });

  it("reset boxes", () => {
    fillBoxFour();
    resetButton().click();
    cy.contains("YES").click();
    cy.contains("Items needed").click();
    cy.contains(BOX_FOUR_TITLE);
  });

  it("cancel reset boxes", () => {
    fillBoxFour()
    resetButton().click();
    cy.contains("Cancel").click();
    cy.contains("Items needed").click();
    cy.contains(BOX_FOUR_TITLE).should("not.exist");
  });

  it("clicking anywhere on gray screen does nothing", () => {
    resetButton().click();
    cy.contains("Reset");
    cy.root().click(100, 100);
    cy.contains("Reset");
  });

  function fillBoxFour() {
    cy.contains(BOX_FOUR_TITLE)
        .parent()
        .find(".check-box")
        .click();
      cy.contains("FULL").click();
      cy.contains("Items needed").click();
      cy.contains(BOX_FOUR_TITLE).should("not.exist");
      cy.get('[aria-label="Back"]').click()
  }
  
  function resetButton() {
    return cy.get('[aria-label="restart"]');
  }
});


