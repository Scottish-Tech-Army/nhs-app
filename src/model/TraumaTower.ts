import {
  BoxTemplate,
  EIMissingBoxItem,
  ItemTemplate,
  StorageAreaTemplate,
} from "./StorageTypes";

const BOX_TRAUMA_CHEST_DRAIN: BoxTemplate = {
  name: "Trauma Chest Drain",
  boxTemplateId: "0",
  count: 6,
  items: [
    {
      name: "Blunt dissection chest drainage insertion pack",
      size: "28Fg",
      description:
        "Pack containing equipment for insertion of trauma chest drain",
      location: "Resus store XX",
      photo: "chestdrain.jpg",
    },
    {
      name: "Sterile gloves",
      size: "Small",
      description: "Small sterile gloves - 1 pair",
      location: "Resus store XX",
      photo: "smallsterilegloves.jpg",
    },
    {
      name: "Sterile gloves",
      size: "Medium",
      description: "Medium sterile gloves - 1 pair",
      location: "Resus store XX",
      photo: "mediumsterilegloves.jpg",
    },
    {
      name: "Sterile gloves",
      size: "Large",
      description: "Large sterile gloves - 1 pair",
      location: "Resus store XX",
      photo: "largesterilegloves.jpg",
    },
    {
      name: "Chest drain catheter",
      size: "28Fr",
      description: "Chest drain catheter - 28Fr",
      location: "Resus store XX",
      photo: "pleuralcatheter.jpg",
    },
    {
      name: "Chest drain catheter",
      size: "32Fr",
      description: "Chest drain catheter - 32Fr",
      location: "Resus store XX",
      photo: "pleuralcatheter.jpg",
    },
    {
      name: "Chest drain catheter",
      size: "36Fr",
      description: "Chest drain catheter - 36Fr",
      location: "Resus store XX",
      photo: "pleuralcatheter.jpg",
    },
    {
      name: "ChloraPrep applicator",
      description:
        "ChloraPrep applicator for cleaning skin for sterile procedure",
      location: "Resus store XX",
      photo: "chloraprep.jpg",
      quantity: 2,
    },
    {
      name: "Lidocaine 1%",
      size: "5ml / 50mg",
      description: "Local anaesthetic",
      location: "Resus store XX",
      photo: "lidocaine.jpg",
      quantity: 2,
    },
    {
      name: "Standard suture pack",
      size: "Standard",
      description: "Pack of equipment for suturing",
      location: "Resus store XX",
      photo: "standardsuture.jpg",
    },
    {
      name: "Mefix roll",
      size: "5cm x 10m",
      description: "Roll of mefix dressing retention tape",
      location: "Resus store XX",
      photo: "mefix.jpg",
    },
    {
      name: "Chest drain bottle",
      description: "Chest drain bottle for draining air and blood",
      location: "Resus store XX",
      photo: "chestdrainbottle.jpg",
    },
    {
      name: "Chest drain tubing",
      description:
        "Tubing for connecting chest drain catheter and chest drain bottle",
      location: "Resus store XX",
      photo: "chestdraintubing.jpg",
    },
    {
      name: "Sterile water (H20) bottle",
      size: "1000ml bottle",
      description: "Sterile water (H2O)",
      location: "Resus store XX",
      photo: "sterilewater.jpg",
    },
    {
      name: "Spencer wells forceps",
      size: "Straight 20cm",
      description:
        "Forceps for chest procedures including chest drain insertion, thoracostomies and thoracotomy",
      location: "Resus store XX",
      photo: "spencerwells.jpg",
    },
  ],
};

export const BOX_CAT_HAEMORRHAGE: BoxTemplate = {
  name: "Catastrophic Haemorrhage",
  boxTemplateId: "1",
  count: 3,
  items: [
    {
      name: "CAT Tourniquet",
      description: "Combat application tourniquet",
      location: "Resus store XX",
      photo: "cat.jpg",
      quantity: 4,
    },
    {
      name: "Blast bandages",
      description: "Large trauma dressing",
      location: "Resus store XX",
      photo: "blast.jpg",
      quantity: 2,
    },
    {
      name: "Chito Gauze",
      description: "Haemostatic gauze for packing wounds",
      location: "Resus store XX",
      photo: "haemgauze.jpg",
      quantity: 2,
    },
    {
      name: "Modular bandage",
      description: "Olaes modular pressure bandage",
      location: "Resus store XX",
      photo: "modular.jpg",
      quantity: 2,
    },
    {
      name: "Mosquito Artery Forceps (Straight)",
      size: "12.5cm",
      description: "Forceps for clamping blood vessels",
      location: "Resus store XX",
      photo: "mosquito.png",
      quantity: 2,
    },
    {
      name: "Dressing pack",
      size: "Medium",
      description: "Universal dressing pack",
      location: "Resus store XX",
      photo: "dressingpack.jpg",
    },
    {
      name: "Suture pack",
      size: "Standard",
      description: "Pack of equipment for suturing",
      location: "Resus store XX",
      photo: "standardsuture.jpg",
    },
    {
      name: "Mersilk suture",
      size: "1-0",
      description: "Non-absorbable, handheld suture",
      location: "Resus store XX",
      photo: "mersilk.jpg",
      quantity: 2,
    },
    {
      name: "Stapler",
      description: "Skin stapler for wound closure",
      location: "Resus store XX",
      photo: "stapler.jpg",
    },
  ],
};

export const BOX_MAX_FAX_HAEMORRHAGE: BoxTemplate = {
  name: "Max Fax Haemorrhage",
  boxTemplateId: "2",
  count: 3,
  items: [
    {
      name: "Bite block",
      size: "Small (white)",
      description: "Pair of bite blocks",
      location: "Resus store XX",
      photo: "smallbiteblock.jpg",
    },
    {
      name: "Bite block",
      size: "Medium (green)",
      description: "Pair of bite blocks",
      location: "Resus store XX",
      photo: "mediumbiteblock.jpg",
    },
    {
      name: "Bite block",
      size: "Large (orange)",
      description: "Pair of bite blocks",
      location: "Resus store XX",
      photo: "largebiteblock.jpg",
    },
    {
      name: "Epistat",
      description: "Epistat nasal catheter",
      location: "Resus store XX",
      photo: "epistat.jpg",
      quantity: 2,
    },
  ],
};

export const BOX_TEMPLATES = [
  BOX_TRAUMA_CHEST_DRAIN,
  BOX_CAT_HAEMORRHAGE,
  BOX_MAX_FAX_HAEMORRHAGE,
];

export const TRAUMA_TOWER_1: StorageAreaTemplate = {
  storageAreaId: "0",
  name: "Trauma Tower 1",
  boxes: [BOX_TRAUMA_CHEST_DRAIN, BOX_CAT_HAEMORRHAGE, BOX_MAX_FAX_HAEMORRHAGE],
};

export const TRAUMA_TOWER_2: StorageAreaTemplate = {
  storageAreaId: "1",
  name: "Trauma Tower 2",
  boxes: [BOX_TRAUMA_CHEST_DRAIN, BOX_CAT_HAEMORRHAGE, BOX_MAX_FAX_HAEMORRHAGE],
};

export const BACKUP_AREA: StorageAreaTemplate = {
  storageAreaId: "2",
  name: "Backup Area",
  boxes: [BOX_TRAUMA_CHEST_DRAIN, BOX_CAT_HAEMORRHAGE, BOX_MAX_FAX_HAEMORRHAGE],
};

export const STORAGE_AREAS: StorageAreaTemplate[] = [
  TRAUMA_TOWER_1,
  TRAUMA_TOWER_2,
  BACKUP_AREA,
];

export function getStorageArea(storageAreaId: string) {
  return STORAGE_AREAS.find(
    (storageArea) => storageArea.storageAreaId === storageAreaId
  );
}

export function getBoxTemplate(boxTemplateId: string) {
  return BOX_TEMPLATES.find(
    (boxTemplate) => boxTemplate.boxTemplateId === boxTemplateId
  );
}

export function getItemTemplate(
  boxTemplateId: string | undefined,
  itemNumberString: string | undefined
) {
  if (!boxTemplateId || !itemNumberString) {
    return undefined;
  }

  let itemNumber = -1;
  if (itemNumberString?.match(/^\d+$/)) {
    itemNumber = Number.parseInt(itemNumberString);
  }

  return getBoxTemplate(boxTemplateId)?.items[itemNumber];
}

export function getBoxName(boxTemplateName: string, boxNumber: number) {
  return `${boxTemplateName} - Box ${boxNumber}`;
}

export function getItemDisplayName(item: ItemTemplate | EIMissingBoxItem) {
  let result = item.name;
  if (item.size) {
    result += ` (${item.size})`;
  }
  return result;
}
