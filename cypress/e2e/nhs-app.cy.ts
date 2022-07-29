const { format } = require("date-fns");

const DISCLAIMER_TEXT =
  "This application is for demo use only. It is not intended for real life use.";
const DIRECTORY_TITLE = "Directory";
const SUMMARY_TITLE = "Summary";
const TRAUMA_TOWER = "Trauma Tower";
const BOX_TITLE = "Trauma Chest Drain";
const BOX_FOUR_TITLE = "Trauma Chest Drain - Box 4";
const BOX_TWO_TITLE = "Trauma Chest Drain - Box 2";
const LOCAL_HOST_PORT = "http://localhost:3000";
const AIRWAY_TROLLEY_ONE = "Airway Trolley 1";

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
    goToTraumaTower();
    cy.contains(BOX_TITLE);
  });

  it("navigated to summary", () => {
    goToSummary();
  });
});

describe("storage area", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    goToTraumaTower();
  });

  it("select container", () => {
    cy.contains(BOX_TITLE).parent().contains("4").click();
    cy.contains("h1", BOX_FOUR_TITLE);
    cy.contains("Sterile gloves (Small)");
  });

  it("navigated to summary", () => {
    goToSummary();
  });
});

describe("single instance container", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    goToAirwayTrolleyOne();
    cy.contains("Drawer B").click();
    cy.contains("h1", "Drawer B - Maintaining Oxygenation & SAD");
  });

  it("back button returns to storage area", () => {
    cy.get('[aria-label="back"]').click();
    cy.get("h1").should("have.text", AIRWAY_TROLLEY_ONE);
  });

  it("can save items", () => {
    cy.contains("i-gel (3)")
      .parent()
      .find('.controls > [aria-label="add item"]')
      .click();
    cy.contains("Flextube Catheter Mount swivel elbow (Bronchoscopy)")
      .parent()
      .find('.controls > [aria-label="add item"]')
      .click();

    cy.contains("Location").should("not.exist");

    cy.contains("Save").click();

    cy.get("h1").should("have.text", AIRWAY_TROLLEY_ONE);
  });

  it("full button fills container", () => {
    cy.contains("FULL").click();

    cy.get("h1").should("have.text", AIRWAY_TROLLEY_ONE);
  });
});

describe("multiple instance container", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    goToTraumaTower();

    cy.contains(BOX_TITLE).parent().contains("4").click();
    cy.contains("h1", BOX_FOUR_TITLE);
  });

  it("back button returns to storage area", () => {
    cy.get('[aria-label="back"]').click();
    cy.get("h1").should("have.text", TRAUMA_TOWER);
  });

  it("can save items", () => {
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

    cy.getByLabel("Location").should("have.value", "Resus Stock Cupboard");
    cy.getByLabel("Location").select("Resus 1b");

    cy.contains("Save").click();
    cy.get("h1").should("have.text", TRAUMA_TOWER);
  });

  it("full button fills container", () => {
    cy.contains("FULL").click();

    cy.get("h1").should("have.text", TRAUMA_TOWER);
  });
});

describe("summary", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    markAllAreasFull();
  });

  it("empty then populated summary page", () => {
    // Empty summary page
    goToSummary();

    cy.contains("No Items");

    // Populated summary page
    goToDirectory();

    goToTraumaTower();

    cy.contains(BOX_TITLE).parent().contains("4").click();
    cy.contains("h1", BOX_FOUR_TITLE);

    cy.contains("Sterile gloves (Small)");
    cy.contains("Save").click();

    cy.get("h1").should("have.text", TRAUMA_TOWER);

    cy.contains(BOX_TITLE).parent().contains("2").click();

    cy.contains("h1", BOX_TWO_TITLE);
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

    goToSummary();

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

    goToDirectory();
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
        markAllContainersFull(title);
        goToDirectory();
      });
    });
  }

  function markAllContainersFull(storageAreaTitle: string) {
    const containerLinkHrefs: string[] = [];
    cy.get("a[href*='/container']").each((item) => {
      cy.wrap(item)
        .invoke("attr", "href")
        .then((href) => containerLinkHrefs.push(href!));
    });
    cy.wrap(containerLinkHrefs).then(() => {
      containerLinkHrefs.forEach((containerLinkHref) => {
        cy.get(`a[href='${containerLinkHref}']`).click();
        cy.contains("FULL").click();
        cy.get("h1").should("have.text", storageAreaTitle);
      });
    });
  }
});

// Navbar
function goToSummary() {
  cy.get('[aria-label="summary"]').click();
  cy.contains("h1", SUMMARY_TITLE);
}

function goToDirectory() {
  cy.get('[aria-label="directory"]').click();
  cy.contains("h1", DIRECTORY_TITLE);
}

// From directory
function goToTraumaTower() {
  cy.contains(TRAUMA_TOWER).click();
  cy.get("h1").should("have.text", TRAUMA_TOWER);
}

function goToAirwayTrolleyOne() {
  cy.contains(AIRWAY_TROLLEY_ONE).click();
  cy.get("h1").should("have.text", AIRWAY_TROLLEY_ONE);
}
