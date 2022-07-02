import {
  getBoxName,
  getBoxTemplate,
  getItemDisplayName,
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
