import {
  getBoxName,
  getBoxTemplate,
  getItemDisplayName,
  getItemTemplate,
  TRAUMA_TOWER_TEMPLATE,
} from "./TraumaTower";

test("getBoxTemplate", () => {
  expect(getBoxTemplate("unknown")).toBeUndefined();
  expect(getBoxTemplate("")).toBeUndefined();

  expect(getBoxTemplate("0")).toEqual(TRAUMA_TOWER_TEMPLATE.boxes[0]);
});

test("getBoxName", () => {
  expect(getBoxName("Chest Drain", 1)).toEqual("Chest Drain - Box 1");
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
    expect(getItemTemplate("0", "0")).toEqual({
      name: "Blunt dissection chest drainage insertion pack",
      size: "28Fg",
      description:
        "Pack containing equipment for insertion of trauma chest drain",
      location: "Resus store XX",
      photo: "chestdrain.jpg",
    });

    expect(getItemTemplate("0", "4")).toEqual({
      name: "Chest drain catheter",
      size: "28Fr",
      description: "Chest drain catheter - 28Fr",
      location: "Resus store XX",
      photo: "pleuralcatheter.jpg",
    });
  });

  test("unknown boxTemplateId", () => {
    expect(getItemTemplate("unknown", "1")).toBeUndefined();
    expect(getItemTemplate("", "1")).toBeUndefined();
    expect(getItemTemplate(undefined, "1")).toBeUndefined();
  });

  test("unknown itemNumber", () => {
    expect(getItemTemplate("0", "-1")).toBeUndefined();
    expect(getItemTemplate("0", "15")).toBeUndefined();

    expect(getItemTemplate("0", "unknown")).toBeUndefined();
    expect(getItemTemplate("0", "")).toBeUndefined();
    expect(getItemTemplate("0", undefined)).toBeUndefined();
  });
});
