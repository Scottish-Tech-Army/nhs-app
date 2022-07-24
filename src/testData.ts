import { BoxContents, StorageAreaContents } from "./model/StorageTypes";
import { TRAUMA_TOWER_TEMPLATE } from "./model/TraumaTower";

export const FULL_CHEST_DRAIN_BOX: Omit<BoxContents, "boxNumber"> = {
  boxTemplateId: "0",
  items: [
    {
      name: "Blunt dissection chest drainage insertion pack",
      size: "28Fg",
      quantity: 1,
    },
    { name: "Sterile gloves", size: "Small", quantity: 1 },
    { name: "Sterile gloves", size: "Medium", quantity: 1 },
    { name: "Sterile gloves", size: "Large", quantity: 1 },
    { name: "Chest drain catheter", size: "28Fr", quantity: 1 },
    { name: "Chest drain catheter", size: "32Fr", quantity: 1 },
    { name: "Chest drain catheter", size: "36Fr", quantity: 1 },
    { name: "ChloraPrep applicator", quantity: 2 },
    { name: "Lidocaine 1%", size: "5ml / 50mg", quantity: 2 },
    { name: "Standard suture pack", size: "Standard", quantity: 1 },
    { name: "Mefix roll", size: "5cm x 10m", quantity: 1 },
    { name: "Chest drain bottle", quantity: 1 },
    { name: "Chest drain tubing", quantity: 1 },
    {
      name: "Sterile water (H20) bottle",
      size: "1000ml bottle",
      quantity: 1,
    },
    { name: "Spencer wells forceps", size: "Straight 20cm", quantity: 1 },
  ],
};

export const ZERO_CHEST_DRAIN_BOX: Omit<BoxContents, "boxNumber"> = {
  boxTemplateId: "0",
  items: [
    {
      name: "Blunt dissection chest drainage insertion pack",
      size: "28Fg",
      quantity: 0,
    },
    { name: "Sterile gloves", size: "Small", quantity: 0 },
    { name: "Sterile gloves", size: "Medium", quantity: 0 },
    { name: "Sterile gloves", size: "Large", quantity: 0 },
    { name: "Chest drain catheter", size: "28Fr", quantity: 0 },
    { name: "Chest drain catheter", size: "32Fr", quantity: 0 },
    { name: "Chest drain catheter", size: "36Fr", quantity: 0 },
    { name: "ChloraPrep applicator", quantity: 0 },
    { name: "Lidocaine 1%", size: "5ml / 50mg", quantity: 0 },
    { name: "Standard suture pack", size: "Standard", quantity: 0 },
    { name: "Mefix roll", size: "5cm x 10m", quantity: 0 },
    { name: "Chest drain bottle", quantity: 0 },
    { name: "Chest drain tubing", quantity: 0 },
    {
      name: "Sterile water (H20) bottle",
      size: "1000ml bottle",
      quantity: 0,
    },
    { name: "Spencer wells forceps", size: "Straight 20cm", quantity: 0 },
  ],
};

export const EMPTY_CHEST_DRAIN_BOX: Omit<BoxContents, "boxNumber"> = {
  boxTemplateId: "0",
  items: [],
};

export const ALL_CONTENTS: StorageAreaContents = {
  storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
  boxes: [
    { ...FULL_CHEST_DRAIN_BOX, boxNumber: 1 },
    { ...FULL_CHEST_DRAIN_BOX, boxNumber: 2 },
    { ...FULL_CHEST_DRAIN_BOX, boxNumber: 3 },
    { ...FULL_CHEST_DRAIN_BOX, boxNumber: 4 },
    { ...FULL_CHEST_DRAIN_BOX, boxNumber: 5 },
    { ...FULL_CHEST_DRAIN_BOX, boxNumber: 6 },
  ],
};

export const PARTIAL_CONTENTS: StorageAreaContents = {
  storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
  boxes: [
    { ...FULL_CHEST_DRAIN_BOX, boxNumber: 1 },
    { ...FULL_CHEST_DRAIN_BOX, boxNumber: 2 },

    {
      boxTemplateId: "0",
      boxNumber: 3,
      items: [
        {
          name: "Blunt dissection chest drainage insertion pack",
          size: "28Fg",
          quantity: 1,
        },
        { name: "Sterile gloves", size: "Small", quantity: 1 },
        { name: "Sterile gloves", size: "Medium", quantity: 0 },
        { name: "Sterile gloves", size: "Large", quantity: 0 },
        { name: "Chest drain catheter", size: "36Fr", quantity: 1 },
        { name: "Lidocaine 1%", size: "5ml / 50mg", quantity: 1 }, // 1 missing
        { name: "Standard suture pack", size: "Standard", quantity: 3 }, // 2 extra
        // TODO - check having too many in the box is a bad thing
        { name: "Mefix roll", size: "5cm x 10m", quantity: 1 },
        { name: "Spencer wells forceps", size: "Straight 20cm", quantity: 1 },
      ],
    },
    { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 4 },
    { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 5 },
    { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 6 },
  ],
};

export const EMPTY_CONTENTS: StorageAreaContents = {
  storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
  boxes: [
    { ...EMPTY_CHEST_DRAIN_BOX, boxNumber: 1 },
    { ...EMPTY_CHEST_DRAIN_BOX, boxNumber: 2 },
    { ...EMPTY_CHEST_DRAIN_BOX, boxNumber: 3 },
    { ...EMPTY_CHEST_DRAIN_BOX, boxNumber: 4 },
    { ...EMPTY_CHEST_DRAIN_BOX, boxNumber: 5 },
    { ...EMPTY_CHEST_DRAIN_BOX, boxNumber: 6 },
  ],
};

export const ZERO_CONTENTS: StorageAreaContents = {
  storageAreaId: TRAUMA_TOWER_TEMPLATE.storageAreaId,
  boxes: [
    { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 1 },
    { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 2 },
    { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 3 },
    { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 4 },
    { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 5 },
    { ...ZERO_CHEST_DRAIN_BOX, boxNumber: 6 },
  ],
};
