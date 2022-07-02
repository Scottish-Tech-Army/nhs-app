import { ZERO_CHEST_DRAIN_BOX, ZERO_CONTENTS } from "../testData";
import reducer, { getBoxContents, setBoxContents } from "./BoxContentsSlice";
import { BoxContents, StorageAreaContents } from "./StorageTypes";
import { RootState } from "./store";
import { TRAUMA_TOWER_TEMPLATE } from "./TraumaTower";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(ZERO_CONTENTS);
});

describe("setBoxContents", () => {
  test("should handle a box contents being added", () => {
    const previousState: StorageAreaContents = {
      storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
      boxes: [
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 1 },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 2 },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 3 },
        {
          boxTemplateId: "0",
          boxNumber: 4,
          items: [{ name: "Sterile gloves", size: "Large", quantity: 1 }],
        },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 5 },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 6 },
      ],
    };

    const boxContents: BoxContents = {
      boxTemplateId: "0",
      boxNumber: 2,
      items: [{ name: "Sterile gloves", size: "Small", quantity: 1 }],
    };

    expect(reducer(previousState, setBoxContents(boxContents))).toEqual({
      storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
      boxes: [
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 1 },
        {
          boxTemplateId: "0",
          boxNumber: 2,
          items: [{ name: "Sterile gloves", size: "Small", quantity: 1 }],
        },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 3 },
        {
          boxTemplateId: "0",
          boxNumber: 4,
          items: [{ name: "Sterile gloves", size: "Large", quantity: 1 }],
        },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 5 },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 6 },
      ],
    });
  });

  test("should handle a box contents being updated", () => {
    const previousState: StorageAreaContents = {
      storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
      boxes: [
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 1 },
        {
          boxTemplateId: "0",
          boxNumber: 2,
          items: [
            { name: "Sterile gloves", size: "Small", quantity: 1 },
            { name: "Sterile gloves", size: "Medium", quantity: 1 },
          ],
        },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 3 },
        {
          boxTemplateId: "0",
          boxNumber: 4,
          items: [{ name: "Sterile gloves", size: "Large", quantity: 1 }],
        },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 5 },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 6 },
      ],
    };

    const boxContents: BoxContents = {
      boxTemplateId: "0",
      boxNumber: 2,
      items: [{ name: "Sterile gloves", size: "Small", quantity: 2 }],
    };

    expect(reducer(previousState, setBoxContents(boxContents))).toEqual({
      storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
      boxes: [
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 1 },
        {
          boxTemplateId: "0",
          boxNumber: 2,
          items: [{ name: "Sterile gloves", size: "Small", quantity: 2 }],
        },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 3 },
        {
          boxTemplateId: "0",
          boxNumber: 4,
          items: [{ name: "Sterile gloves", size: "Large", quantity: 1 }],
        },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 5 },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 6 },
      ],
    });
  });

  test("should ignore unknown box", () => {
    const previousState: StorageAreaContents = {
      storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
      boxes: [
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 1 },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 2 },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 3 },
        {
          boxTemplateId: "0",
          boxNumber: 4,
          items: [{ name: "Sterile gloves", size: "Large", quantity: 1 }],
        },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 5 },
        { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 6 },
      ],
    };

    const boxContents: BoxContents = {
      boxTemplateId: "0",
      boxNumber: 7,
      items: [{ name: "Sterile gloves", size: "Small", quantity: 1 }],
    };

    expect(reducer(previousState, setBoxContents(boxContents))).toEqual(
      previousState
    );
  });
});

describe("getBoxContents", () => {
  test("success", () => {
    const state: RootState = { boxContents: ZERO_CONTENTS };

    expect(getBoxContents("0", "1")(state)).toEqual({
      ...ZERO_CHEST_DRAIN_BOX,
      boxNumber: 1,
    });
  });

  test("unknown boxTemplateId", () => {
    const state: RootState = { boxContents: ZERO_CONTENTS };

    expect(getBoxContents("unknown", "1")(state)).toBeUndefined();
    expect(getBoxContents("", "1")(state)).toBeUndefined();
  });

  test("unknown boxId", () => {
    const state: RootState = { boxContents: ZERO_CONTENTS };

    expect(getBoxContents("0", "0")(state)).toBeUndefined();
    expect(getBoxContents("0", "7")(state)).toBeUndefined();

    expect(getBoxContents("0", "unknown")(state)).toBeUndefined();
    expect(getBoxContents("0", "")(state)).toBeUndefined();
  });
});
