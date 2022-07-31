import {
  getStorageArea,
  getContainerName,
  getContainerTemplate,
  getItemDisplayName,
  getItemTemplate,
  BOX_CAT_HAEMORRHAGE,
  TRAUMA_TOWER,
  AIRWAY_TROLLEY_2,
  AIRWAY_TROLLEYS,
  BOX_TRAUMA_CHEST_DRAIN,
  AIRWAY_TROLLEY_DRAWER_B,
  DIRECTORY,
  getStorageAreaGroup,
  getGroupForStorageArea,
} from "./DataDefinitions";
import { StorageAreaGroupTemplate, StorageAreaTemplate } from "./StorageTypes";

test("getContainerTemplate", () => {
  expect(getContainerTemplate("unknown")).toBeUndefined();
  expect(getContainerTemplate("")).toBeUndefined();

  expect(getContainerTemplate("cat-haemorrhage")).toEqual(BOX_CAT_HAEMORRHAGE);
});

test("getStorageArea", () => {
  expect(getStorageArea("unknown")).toBeUndefined();
  expect(getStorageArea("")).toBeUndefined();
  expect(getStorageArea("airway-trolleys")).toBeUndefined();

  expect(getStorageArea("trauma-tower")).toEqual(TRAUMA_TOWER);

  expect(getStorageArea("airway-trolley-2")).toEqual(AIRWAY_TROLLEY_2);
});

test("getStorageAreaGroup", () => {
  expect(getStorageAreaGroup("unknown")).toBeUndefined();
  expect(getStorageAreaGroup("")).toBeUndefined();
  expect(getStorageAreaGroup("trauma-tower")).toBeUndefined();

  expect(getStorageAreaGroup("airway-trolleys")).toEqual(AIRWAY_TROLLEYS);
});

test("getGroupForStorageArea", () => {
  expect(getGroupForStorageArea("unknown")).toBeUndefined();
  expect(getGroupForStorageArea("")).toBeUndefined();
  expect(getGroupForStorageArea("trauma-tower")).toBeUndefined();
  expect(getGroupForStorageArea("airway-trolleys")).toBeUndefined();

  expect(getGroupForStorageArea("airway-trolley-2")).toEqual(AIRWAY_TROLLEYS);
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

test("storage areas and container templates should have unique ids", () => {
  const storageAreaIds = new Set();
  const containerTemplateIds = new Set();

  function checkStorageArea(storageArea: StorageAreaTemplate) {
    expect(storageAreaIds).not.toContain(storageArea.storageAreaId);
    storageAreaIds.add(storageArea.storageAreaId);

    storageArea.containers.forEach((containerTemplate) => {
      expect(containerTemplateIds).not.toContain(
        containerTemplate.containerTemplateId
      );
      containerTemplateIds.add(containerTemplate.containerTemplateId);
    });
  }

  DIRECTORY.forEach((item) => {
    if ((item as any).storageAreaId) {
      checkStorageArea(item as StorageAreaTemplate);
    } else {
      const group = item as StorageAreaGroupTemplate;
      // eslint-disable-next-line jest/no-conditional-expect
      expect(storageAreaIds).not.toContain(group.storageAreaGroupId);
      storageAreaIds.add(group.storageAreaGroupId);

      group.storageAreas.forEach(checkStorageArea);
    }
  });
});
