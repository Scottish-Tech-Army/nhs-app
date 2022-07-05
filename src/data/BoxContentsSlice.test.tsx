import {
  ALL_CONTENTS,
  EMPTY_CONTENTS,
  PARTIAL_CONTENTS,
  ZERO_CHEST_DRAIN_BOX,
  ZERO_CONTENTS,
} from "../testData";
import reducer, {
  getBoxContents,
  resetAllBoxContents,
  setBoxContents,
  refreshState,
  setState,
} from "./BoxContentsSlice";
import { BoxContents, StorageAreaContents } from "./StorageTypes";
import { createStore, RootState } from "./store";
import { TRAUMA_TOWER_TEMPLATE } from "./TraumaTower";
import localforage from "localforage";

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

    const expectedState = {
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
    };

    expect(reducer(previousState, setBoxContents(boxContents))).toEqual(
      expectedState
    );

    // Check calls
    expect(localforage.setItem).toHaveBeenCalledTimes(1);
    expect(localforage.setItem).toHaveBeenCalledWith(
      "boxContents",
      expectedState
    );
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

    const expectedState = {
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
    };

    expect(reducer(previousState, setBoxContents(boxContents))).toEqual(
      expectedState
    );

    // Check calls
    expect(localforage.setItem).toHaveBeenCalledTimes(1);
    expect(localforage.setItem).toHaveBeenCalledWith(
      "boxContents",
      expectedState
    );
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

    // Check calls
    expect(localforage.setItem).not.toHaveBeenCalled();
  });
});

describe("resetAllBoxContents", () => {
  test("should reset back to initial state", () => {
    expect(reducer(EMPTY_CONTENTS, resetAllBoxContents)).toEqual(ZERO_CONTENTS);
    expect(reducer(ALL_CONTENTS, resetAllBoxContents)).toEqual(ZERO_CONTENTS);
    expect(reducer(PARTIAL_CONTENTS, resetAllBoxContents)).toEqual(
      ZERO_CONTENTS
    );
    expect(reducer(ZERO_CONTENTS, resetAllBoxContents)).toEqual(ZERO_CONTENTS);

    // Check calls
    expect(localforage.setItem).toHaveBeenCalledTimes(4);
    expect(localforage.setItem).toHaveBeenNthCalledWith(
      1,
      "boxContents",
      ZERO_CONTENTS
    );
    expect(localforage.setItem).toHaveBeenNthCalledWith(
      2,
      "boxContents",
      ZERO_CONTENTS
    );
    expect(localforage.setItem).toHaveBeenNthCalledWith(
      3,
      "boxContents",
      ZERO_CONTENTS
    );
    expect(localforage.setItem).toHaveBeenNthCalledWith(
      4,
      "boxContents",
      ZERO_CONTENTS
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

describe("refreshState", () => {
  const store = createStore();
  const dispatch = store.dispatch;

  beforeEach(() => {
    dispatch(resetAllBoxContents());
  });

  function mockLocalForageGetItem(boxContents: StorageAreaContents | null) {
    (localforage.getItem as jest.Mock).mockImplementation((itemId) => {
      if (itemId === "boxContents") {
        return Promise.resolve(boxContents);
      }
      return Promise.reject(new Error("Unexpected getItem " + itemId));
    });
  }

  it("stored box contents", async () => {
    mockLocalForageGetItem(PARTIAL_CONTENTS);

    await dispatch(refreshState());

    expect(store.getState().boxContents).toEqual(PARTIAL_CONTENTS);

    // Check calls
    expect(localforage.getItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledWith("boxContents");
  });

  it("nothing stored on disk", async () => {
    mockLocalForageGetItem(null);
    await dispatch(setState(PARTIAL_CONTENTS));
    (localforage.setItem as jest.Mock).mockClear();

    await dispatch(refreshState());

    expect(store.getState().boxContents).toEqual(PARTIAL_CONTENTS);

    // Check calls
    expect(localforage.getItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledWith("boxContents");
    expect(localforage.setItem).toHaveBeenCalledTimes(1);
    expect(localforage.setItem).toHaveBeenCalledWith(
      "boxContents",
      PARTIAL_CONTENTS
    );
  });

  it("read failed - don't refresh state", async () => {
    (localforage.getItem as jest.Mock).mockImplementation((itemId) => {
      return Promise.reject(new Error("GetItem failed " + itemId));
    });
    dispatch(setState(PARTIAL_CONTENTS));

    await dispatch(refreshState());

    expect(store.getState().boxContents).toEqual(PARTIAL_CONTENTS);

    // Check calls
    expect(localforage.getItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledWith("boxContents");
  });

  it("write failed - continue to refresh state", async () => {
    mockLocalForageGetItem(null);
    dispatch(setState(PARTIAL_CONTENTS));

    (localforage.setItem as jest.Mock).mockImplementation((itemId) => {
      return Promise.reject(new Error("SetItem failed " + itemId));
    });
    (localforage.setItem as jest.Mock).mockClear();

    await dispatch(refreshState());

    expect(store.getState().boxContents).toEqual(PARTIAL_CONTENTS);
    expect(localforage.getItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledWith("boxContents");
    expect(localforage.setItem).toHaveBeenCalledTimes(1);
    expect(localforage.setItem).toHaveBeenCalledWith(
      "boxContents",
      PARTIAL_CONTENTS
    );
  });
});
