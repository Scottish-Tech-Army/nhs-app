import { createSlice } from "@reduxjs/toolkit";
import { BoxContents, StorageAreaContents } from "./StorageTypes";
import { RootState } from "./store";
import { TRAUMA_TOWER_TEMPLATE } from "./TraumaTower";

export const initialState: StorageAreaContents = {
  storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
  boxes: [],
};

TRAUMA_TOWER_TEMPLATE.boxes.forEach(({ boxTemplateId, count, items }) => {
  for (let boxNumber = 1; boxNumber <= count; boxNumber++) {
    initialState.boxes.push({
      boxTemplateId,
      boxNumber,
      items: items.map(({ name, size }) => ({ name, size, quantity: 0 })),
    });
  }
});

export const boxContentsSlice = createSlice({
  name: "boxContents",
  initialState,
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
  },
});

export const { setBoxContents } = boxContentsSlice.actions;

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

export const getAreaContents = (state:RootState) => state.boxContents;

export default boxContentsSlice.reducer;
