import {
  getStorageArea,
  getContainerName,
  getContainerTemplate,
  getItemDisplayName,
  getItemTemplate,
  BOX_CAT_HAEMORRHAGE,
  TRAUMA_TOWER,
  BOX_TRAUMA_CHEST_DRAIN,
  AIRWAY_TROLLEY_DRAWER_B,
  STORAGE_AREAS,
} from "./DataDefinitions";

test("getContainerTemplate", () => {
  expect(getContainerTemplate("unknown")).toBeUndefined();
  expect(getContainerTemplate("")).toBeUndefined();

  expect(getContainerTemplate("cat-haemorrhage")).toEqual(BOX_CAT_HAEMORRHAGE);
});

test("getStorageArea", () => {
  expect(getStorageArea("unknown")).toBeUndefined();
  expect(getStorageArea("")).toBeUndefined();

  expect(getStorageArea("trauma-tower")).toEqual(TRAUMA_TOWER);
});

test("getContainerName with replicates", () => {
  expect(getContainerName(BOX_TRAUMA_CHEST_DRAIN, 1)).toEqual(
    "Trauma Chest Drain - Box\u00A01"
  );
});

test("getContainerName without replicates", () => {
  expect(
    getContainerName({ ...AIRWAY_TROLLEY_DRAWER_B, containerTemplateId: "id" })
  ).toEqual("Drawer B - Maintaining Oxygenation & SAD");
});

test("getItemDisplayName", () => {
  expect(
    getItemDisplayName({
      name: "Sterile gloves",
      size: "Small",
      description: "Small sterile gloves - 1 pair",
      location: "Resus store XX",
      photo: "smallsterilegloves.jpg",
    })
  ).toEqual("Sterile gloves (Small)");

  expect(
    getItemDisplayName({
      name: "ChloraPrep applicator",
      description:
        "ChloraPrep applicator for cleaning skin for sterile procedure",
      location: "Resus store XX",
      photo: "chloraprep.jpg",
      quantity: 2,
    })
  ).toEqual("ChloraPrep applicator");

  expect(
    getItemDisplayName({
      name: "Sterile gloves",
      size: "Small",
      quantity: 1,
    })
  ).toEqual("Sterile gloves (Small)");

  expect(
    getItemDisplayName({
      name: "ChloraPrep applicator",
      photo: "chloraprep.jpg",
      quantity: 2,
    })
  ).toEqual("ChloraPrep applicator");
});

describe("getItemTemplate", () => {
  test("success", () => {
    expect(getItemTemplate("trauma-chest-drain", "0")).toEqual({
      name: "Blunt dissection chest drainage insertion pack",
      size: "28Fg",
      description:
        "Pack containing equipment for insertion of trauma chest drain",
      location: "Resus store XX",
      photo: "chestdrain.jpg",
    });

    expect(getItemTemplate("trauma-chest-drain", "4")).toEqual({
      name: "Chest drain catheter",
      size: "28Fr",
      description: "Chest drain catheter - 28Fr",
      location: "Resus store XX",
      photo: "pleuralcatheter.jpg",
    });
  });

  test("unknown containerTemplateId", () => {
    expect(getItemTemplate("unknown", "1")).toBeUndefined();
    expect(getItemTemplate("", "1")).toBeUndefined();
    expect(getItemTemplate(undefined, "1")).toBeUndefined();
  });

  test("unknown itemNumber", () => {
    expect(getItemTemplate("trauma-chest-drain", "-1")).toBeUndefined();
    expect(getItemTemplate("trauma-chest-drain", "15")).toBeUndefined();

    expect(getItemTemplate("trauma-chest-drain", "unknown")).toBeUndefined();
    expect(getItemTemplate("trauma-chest-drain", "")).toBeUndefined();
    expect(getItemTemplate("trauma-chest-drain", undefined)).toBeUndefined();
  });
});

test("STORAGE_AREAS should have unique ids", () => {
  const storageAreaIds = new Set();
  const containerTemplateIds = new Set();

  STORAGE_AREAS.forEach((storageArea) => {
    expect(storageAreaIds).not.toContain(storageArea.storageAreaId);
    storageAreaIds.add(storageArea.storageAreaId);

    storageArea.containers.forEach((containerTemplate) => {
      expect(containerTemplateIds).not.toContain(
        containerTemplate.containerTemplateId
      );
      containerTemplateIds.add(containerTemplate.containerTemplateId);
    });
  });
});
