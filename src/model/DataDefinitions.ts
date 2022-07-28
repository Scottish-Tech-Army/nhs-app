import {
  ContainerTemplate,
  MissingContainerItem,
  ItemTemplate,
  StorageAreaTemplate,
} from "./StorageTypes";

// Define container templates which have fixed named replicates
type PartialFixedContainerTemplate = Omit<
  ContainerTemplate,
  "containerTemplateId"
>;

export const LOCATIONS = [
  "Resus 1a",
  "Resus 1b",
  "Resus 1c",
  "Resus 2",
  "Resus Stock Cupboard",
  "Ward Clerk's Desk",
];

export const BOX_TRAUMA_CHEST_DRAIN: ContainerTemplate = {
  name: "Trauma Chest Drain",
  containerTemplateId: "trauma-chest-drain",
  containerType: "Box",
  quantity: 6,
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

export const BOX_CAT_HAEMORRHAGE: ContainerTemplate = {
  name: "Catastrophic Haemorrhage",
  containerTemplateId: "cat-haemorrhage",
  containerType: "Box",
  quantity: 3,
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

export const BOX_MAX_FAX_HAEMORRHAGE: ContainerTemplate = {
  name: "Max Fax Haemorrhage",
  containerTemplateId: "max-fax-haemorrhage",
  containerType: "Box",
  quantity: 3,
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

export const TRAUMA_TOWER: StorageAreaTemplate = {
  storageAreaId: "trauma-tower",
  name: "Trauma Tower",
  containers: [
    BOX_TRAUMA_CHEST_DRAIN,
    BOX_CAT_HAEMORRHAGE,
    BOX_MAX_FAX_HAEMORRHAGE,
  ],
  possibleLocations: LOCATIONS,
};

export const AIRWAY_TROLLEY_TOP: PartialFixedContainerTemplate = {
  name: "Top",
  containerType: "Trolley",
  items: [
    {
      name: "Laminated RSI Checklist",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Lubricating gel sachet",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Medium Introducer",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Nasopharyngeal Airway",
      size: "6.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Nasopharyngeal Airway",
      size: "7.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const AIRWAY_TROLLEY_DRAWER_A: PartialFixedContainerTemplate = {
  name: "Drawer A - Face mask & Tracheal Intubation",
  containerType: "Drawer",
  items: [
    {
      name: "Face Mask",
      size: "4",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Face Mask",
      size: "5",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Guedel airway - Green",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Guedel airway - Orange",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Guedel airway - Red",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "ET Tube",
      size: "9.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "ET Tube",
      size: "8.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "ET Tube",
      size: "7.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "ET Tube",
      size: "6.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Disposable Mac Blade",
      size: "3",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Disposable Mac Blade",
      size: "4",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Easyfix crinx tube tie",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Roll of zinc oxide tape",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "10ml Syringe",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Magill Forceps",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Catheter Mount",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "HME Filter",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Small Scissors",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Lubricating gel sachet",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 4,
    },
    {
      name: "Video Laryngoscope (McGrath)",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "McGrath Blade",
      size: "3",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "McGrath Blade",
      size: "4",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const AIRWAY_TROLLEY_DRAWER_B: PartialFixedContainerTemplate = {
  name: "Drawer B - Maintaining Oxygenation & SAD",
  containerType: "Drawer",
  items: [
    {
      name: "i-gel",
      size: "3",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "i-gel",
      size: "4",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "i-gel",
      size: "5",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Flextube Catheter Mount swivel elbow (Bronchoscopy)",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Single use iLMA (LAM Fastrach)",
      size: "7.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "10ml Syringe",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Lubricating Gel Sachet",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Easyfix crinx tube tie",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Roll of zinc oxide tape",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "LMA",
      size: "3",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "LMA",
      size: "4",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "LMA",
      size: "5",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "50ml Syringe",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const AIRWAY_TROLLEY_DRAWER_C: PartialFixedContainerTemplate = {
  name: "Drawer C – Oxygenate by Any Means",
  containerType: "Drawer",
  items: [
    {
      name: "Guedel airway - Green",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Guedel airway - Orange",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Guedel airway - Red",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Face Mask",
      size: "4",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Face Mask",
      size: "5",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Nasopharyngeal Airway",
      size: "6.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Nasopharyngeal Airway",
      size: "7.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const AIRWAY_TROLLEY_DRAWER_D: PartialFixedContainerTemplate = {
  name: "Drawer D - Front of neck access",
  containerType: "Drawer",
  items: [
    {
      name: "ScalpelCric – Cricothyrotomy set",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const AIRWAY_TROLLEY_DRAWER_E: PartialFixedContainerTemplate = {
  name: "Drawer E",
  containerType: "Drawer",
  items: [
    {
      name: "Thermovent O2 Tubing",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Thermovent Filter",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Tracheostomy Tube",
      size: "7.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Tracheostomy Tube",
      size: "8.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "McGrath VL Spare Battery",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Laminated Surgical Airway Procedure Checklist",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Emergency Laryngectomy/Tracheostomy Management Protocol",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Oxford Headrest",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const AIRWAY_TROLLEY_DRAWER_E_AIRWAY_BOX: PartialFixedContainerTemplate =
  {
    name: "Drawer E - Surgical Airway Box",
    containerType: "Box",
    items: [
      {
        name: "Scalpel",
        size: "22",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
      },
      {
        name: "Tracheal Hook",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
      },
      {
        name: "Tracheostomy Tube",
        size: "6.0 (Portex)",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
      },
      {
        name: "Tracheostomy Tie",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
      },
      {
        name: "ET Tube",
        size: "6.0",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
      },
      {
        name: "10ml Syringe",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
      },
      {
        name: "Local anaesthetic",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
      },
    ],
  };

export const AIRWAY_TROLLEY_SIDE: PartialFixedContainerTemplate = {
  name: "Side",
  containerType: "Trolley",
  items: [
    {
      name: "Aintree Catheter",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Bougie (Cook Frova)",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
  ],
};

export const AIRWAY_TROLLEY_1: StorageAreaTemplate = {
  storageAreaId: "airway-trolley-1",
  name: "Airway Trolley 1",
  containers: [
    { ...AIRWAY_TROLLEY_TOP, containerTemplateId: "airway-trolley-1-top" },
    {
      ...AIRWAY_TROLLEY_DRAWER_A,
      containerTemplateId: "airway-trolley-1-drawer-a",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_B,
      containerTemplateId: "airway-trolley-1-drawer-b",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_C,
      containerTemplateId: "airway-trolley-1-drawer-c",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_D,
      containerTemplateId: "airway-trolley-1-drawer-d",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_E,
      containerTemplateId: "airway-trolley-1-drawer-e",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_E_AIRWAY_BOX,
      containerTemplateId: "airway-trolley-1-drawer-e-airway-box",
    },
    { ...AIRWAY_TROLLEY_SIDE, containerTemplateId: "airway-trolley-1-side" },
  ],
  possibleLocations: LOCATIONS,
};

export const AIRWAY_TROLLEY_2: StorageAreaTemplate = {
  storageAreaId: "airway-trolley-2",
  name: "Airway Trolley 2",
  containers: [
    { ...AIRWAY_TROLLEY_TOP, containerTemplateId: "airway-trolley-2-top" },
    {
      ...AIRWAY_TROLLEY_DRAWER_A,
      containerTemplateId: "airway-trolley-2-drawer-a",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_B,
      containerTemplateId: "airway-trolley-2-drawer-b",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_C,
      containerTemplateId: "airway-trolley-2-drawer-c",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_D,
      containerTemplateId: "airway-trolley-2-drawer-d",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_E,
      containerTemplateId: "airway-trolley-2-drawer-e",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_E_AIRWAY_BOX,
      containerTemplateId: "airway-trolley-2-drawer-e-airway-box",
    },
    { ...AIRWAY_TROLLEY_SIDE, containerTemplateId: "airway-trolley-2-side" },
  ],
  possibleLocations: LOCATIONS,
};

export const AIRWAY_TROLLEY_3: StorageAreaTemplate = {
  storageAreaId: "airway-trolley-3",
  name: "Airway Trolley 3",
  containers: [
    { ...AIRWAY_TROLLEY_TOP, containerTemplateId: "airway-trolley-3-top" },
    {
      ...AIRWAY_TROLLEY_DRAWER_A,
      containerTemplateId: "airway-trolley-3-drawer-a",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_B,
      containerTemplateId: "airway-trolley-3-drawer-b",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_C,
      containerTemplateId: "airway-trolley-3-drawer-c",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_D,
      containerTemplateId: "airway-trolley-3-drawer-d",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_E,
      containerTemplateId: "airway-trolley-3-drawer-e",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_E_AIRWAY_BOX,
      containerTemplateId: "airway-trolley-3-drawer-e-airway-box",
    },
    { ...AIRWAY_TROLLEY_SIDE, containerTemplateId: "airway-trolley-3-side" },
  ],
  possibleLocations: LOCATIONS,
};

export const AIRWAY_TROLLEY_4: StorageAreaTemplate = {
  storageAreaId: "airway-trolley-4",
  name: "Airway Trolley 4",
  containers: [
    { ...AIRWAY_TROLLEY_TOP, containerTemplateId: "airway-trolley-4-top" },
    {
      ...AIRWAY_TROLLEY_DRAWER_A,
      containerTemplateId: "airway-trolley-4-drawer-a",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_B,
      containerTemplateId: "airway-trolley-4-drawer-b",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_C,
      containerTemplateId: "airway-trolley-4-drawer-c",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_D,
      containerTemplateId: "airway-trolley-4-drawer-d",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_E,
      containerTemplateId: "airway-trolley-4-drawer-e",
    },
    {
      ...AIRWAY_TROLLEY_DRAWER_E_AIRWAY_BOX,
      containerTemplateId: "airway-trolley-4-drawer-e-airway-box",
    },
    { ...AIRWAY_TROLLEY_SIDE, containerTemplateId: "airway-trolley-4-side" },
  ],
};

export const TRANSFER_BAG_FRONT_POCKET: PartialFixedContainerTemplate = {
  name: "Airway (Front Pocket)",
  containerType: "Pocket",
  items: [
    {
      name: "Guedel airway - Green",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Guedel airway - Orange",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Guedel airway - Red",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Nasopharyngeal Airway",
      size: "6.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Nasopharyngeal Airway",
      size: "7.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Mac Blade",
      size: "3",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Mac Blade",
      size: "4",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Laryngoscope Handle",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "10ml Syringe",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Tube Tie",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Lubricating Gel Sachet",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
  ],
};

export const TRANSFER_BAG_FRONT_NET_POCKET: PartialFixedContainerTemplate = {
  name: "Airway (Front Net Pocket)",
  containerType: "Net Pocket",
  items: [
    {
      name: "ET Tube",
      size: "9.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "ET Tube",
      size: "8.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Magill Forceps",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Catheter Mount",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "ET Tube",
      size: "6.0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "10ml Syringe",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Local anaesthetic",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const TRANSFER_BAG_MIDDLE_POCKET: PartialFixedContainerTemplate = {
  name: "Breathing (Middle Pocket)",
  containerType: "Pocket",
  items: [
    {
      name: "Bag-valve-mask with 1500ml reservoir",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Face Mask",
      size: "4",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Face Mask",
      size: "5",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "High-flow Oxygen Mask and Tubing",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const TRANSFER_BAG_BACK_POCKET: PartialFixedContainerTemplate = {
  name: "Circulation (Back Pocket)",
  containerType: "Pocket",
  items: [
    {
      name: "Sodium Chloride 0.9% 1000mls",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "PlasmaLyte 148 500mls",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Giving Set",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Small Sharps Bin",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const TRANSFER_BAG_BACK_POCKET_CANNULATION_GRAB_BAG: PartialFixedContainerTemplate =
  {
    name: "Circulation (Back Pocket) Cannulation Grab Bag",
    containerType: "Bag",
    items: [
      {
        name: "Green Cannula",
        size: "18G",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
        quantity: 2,
      },
      {
        name: "Orange Cannula",
        size: "14G",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
        quantity: 2,
      },
      {
        name: "Disposable Tourniquet",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
      },
      {
        name: "IV Tegaderm",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
        quantity: 2,
      },
      {
        name: "Alcohol Swabs",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
        quantity: 4,
      },
    ],
  };

export const TRANSFER_BAG_BACK_POCKET_SYRINGE_GRAB_BAG: PartialFixedContainerTemplate =
  {
    name: "Circulation (Back Pocket) Syringe Grab Bag",
    containerType: "Bag",
    items: [
      {
        name: "10ml Syringe",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
        quantity: 2,
      },
      {
        name: "5ml Syringe",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
        quantity: 2,
      },
      {
        name: "2ml Syringe",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
        quantity: 2,
      },
      {
        name: "Green Needles",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
        quantity: 6,
      },
      {
        name: "Sodium Chloride 0.9% 10ml Ampoules",
        description: "DESCRIPTION",
        location: "LOCATION",
        photo: "PHOTO.jpg",
        quantity: 4,
      },
    ],
  };

export const TRANSFER_BAG_BACK_NET_POCKETS: PartialFixedContainerTemplate = {
  name: "Circulation (Back Net Pockets)",
  containerType: "Net Pockets",
  items: [
    {
      name: "Adrenaline 1mg Minijet",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 3,
    },
    {
      name: "Atropine 1mg Minijet",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 3,
    },
    {
      name: "Glucose 50% Minijet",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Amiodarone 300mg Minijet",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Diazemuls 10mg Ampoules (1 box)",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Naloxone 400mcg (1 box)",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const TRANSFER_BAG_1: StorageAreaTemplate = {
  storageAreaId: "transfer-bag-1",
  name: "Transfer Bag 1",
  containers: [
    {
      ...TRANSFER_BAG_FRONT_POCKET,
      containerTemplateId: "transfer-bag-1-front",
    },
    {
      ...TRANSFER_BAG_FRONT_NET_POCKET,
      containerTemplateId: "transfer-bag-1-front-net",
    },
    {
      ...TRANSFER_BAG_MIDDLE_POCKET,
      containerTemplateId: "transfer-bag-1-middle",
    },
    { ...TRANSFER_BAG_BACK_POCKET, containerTemplateId: "transfer-bag-1-back" },
    {
      ...TRANSFER_BAG_BACK_POCKET_CANNULATION_GRAB_BAG,
      containerTemplateId: "transfer-bag-1-back-cannulation",
    },
    {
      ...TRANSFER_BAG_BACK_POCKET_SYRINGE_GRAB_BAG,
      containerTemplateId: "transfer-bag-1-back-syringe",
    },
    {
      ...TRANSFER_BAG_BACK_NET_POCKETS,
      containerTemplateId: "transfer-bag-1-back-net",
    },
  ],
};

export const TRANSFER_BAG_2: StorageAreaTemplate = {
  storageAreaId: "transfer-bag-2",
  name: "Transfer Bag 2",
  containers: [
    {
      ...TRANSFER_BAG_FRONT_POCKET,
      containerTemplateId: "transfer-bag-2-front",
    },
    {
      ...TRANSFER_BAG_FRONT_NET_POCKET,
      containerTemplateId: "transfer-bag-2-front-net",
    },
    {
      ...TRANSFER_BAG_MIDDLE_POCKET,
      containerTemplateId: "transfer-bag-2-middle",
    },
    { ...TRANSFER_BAG_BACK_POCKET, containerTemplateId: "transfer-bag-2-back" },
    {
      ...TRANSFER_BAG_BACK_POCKET_CANNULATION_GRAB_BAG,
      containerTemplateId: "transfer-bag-2-back-cannulation",
    },
    {
      ...TRANSFER_BAG_BACK_POCKET_SYRINGE_GRAB_BAG,
      containerTemplateId: "transfer-bag-2-back-syringe",
    },
    {
      ...TRANSFER_BAG_BACK_NET_POCKETS,
      containerTemplateId: "transfer-bag-2-back-net",
    },
  ],
};

export const TRANSFER_BAG_3: StorageAreaTemplate = {
  storageAreaId: "transfer-bag-3",
  name: "Transfer Bag 3",
  containers: [
    {
      ...TRANSFER_BAG_FRONT_POCKET,
      containerTemplateId: "transfer-bag-3-front",
    },
    {
      ...TRANSFER_BAG_FRONT_NET_POCKET,
      containerTemplateId: "transfer-bag-3-front-net",
    },
    {
      ...TRANSFER_BAG_MIDDLE_POCKET,
      containerTemplateId: "transfer-bag-3-middle",
    },
    { ...TRANSFER_BAG_BACK_POCKET, containerTemplateId: "transfer-bag-3-back" },
    {
      ...TRANSFER_BAG_BACK_POCKET_CANNULATION_GRAB_BAG,
      containerTemplateId: "transfer-bag-3-back-cannulation",
    },
    {
      ...TRANSFER_BAG_BACK_POCKET_SYRINGE_GRAB_BAG,
      containerTemplateId: "transfer-bag-3-back-syringe",
    },
    {
      ...TRANSFER_BAG_BACK_NET_POCKETS,
      containerTemplateId: "transfer-bag-3-back-net",
    },
  ],
};

export const TRANSFER_BAG_4: StorageAreaTemplate = {
  storageAreaId: "transfer-bag-4",
  name: "Transfer Bag 4",
  containers: [
    {
      ...TRANSFER_BAG_FRONT_POCKET,
      containerTemplateId: "transfer-bag-4-front",
    },
    {
      ...TRANSFER_BAG_FRONT_NET_POCKET,
      containerTemplateId: "transfer-bag-4-front-net",
    },
    {
      ...TRANSFER_BAG_MIDDLE_POCKET,
      containerTemplateId: "transfer-bag-4-middle",
    },
    { ...TRANSFER_BAG_BACK_POCKET, containerTemplateId: "transfer-bag-4-back" },
    {
      ...TRANSFER_BAG_BACK_POCKET_CANNULATION_GRAB_BAG,
      containerTemplateId: "transfer-bag-4-back-cannulation",
    },
    {
      ...TRANSFER_BAG_BACK_POCKET_SYRINGE_GRAB_BAG,
      containerTemplateId: "transfer-bag-4-back-syringe",
    },
    {
      ...TRANSFER_BAG_BACK_NET_POCKETS,
      containerTemplateId: "transfer-bag-4-back-net",
    },
  ],
};

export const TRANSFER_BAG_5: StorageAreaTemplate = {
  storageAreaId: "transfer-bag-5",
  name: "Transfer Bag 5",
  containers: [
    {
      ...TRANSFER_BAG_FRONT_POCKET,
      containerTemplateId: "transfer-bag-5-front",
    },
    {
      ...TRANSFER_BAG_FRONT_NET_POCKET,
      containerTemplateId: "transfer-bag-5-front-net",
    },
    {
      ...TRANSFER_BAG_MIDDLE_POCKET,
      containerTemplateId: "transfer-bag-5-middle",
    },
    { ...TRANSFER_BAG_BACK_POCKET, containerTemplateId: "transfer-bag-5-back" },
    {
      ...TRANSFER_BAG_BACK_POCKET_CANNULATION_GRAB_BAG,
      containerTemplateId: "transfer-bag-5-back-cannulation",
    },
    {
      ...TRANSFER_BAG_BACK_POCKET_SYRINGE_GRAB_BAG,
      containerTemplateId: "transfer-bag-5-back-syringe",
    },
    {
      ...TRANSFER_BAG_BACK_NET_POCKETS,
      containerTemplateId: "transfer-bag-5-back-net",
    },
  ],
};

export const TRANSFER_BAG_6: StorageAreaTemplate = {
  storageAreaId: "transfer-bag-6",
  name: "Transfer Bag 6",
  containers: [
    {
      ...TRANSFER_BAG_FRONT_POCKET,
      containerTemplateId: "transfer-bag-6-front",
    },
    {
      ...TRANSFER_BAG_FRONT_NET_POCKET,
      containerTemplateId: "transfer-bag-6-front-net",
    },
    {
      ...TRANSFER_BAG_MIDDLE_POCKET,
      containerTemplateId: "transfer-bag-6-middle",
    },
    { ...TRANSFER_BAG_BACK_POCKET, containerTemplateId: "transfer-bag-6-back" },
    {
      ...TRANSFER_BAG_BACK_POCKET_CANNULATION_GRAB_BAG,
      containerTemplateId: "transfer-bag-6-back-cannulation",
    },
    {
      ...TRANSFER_BAG_BACK_POCKET_SYRINGE_GRAB_BAG,
      containerTemplateId: "transfer-bag-6-back-syringe",
    },
    {
      ...TRANSFER_BAG_BACK_NET_POCKETS,
      containerTemplateId: "transfer-bag-6-back-net",
    },
  ],
};

export const A_LINE_BOX: ContainerTemplate = {
  name: "A-Line Box",
  containerType: "Box",
  containerTemplateId: "a-line-box",
  items: [
    {
      name: "Disposable Sterile Gown",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Chloraprep 2% Applicator",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Sterile Gloves",
      size: "Small",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Sterile Gloves",
      size: "Medium",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Sterile Gloves",
      size: "Large",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Small Dressing Pack",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Disposable Hat",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Mask with Visor",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Radial Artery Catheter",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Femoral Artery Catheter",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Standard Suture Pack",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Lidocaine 1% 5mls vial",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Mersilk Suture 1-0",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Blunt Drawing-up Needle",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Orange needle",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Large Tegaderm",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Sodium Chloride 0.9% 1000ml",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Red Transducer Set",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Pressure bag",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Invasive Devices Procedure Bundle Paperwork",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Inco Pad",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const NG_INSERTION_KIT_BOX: ContainerTemplate = {
  name: "NG Insertion Kit",
  containerType: "Box",
  containerTemplateId: "ng-insertion-kit",
  items: [
    {
      name: "Nasogastric tubes",
      size: "12FG",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Nasogastric tubes",
      size: "14FG",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Nasogastric tubes",
      size: "16FG",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "Bile bag",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Spiggot",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Lubrication Gel Sachet",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
      quantity: 2,
    },
    {
      name: "pH Paper",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "50ml Catheter tip syringe",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "1 cm Tape",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
    {
      name: "Macbic Clamp",
      description: "DESCRIPTION",
      location: "LOCATION",
      photo: "PHOTO.jpg",
    },
  ],
};

export const OTHER_PROCEDURES: StorageAreaTemplate = {
  storageAreaId: "other-procedures",
  name: "Other Procedures",
  containers: [A_LINE_BOX, NG_INSERTION_KIT_BOX],
  possibleLocations: LOCATIONS,
};

export const STORAGE_AREAS: StorageAreaTemplate[] = [
  TRAUMA_TOWER,
  AIRWAY_TROLLEY_1,
  AIRWAY_TROLLEY_2,
  AIRWAY_TROLLEY_3,
  AIRWAY_TROLLEY_4,
  TRANSFER_BAG_1,
  TRANSFER_BAG_2,
  TRANSFER_BAG_3,
  TRANSFER_BAG_4,
  TRANSFER_BAG_5,
  TRANSFER_BAG_6,
  OTHER_PROCEDURES,
];

export function getStorageArea(storageAreaId: string) {
  return STORAGE_AREAS.find(
    (storageArea) => storageArea.storageAreaId === storageAreaId
  );
}

export function getContainerTemplate(containerTemplateId: string) {
  const containerTemplates: ContainerTemplate[] = [];
  STORAGE_AREAS.forEach((storageArea) => {
    const containerTemplate = storageArea.containers.find(
      (containerTemplate) =>
        containerTemplate.containerTemplateId === containerTemplateId
    );
    if (containerTemplate) {
      containerTemplates.push(containerTemplate);
    }
  });
  return containerTemplates[0];
}

export function getItemTemplate(
  containerTemplateId: string | undefined,
  itemNumberString: string | undefined
) {
  if (!containerTemplateId || !itemNumberString) {
    return undefined;
  }

  let itemNumber = -1;
  if (itemNumberString?.match(/^\d+$/)) {
    itemNumber = Number.parseInt(itemNumberString);
  }

  return getContainerTemplate(containerTemplateId)?.items[itemNumber];
}

export function getContainerName(
  containerTemplate: ContainerTemplate,
  containerNumber?: number
) {
  if (containerTemplate.quantity && containerTemplate.quantity > 1) {
    return `${containerTemplate.name} - ${containerTemplate.containerType}\u00A0${containerNumber}`;
  }

  return containerTemplate.name;
}

export function getItemDisplayName(item: ItemTemplate | MissingContainerItem) {
  let result = item.name;
  if (item.size) {
    result += ` (${item.size})`;
  }
  return result;
}
