import { PARTIAL_CONTENTS, ZERO_CONTENTS } from "../testData";
import reducer, { refreshState, setState } from "./BoxContentsSlice";
import { StorageAreaContents } from "./StorageTypes";
import { createStore } from "./store";
import localforage from "localforage";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(ZERO_CONTENTS);
});

describe("refreshState", () => {
  const store = createStore();
  const dispatch = store.dispatch;

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
