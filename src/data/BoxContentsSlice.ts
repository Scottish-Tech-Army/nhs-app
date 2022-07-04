import { createSlice } from "@reduxjs/toolkit";
import { BoxContents, StorageAreaContents } from "./StorageTypes";
import { RootState } from "./store";
import { TRAUMA_TOWER_TEMPLATE } from "./TraumaTower";
import localforage from "localforage";
import thunk, { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

localforage.config({
  name: "nhs-inventory",
  version: 1.0,
  storeName: "nhsinventory",
  description: "small inventory app for A&E",
});

export function createInitialState() {
  const result: StorageAreaContents = {
    storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
    boxes: [],
  };
  TRAUMA_TOWER_TEMPLATE.boxes.forEach(({ boxTemplateId, count, items }) => {
    for (let boxNumber = 1; boxNumber <= count; boxNumber++) {
      result.boxes.push({
        boxTemplateId,
        boxNumber,
        items: items.map(({ name, size }) => ({ name, size, quantity: 0 })),
      });
    }
  });
  return result;
}

export const boxContentsSlice = createSlice({
  name: "boxContents",
  initialState: createInitialState(),
  reducers: {
    setBoxContents: (state, action) => {
      const newBoxContents: BoxContents = action.payload;
      const boxIndex = state.boxes.findIndex(
        (box) =>
          box.boxTemplateId === newBoxContents.boxTemplateId &&
          box.boxNumber === newBoxContents.boxNumber
      );

      if (boxIndex > -1) {
        state.boxes[boxIndex] = newBoxContents;
      }
    },
    resetAllBoxContents: (state) => {
      return createInitialState();
    },
    setState: (state, action) => {
      const newState: StorageAreaContents = action.payload;
      return newState;
    },
  },
});

export function refreshState(): AppThunk {
  return function (dispatch, getState) {
    return localforage.getItem("boxContents")
      .then((storedBoxContents) => {
        // const state = { ...getState(), initialisingState: false };

        // if (storedBoxContents === null) {
        //   writePhotos(state).catch((err) => console.error(err));
        // }
        if (storedBoxContents) {
          dispatch(boxContentsSlice.actions.setState(storedBoxContents));
        }
      })
      .catch((err) => console.error(err));
  };
}

export const { setBoxContents, resetAllBoxContents, setState } =
  boxContentsSlice.actions;

export const getBoxContents = (
  boxTemplateId: string | undefined,
  boxNumberString: string | undefined
) => {
  let boxNumber = 0;
  if (boxNumberString?.match(/^\d+$/)) {
    boxNumber = Number.parseInt(boxNumberString);
  }

  return (state: RootState) => {
    return state.boxContents.boxes.find(
      (box) =>
        box.boxTemplateId === boxTemplateId && box.boxNumber === boxNumber
    );
  };
};

export const getAreaContents = (state: RootState) => state.boxContents;

export default boxContentsSlice.reducer;
