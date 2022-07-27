const { format } = require("date-fns");

const DISCLAIMER_TEXT =
  "This application is for demo use only. It is not intended for real life use.";
const DIRECTORY_TITLE = "Directory";
const STORAGE_AREA_TITLE = "Trauma Tower 1";
const BOX_TITLE = "Trauma Chest Drain";
const BOX_FOUR_TITLE = "Trauma Chest Drain - Box 4";
const BOX_TWO_TITLE = "Trauma Chest Drain - Box 2";
const LOCAL_HOST_PORT = "http://localhost:3000";

const TEST_USER = Cypress.env("cognito_username");

beforeEach(() => {
  cy.visit(LOCAL_HOST_PORT);
  cy.getByLabel("Username").should("have.value", "").type(TEST_USER);
  cy.getByLabel("Password")
    .should("have.value", "")
    .type(Cypress.env("cognito_password"));
  cy.contains("Log In").click();
  cy.contains(DISCLAIMER_TEXT);
});

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

describe("directory", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    cy.contains("h1", DIRECTORY_TITLE);
  });

  it("select storage area", () => {
    cy.contains(STORAGE_AREA_TITLE).click();

    cy.contains("h1", DIRECTORY_TITLE).should("not.exist");
    cy.contains("h1", STORAGE_AREA_TITLE);
    cy.contains(BOX_TITLE);
  });

  it("navigated to summary", () => {
    cy.get('[aria-label="summary"]').click();
    cy.contains("h1", DIRECTORY_TITLE).should("not.exist");
    cy.contains("h1", "Summary");
  });
});

describe("storage area", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    cy.contains(STORAGE_AREA_TITLE).click();
  });

  it("select box", () => {
    cy.contains(BOX_TITLE).parent().contains("4").click();
    cy.contains(STORAGE_AREA_TITLE).should("not.exist");
    cy.contains(BOX_FOUR_TITLE);
    cy.contains("Sterile gloves (Small)");
  });

  it("navigated to summary", () => {
    cy.get('[aria-label="summary"]').click();
    cy.contains("h1", STORAGE_AREA_TITLE).should("not.exist");
    cy.contains("h1", "Summary");
  });
});

describe("summary", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    cy.contains(STORAGE_AREA_TITLE);
    markAllAreasFull();
  });

  it("empty summary page", () => {
    cy.get('[aria-label="summary"]').click();
    cy.contains(STORAGE_AREA_TITLE).should("not.exist");
    cy.contains("h1", "Summary");

    cy.contains("No Items");
  });

  it("populated summary page", () => {
    markAllAreasFull();

    cy.contains(BOX_FOUR_TITLE).click();
    cy.contains(STORAGE_AREA_TITLE).should("not.exist");
    cy.contains(BOX_FOUR_TITLE);
    cy.contains("Sterile gloves (Small)");
    cy.contains("Save").click();

    cy.contains(BOX_TWO_TITLE).click();
    cy.contains(STORAGE_AREA_TITLE).should("not.exist");
    cy.contains(BOX_TWO_TITLE);
    cy.contains("Sterile gloves (Small)")
      .parent()
      .find('.controls > [aria-label="add item"]')
      .click();
    cy.contains("Sterile gloves (Medium)")
      .parent()
      .find('.controls > [aria-label="add item"]')
      .click();
    cy.contains("Sterile gloves (Large)")
      .parent()
      .find('.controls > [aria-label="add item"]')
      .click();
    cy.contains("Save").click();

    const checkerString = `Checked by ${TEST_USER} on ${format(
      Date.now(),
      "EEE d/M/yyyy 'at' HH:"
    )}`;

    cy.get('[aria-label="summary"]').click();
    cy.contains(STORAGE_AREA_TITLE).should("not.exist");
    cy.contains("h1", "Summary");

    cy.contains(BOX_FOUR_TITLE)
      .parent()
      .parent()
      .within(() => {
        cy.contains(checkerString);
        cy.contains("1 x Sterile gloves (Small)");
        cy.contains("1 x Sterile gloves (Medium)");
        cy.contains("1 x Sterile gloves (Large)");
      });

    cy.contains(BOX_TWO_TITLE)
      .parent()
      .parent()
      .within(() => {
        cy.contains(checkerString);
        cy.contains("1 x Sterile gloves (Small)").should("not.exist");
        cy.contains("1 x Sterile gloves (Medium)").should("not.exist");
        cy.contains("1 x Sterile gloves (Large)").should("not.exist");
      });

    cy.get('[aria-label="directory"]').click();
    cy.contains(STORAGE_AREA_TITLE);
  });

  function markAllAreasFull() {
    const areaTitles: string[] = [];
    cy.get(".single-storage-area").each((item) => {
      areaTitles.push(item.text());
    });
    cy.wrap(areaTitles).then(() => {
      areaTitles.forEach((title) => {
        cy.log("Filling " + title);
        cy.contains(title).click();
        markAllBoxesFull();
        cy.get('[aria-label="directory"]').click();
      });
    });
  }

  function markAllBoxesFull() {
    const boxTitles: string[] = [];
    cy.get(".box").each((item) => {
      boxTitles.push(item.text());
    });
    cy.wrap(boxTitles).then(() => {
      boxTitles.forEach((title) => {
        cy.log("Filling " + title);
        cy.contains(title).click();
        cy.contains(STORAGE_AREA_TITLE).should("not.exist");
        cy.contains(title);
        cy.contains("FULL").click();
      });
    });
  }
});
