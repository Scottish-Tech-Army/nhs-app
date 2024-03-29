const DISCLAIMER_TEXT =
  "This application is for demo use only. It is not intended for real life use.";
const DIRECTORY_TITLE = "Directory";
const SUMMARY_TITLE = "Missing Items";
const TRAUMA_TOWER = "Trauma Tower";
const TRAUMA_TOWER_BOX_TITLE = "Trauma Chest Drain";
const TRAUMA_TOWER_BOX_FOUR_TITLE = "Trauma Chest Drain - Box 4";
const TRAUMA_TOWER_BOX_TWO_TITLE = "Trauma Chest Drain - Box 2";
const LOCAL_HOST_PORT = "http://localhost:3000";
const AIRWAY_TROLLEYS = "Airway Trolleys";
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
    cy.contains(TRAUMA_TOWER_BOX_TITLE);
  });

  it("select storage area group", () => {
    goToAirwayTrolleys();
    cy.contains(AIRWAY_TROLLEY_ONE);
  });

  it("navigated to missing-items", () => {
    goToMissingItems();
  });
});

describe("storage area group", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    cy.contains("h1", DIRECTORY_TITLE);
    goToAirwayTrolleys();
  });

  it("select storage area", () => {
    goToAirwayTrolleyOne();
  });

  it("navigated to missing-items", () => {
    goToMissingItems();
  });

  it("back button returns to directory", () => {
    clickBackButton();
    cy.get("h1").should("have.text", DIRECTORY_TITLE);
  });
});

describe("storage area from directory", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    goToTraumaTower();
  });

  it("select container", () => {
    cy.contains(TRAUMA_TOWER_BOX_TITLE).parent().contains("4").click();
    cy.contains("h1", TRAUMA_TOWER_BOX_FOUR_TITLE);
    cy.contains("Sterile gloves (Small)");
  });

  it("navigated to missing-items", () => {
    goToMissingItems();
  });

  it("back button returns to directory", () => {
    clickBackButton();
    cy.get("h1").should("have.text", DIRECTORY_TITLE);
  });
});

describe("storage area from storage area group", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    goToAirwayTrolleys();
    goToAirwayTrolleyOne();
  });

  it("select container", () => {
    cy.contains("Drawer B").click();
    cy.contains("h1", "Drawer B - Maintaining Oxygenation & SAD");
  });

  it("navigated to missing-items", () => {
    goToMissingItems();
  });

  it("back button returns to storage area group", () => {
    clickBackButton();
    cy.get("h1").should("have.text", AIRWAY_TROLLEYS);
  });
});

describe("single instance container", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    goToAirwayTrolleys();
    goToAirwayTrolleyOne();
    cy.contains("Drawer B").click();
    cy.contains("h1", "Drawer B - Maintaining Oxygenation & SAD");
  });

  it("back button returns to storage area", () => {
    clickBackButton();
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

    cy.contains(TRAUMA_TOWER_BOX_TITLE).parent().contains("4").click();
    cy.contains("h1", TRAUMA_TOWER_BOX_FOUR_TITLE);
  });

  it("back button returns to storage area", () => {
    clickBackButton();
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

    cy.getByLabel("Location")
      .find("option:selected")
      .should("have.text", "Choose a location");
    cy.getByLabel("Location").select("Resus 1b");

    cy.contains("Save").click();
    cy.get("h1").should("have.text", TRAUMA_TOWER);
  });

  it("full button fills container", () => {
    cy.contains("FULL").click();

    cy.get("h1").should("have.text", TRAUMA_TOWER);
  });
});

describe("missing-items", () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_PORT);
    cy.contains("Accept").click();
    markEverythingFull();
  });

  it("empty then populated missing-items page", () => {
    // Empty missing-items page
    goToMissingItems();

    cy.contains("No Items");

    // Populated missing-items page
    goToDirectory();

    goToTraumaTower();

    cy.contains(TRAUMA_TOWER_BOX_TITLE).parent().contains("4").click();
    cy.contains("h1", TRAUMA_TOWER_BOX_FOUR_TITLE);

    cy.contains("Sterile gloves (Small)");

    cy.getByLabel("Location")
      .find("option:selected")
      .should("have.text", "Choose a location");
    cy.getByLabel("Location").select("Resus 1a");

    cy.contains("Save").click();

    cy.get("h1").should("have.text", TRAUMA_TOWER);

    cy.contains(TRAUMA_TOWER_BOX_TITLE).parent().contains("2").click();

    cy.contains("h1", TRAUMA_TOWER_BOX_TWO_TITLE);
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

    cy.getByLabel("Location")
      .find("option:selected")
      .should("have.text", "Choose a location");
    cy.getByLabel("Location").select("Resus 1b");

    cy.contains("Save").click();

    const checkerRegex = new RegExp(
      `Checked: \\w{3} \\d{1,2}\\/\\d{1,2}\\/\\d{4} \\d{2}:\\d{2} by ${TEST_USER}`
    );

    goToMissingItems();

    cy.contains(TRAUMA_TOWER_BOX_FOUR_TITLE)
      .parent()
      .parent()
      .within(() => {
        cy.contains(checkerRegex);
        cy.contains("1 x Sterile gloves (Small)");
        cy.contains("1 x Sterile gloves (Medium)");
        cy.contains("1 x Sterile gloves (Large)");
      });

    cy.contains(TRAUMA_TOWER_BOX_TWO_TITLE)
      .parent()
      .parent()
      .within(() => {
        cy.contains(checkerRegex);
        cy.contains("1 x Sterile gloves (Small)").should("not.exist");
        cy.contains("1 x Sterile gloves (Medium)").should("not.exist");
        cy.contains("1 x Sterile gloves (Large)").should("not.exist");
      });

    goToDirectory();
  });

  function markEverythingFull() {
    const areaLinkHrefs: string[] = [];
    cy.get("a[href*='/area/']").each((item) => {
      cy.wrap(item)
        .invoke("attr", "href")
        .then((href) => areaLinkHrefs.push(href!));
    });

    const areaGroupLinkHrefs: string[] = [];
    cy.get("a[href*='/areas/']").each((item) => {
      cy.wrap(item)
        .invoke("attr", "href")
        .then((href) => areaGroupLinkHrefs.push(href!));
    });

    cy.wrap(areaLinkHrefs).then(() => {
      areaLinkHrefs.forEach((areaLinkHref) => {
        cy.get(`a[href='${areaLinkHref}']`).then(($link) => {
          const title = $link.text();
          cy.log(`Area title: ${title}`);
          cy.wrap($link).click();
          markAllContainersFull(title);
        });
        goToDirectory();
      });
    });

    cy.wrap(areaGroupLinkHrefs).then(() => {
      areaGroupLinkHrefs.forEach((areaLinkHref) => {
        cy.get(`a[href='${areaLinkHref}']`).then(($link) => {
          const title = $link.text();
          cy.log(`Group Area title: ${title}`);
          cy.wrap($link).click();
          cy.contains("h1", title);
          markAllGroupAreasFull(title);
        });
        goToDirectory();
      });
    });
  }

  function markAllGroupAreasFull(groupAreaTitle: string) {
    const areaTitles: string[] = [];
    cy.get(".single-storage-area").each((item) => {
      areaTitles.push(item.text());
    });
    cy.wrap(areaTitles).then(() => {
      areaTitles.forEach((title) => {
        cy.log("Filling " + title);
        cy.contains(title).click();
        markAllContainersFull(title);
        clickBackButton();
        cy.contains("h1", groupAreaTitle);
      });
    });
  }

  function markAllContainersFull(storageAreaTitle: string) {
    cy.log(storageAreaTitle);
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
function goToMissingItems() {
  cy.get('[aria-label="missing-items"]').click();
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

function goToAirwayTrolleys() {
  cy.contains(AIRWAY_TROLLEYS).click();
  cy.get("h1").should("have.text", AIRWAY_TROLLEYS);
}

// From storage area group
function goToAirwayTrolleyOne() {
  cy.contains(AIRWAY_TROLLEY_ONE).click();
  cy.get("h1").should("have.text", AIRWAY_TROLLEY_ONE);
}

// General
function clickBackButton() {
  cy.get('[aria-label="back"]').click();
}
