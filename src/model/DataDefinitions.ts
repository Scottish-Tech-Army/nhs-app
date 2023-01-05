import {
  ContainerTemplate,
  MissingContainerItem,
  ItemTemplate,
  StorageAreaTemplate,
  StorageAreaGroupTemplate,
} from "./StorageTypes";

// Define items which appear in multiple containers
type PartialItemTemplate = Omit<ItemTemplate, "quantity">;

// Define container templates which have fixed named replicates
type PartialFixedContainerTemplate = Omit<
  ContainerTemplate,
  "containerTemplateId"
>;

export const LOCATIONS = [
  "Resus Stock Cupboard",
  "Resus 1a",
  "Resus 1b",
  "Resus 1c",
  "Resus 2",
  "Ward Clerk's Desk",
];

// Placeholder for missing fields - shouldn't be used in production
const MISSING_FIELDS: Pick<ItemTemplate, "description" | "location" | "photo"> =
  {
    description: "DESCRIPTION",
    location: "LOCATION",
    photo: "PHOTO.jpg",
  };

// Repeated items

const ITEM_09_SALINE_SIZE_250ML: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "0.9% saline",
  size: "250ml",
};

const ITEM_09_SALINE_SIZE_500ML: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "0.9% saline",
  size: "500ml",
};

const ITEM_10ML_SYRINGE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "10ml Syringe",
};

const ITEM_20ML_SYRINGE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "20ml Syringe",
};

const ITEM_50ML_SYRINGE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "50ml Syringe",
};

const ITEM_ARTERIAL_FEMORAL: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Arterial Line Catheter",
  size: "Femoral - 18G x 10cm",
  description: "Vygon leadercath (seldinger) arterial line catheter",
  location: "Resus store XX",
  photo: "vygon.jpg",
};
	
const ITEM_ARTERIAL_RADIAL: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Arterial Line Catheter",
  size: "Radial - 20G x 8cm",
  description: "Vygon leadercath (seldinger) arterial line catheter",
  location: "Resus store XX",
  photo: "vygon.jpg",
};

const ITEM_BITE_BLOCK_SIZE_SMALL: PartialItemTemplate = {
  name: "Bite block",
  size: "Small : White",
  description: "Pair of bite blocks for maxillofacial packing",
  location: "Resus store XX",
  photo: "smallbiteblock.jpg",
};

const ITEM_BITE_BLOCK_SIZE_MEDIUM: PartialItemTemplate = {
  name: "Bite block",
  size: "Medium : Green",
  description: "Pair of bite blocks for maxillofacial packing",
  location: "Resus store XX",
  photo: "mediumbiteblock.jpg",
};

const ITEM_BITE_BLOCK_SIZE_LARGE: PartialItemTemplate = {
  name: "Bite block",
  size: "Large : Orange",
  description: "Pair of bite blocks for maxillofacial packing",
  location: "Resus store XX",
  photo: "largebiteblock.jpg",
};

const ITEM_BLAST_BANDAGES: PartialItemTemplate = {
  name: "Blast bandages",
  description: "Large trauma dressing",
  location: "Resus store XX",
  photo: "blast.jpg",
};

const ITEM_BLUNT_NEEDLE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Blunt Drawing-Up Needle",
  size: "",
  description: "Blunt fill needle with filter for drawing up drugs",
  location: "Resus store XX",
  photo: "blunt-needle.jpg",
};

const ITEM_CATHETER_MOUNT: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Catheter Mount",
  description: "Flexible catheter mount for connecting endotracheal tube/igel to breathing circuit or BVM",
  location: "Resus store XX",
  photo: "catheter-mount.jpg",
};

const ITEM_CAT_TOURNIQUET: PartialItemTemplate = {
  name: "CAT Tourniquet",
  description: "Combat application tourniquet",
  location: "Resus store XX",
  photo: "cat.jpg",
};

const ITEM_CHITO_GAUZE: PartialItemTemplate = {
  name: "Chito Gauze",
  description: "Haemostatic gauze for packing wounds",
  location: "Resus store XX",
  photo: "haemgauze.jpg",
};

const ITEM_CHLORAPREP_APPLICATOR: PartialItemTemplate = {
  name: "ChloraPrep applicator",
  size: "3ml",
  description: "ChloraPrep applicator for disinfecting skin for sterile procedure",
  location: "Resus store XX",
  photo: "chloraprep.jpg",
};

const ITEM_DISPOSABLE_HAT: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Disposable Hat/Cap",
  size: "",
  description: "Disposable theatre hat/cap for sterile procedures",
  location: "Resus store XX",
  photo: "surgical-cap.jpg",
};

const ITEM_DISPOSABLE_MAC_BLADE_SIZE_3: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Disposable Mac Blade",
  size: "3",
  description: "Single use intubation blade for use with disposable laryngoscope",
  photo: "mac-blade.jpg",
};

const ITEM_DISPOSABLE_MAC_BLADE_SIZE_4: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Disposable Mac Blade",
  size: "4",
  description: "Single use intubation blade for use with disposable laryngoscope",
  photo: "mac-blade.jpg",
};

const ITEM_DISPOSABLE_STERILE_GOWN: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Disposable Sterile Gown",
  size: "Medium",
  description: "Disposable single-use sterile gown",
  location: "Resus store XX",
};

const ITEM_DRESSING_PACK: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Dressing pack",
  size: "Medium",
  description: "Universal dressing pack",
  location: "Resus store XX",
  photo: "dressingpack.jpg",
};

const ITEM_ELASTOPLAST_TAPE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Elastoplast tape",
};

const ITEM_EPISTAT: PartialItemTemplate = {
  name: "Epistat",
  description: "Epistat nasal catheter for maxillofacial packing",
  location: "Resus store XX",
  photo: "epistat.jpg",
};

const ITEM_ET_TUBE_SIZE_9: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "ET Tube",
  size: "9.0",
  description: "Endotracheal tube for intubation",
  location: "Resus store XX",
  photo: "ett.jpg",
};

const ITEM_ET_TUBE_SIZE_8: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "ET Tube",
  size: "8.0",
  description: "Endotracheal tube for intubation",
  location: "Resus store XX",
  photo: "ett.jpg",
};

const ITEM_ET_TUBE_SIZE_7: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "ET Tube",
  size: "7.0",
  description: "Endotracheal tube for intubation",
  location: "Resus store XX",
  photo: "ett.jpg",
};

const ITEM_ET_TUBE_SIZE_6: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "ET Tube",
  size: "6.0",
  description: "Endotracheal tube for intubation",
  location: "Resus store XX",
  photo: "ett.jpg",
};

const ITEM_FACE_MASK_SIZE_4: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Face Mask",
  size: "4",
  description: "Face mask for connecting to BVM or C-circuit",
  location: "Resus store XX",
  photo: "face-mask.jpg",
};

const ITEM_FACE_MASK_SIZE_5: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Face Mask",
  size: "5",
  description: "Face mask for connecting to BVM or C-circuit",
  location: "Resus store XX",
  photo: "face-mask.jpg",
};

const ITEM_GAUZE_SWABS: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Gauze Swabs (pack of 5)",
};

const ITEM_GREEN_NEEDLE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Green Needle",
  size: "21g",
  description: "Green single-use hypodermic needle",
  location: "Resus store XX",
  photo: "green-needle.jpg",
};

const ITEM_GUEDEL_AIRWAY_GREEN: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "OPA",
  size: "Green - 2",
  description: "Oropharyngeal airway (Guedel)",
  location: "Resus store XX",
  photo: "opa.jpg",
};

const ITEM_GUEDEL_AIRWAY_ORANGE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "OPA",
  size: "Orange - 3",
  description: "Oropharyngeal airway (Guedel)",
  location: "Resus store XX",
  photo: "opa.jpg",
};

const ITEM_GUEDEL_AIRWAY_RED: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "OPA",
  size: "Red - 4",
  description: "Oropharyngeal airway (Guedel)",
  location: "Resus store XX",
  photo: "opa.jpg",
};

const ITEM_IGEL_SIZE_3: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "i-gel",
  size: "3",
  description: "i-gel supraglottic airway",
  location: "Resus store XX",
  photo: "igel.jpg",
};

const ITEM_IGEL_SIZE_4: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "i-gel",
  size: "4",
  description: "i-gel supraglottic airway",
  location: "Resus store XX",
  photo: "igel.jpg",
};

const ITEM_IGEL_SIZE_5: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "i-gel",
  size: "5",
  description: "i-gel supraglottic airway",
  location: "Resus store XX",
  photo: "igel.jpg",
};

const ITEM_INCO_PAD: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Inco Pad",
  size: "",
  description: "Incontinence pad/sheet",
  location: "Resus store XX",
  photo: "inco-pad.jpg",
};

const ITEM_INVASIVE_DEVICES_BUNDLE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Invasive Devices Procedure Bundle Paperwork",
  size: "",
  description: "Paperwork for documenting insertion of invasive device",
  location: "Resus store XX",
};

const ITEM_LIDOCAINE_VIAL: PartialItemTemplate = {
  name: "Lidocaine 1% vial",
  size: "5ml / 50mg",
  description: "Local anaesthetic",
  location: "Resus store XX",
  photo: "lidocaine.jpg",
};

const ITEM_LUBRICATING_GEL_SACHET: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Lubricating Gel Sachet",
};

const ITEM_MAGILL_FORCEPS: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Magill Forceps",
};

const ITEM_MASK_WITH_VISOR: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Mask with Visor",
  size: "",
  description: "Surgical face mask with visor/eye shield",
  location: "Resus store XX",
  photo: "mask-visor.jpg",
};

const ITEM_MEDIUM_INTRODUCER: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Medium Introducer",
  description: "Intubation stylet",
};

const ITEM_MERSILK_SUTURE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Mersilk Suture",
  size: "1-0",
  description: "Non-absorbable, handheld suture",
  location: "Resus store XX",
  photo: "mersilk.jpg",
};

const ITEM_MODULAR_BANDAGE: PartialItemTemplate = {
  name: "Modular bandage",
  description: "Olaes modular pressure bandage",
  location: "Resus store XX",
  photo: "modular.jpg",
};

const ITEM_MOSQUITO_FORCEPS: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Mosquito Artery Forceps",
  size: "Straight 12.5cm",
  description: "Forceps for clamping blood vessels",
  location: "Resus store XX",
  photo: "mosquito.png",
};

const ITEM_NASOPHARYNGEAL_AIRWAY_SIZE_6: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Nasopharyngeal Airway",
  size: "6.0",
};

const ITEM_NASOPHARYNGEAL_AIRWAY_SIZE_7: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Nasopharyngeal Airway",
  size: "7.0",
};

const ITEM_ORANGE_NEEDLE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Orange Needle",
  size: "25g",
  description: "Orange single-use hypodermic needle",
  location: "Resus store XX",
  photo: "orange-needle.jpg",
};

const ITEM_PRESSURE_BAG: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Pressure Bag",
  size: "1000ml",
  description: "Pressure bag for delivering fluid quickly or pressurising arterial or central line transducer set",
  location: "Resus store XX",
  photo: "pressure-bag.jpg",
};

const ITEM_PRESSURE_TRANSDUCER: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Transducer Set",
  size: "Single",
  description: "Single pressure transducer set for arterial or central line",
  location: "Resus store XX",
  photo: "pressure-transducer.jpg",
};

const ITEM_SKIN_STAPLER: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Skin Stapler",
  description: "Skin stapler for wound closure",
  location: "Resus store XX",
  photo: "stapler.jpg",
};

const ITEM_SODIUM_CHLORIDE_1000ML: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Sodium Chloride 0.9%",
  size: "1000ml",
};

const ITEM_STERILE_GLOVES_SIZE_SMALL: PartialItemTemplate = {
  name: "Sterile gloves",
  size: "Small",
  description: "Small sterile gloves - 1 pair",
  location: "Resus store XX",
  photo: "smallsterilegloves.jpg",
};

const ITEM_STERILE_GLOVES_SIZE_MEDIUM: PartialItemTemplate = {
  name: "Sterile gloves",
  size: "Medium",
  description: "Medium sterile gloves - 1 pair",
  location: "Resus store XX",
  photo: "mediumsterilegloves.jpg",
};

const ITEM_STERILE_GLOVES_SIZE_LARGE: PartialItemTemplate = {
  name: "Sterile gloves",
  size: "Large",
  description: "Large sterile gloves - 1 pair",
  location: "Resus store XX",
  photo: "largesterilegloves.jpg",
};

const ITEM_STANDARD_SUTURE_PACK: PartialItemTemplate = {
  name: "Suture pack",
  size: "Standard",
  description: "Pack of equipment for suturing",
  location: "Resus store XX",
  photo: "standardsuture.jpg",
};

const ITEM_TEGADERM_LARGE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Large Tegaderm",
  size: "10cm x 12cm",
  description: "Large Tegaderm Film dressing for covering device insertion",
  location: "Resus store XX",
  photo: "large-tegaderm.jpg",
};

const ITEM_TUBE_TIE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Tube Tie",
};

const ITEM_ZINC_OXIDE_TAPE: PartialItemTemplate = {
  ...MISSING_FIELDS,
  name: "Roll of zinc oxide tape",
};

// Containers and areas

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
    ITEM_STERILE_GLOVES_SIZE_SMALL,
    ITEM_STERILE_GLOVES_SIZE_MEDIUM,
    ITEM_STERILE_GLOVES_SIZE_LARGE,
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
    { ...ITEM_CHLORAPREP_APPLICATOR, quantity: 2 },
    { ...ITEM_LIDOCAINE_VIAL, quantity: 2 },
    ITEM_STANDARD_SUTURE_PACK,
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
    { ...ITEM_CAT_TOURNIQUET, quantity: 4 },
    { ...ITEM_BLAST_BANDAGES, quantity: 2 },
    { ...ITEM_CHITO_GAUZE, quantity: 2 },
    { ...ITEM_MODULAR_BANDAGE, quantity: 2 },
    { ...ITEM_MOSQUITO_FORCEPS, quantity: 2 },
    ITEM_DRESSING_PACK,
    ITEM_STANDARD_SUTURE_PACK,
    { ...ITEM_MERSILK_SUTURE, quantity: 2 },
    ITEM_SKIN_STAPLER,
  ],
};

export const BOX_MAX_FAX_HAEMORRHAGE: ContainerTemplate = {
  name: "Max Fax Haemorrhage",
  containerTemplateId: "max-fax-haemorrhage",
  containerType: "Box",
  quantity: 3,
  items: [
    ITEM_BITE_BLOCK_SIZE_SMALL,
    ITEM_BITE_BLOCK_SIZE_MEDIUM,
    ITEM_BITE_BLOCK_SIZE_LARGE,
    { ...ITEM_EPISTAT, quantity: 2 },
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
  possibleContainerLocations: LOCATIONS,
};

export const AIRWAY_TROLLEY_TOP: PartialFixedContainerTemplate = {
  name: "Top",
  containerType: "Trolley",
  items: [
    { ...MISSING_FIELDS, name: "Laminated RSI Checklist (June 2021)"},
    ITEM_LUBRICATING_GEL_SACHET,
    ITEM_MEDIUM_INTRODUCER,
    ITEM_NASOPHARYNGEAL_AIRWAY_SIZE_6,
    ITEM_NASOPHARYNGEAL_AIRWAY_SIZE_7,
  ],
};

export const AIRWAY_TROLLEY_DRAWER_A: PartialFixedContainerTemplate = {
  name: "Drawer A - Face mask & Tracheal Intubation",
  containerType: "Drawer",
  items: [
    { ...ITEM_FACE_MASK_SIZE_4, quantity: 2 },
    { ...ITEM_FACE_MASK_SIZE_5, quantity: 2 },
    ITEM_GUEDEL_AIRWAY_GREEN,
    ITEM_GUEDEL_AIRWAY_ORANGE,
    ITEM_GUEDEL_AIRWAY_RED,
    { ...ITEM_ET_TUBE_SIZE_9, quantity: 2 },
    { ...ITEM_ET_TUBE_SIZE_8, quantity: 2 },
    { ...ITEM_ET_TUBE_SIZE_7, quantity: 2 },
    { ...ITEM_ET_TUBE_SIZE_6, quantity: 2 },
    { ...ITEM_DISPOSABLE_MAC_BLADE_SIZE_3, quantity: 1 },
    { ...ITEM_DISPOSABLE_MAC_BLADE_SIZE_4, quantity: 1 },
    { ...ITEM_TUBE_TIE, quantity: 2 },
    ITEM_ZINC_OXIDE_TAPE,
    { ...ITEM_10ML_SYRINGE, quantity: 2 },
    ITEM_MAGILL_FORCEPS,
    { ...ITEM_CATHETER_MOUNT, quantity: 2 },
    { ...MISSING_FIELDS, name: "HME Filter", quantity: 2 },
    { ...MISSING_FIELDS, name: "Small Scissors" },
    { ...ITEM_LUBRICATING_GEL_SACHET, quantity: 4 },
    { ...MISSING_FIELDS, name: "Video Laryngoscope (McGrath)" },
    { ...MISSING_FIELDS, name: "McGrath Blade", size: "3" },
    { ...MISSING_FIELDS, name: "McGrath Blade", size: "4" },
  ],
};

export const AIRWAY_TROLLEY_DRAWER_B: PartialFixedContainerTemplate = {
  name: "Drawer B - Maintaining Oxygenation & SAD",
  containerType: "Drawer",
  items: [
    ITEM_IGEL_SIZE_3,
    ITEM_IGEL_SIZE_4,
    ITEM_IGEL_SIZE_5,
    {
      ...MISSING_FIELDS,
      name: "Flextube Catheter Mount swivel elbow (Bronchoscopy)",
    },
    { ...MISSING_FIELDS, name: "Single use iLMA (LAM Fastrach)", size: "7.0", description:"NB 15mm tube connector loose in packet" },
    ITEM_10ML_SYRINGE,
    ITEM_LUBRICATING_GEL_SACHET,
    { ...ITEM_TUBE_TIE, quantity: 2 },
    ITEM_ZINC_OXIDE_TAPE,
    { ...MISSING_FIELDS, name: "LMA", size: "3" },
    { ...MISSING_FIELDS, name: "LMA", size: "4" },
    { ...MISSING_FIELDS, name: "LMA", size: "5" },
    ITEM_50ML_SYRINGE,
  ],
};

export const AIRWAY_TROLLEY_DRAWER_C: PartialFixedContainerTemplate = {
  name: "Drawer C – Oxygenate by Any Means",
  containerType: "Drawer",
  items: [
    ITEM_GUEDEL_AIRWAY_GREEN,
    ITEM_GUEDEL_AIRWAY_ORANGE,
    ITEM_GUEDEL_AIRWAY_RED,
    ITEM_FACE_MASK_SIZE_4,
    ITEM_FACE_MASK_SIZE_5,
    ITEM_NASOPHARYNGEAL_AIRWAY_SIZE_6,
    ITEM_NASOPHARYNGEAL_AIRWAY_SIZE_7,
  ],
};

export const AIRWAY_TROLLEY_DRAWER_D: PartialFixedContainerTemplate = {
  name: "Drawer D - Front of neck access",
  containerType: "Drawer",
  items: [{ ...MISSING_FIELDS, name: "ScalpelCric – Cricothyrotomy set" }],
};

export const AIRWAY_TROLLEY_DRAWER_E: PartialFixedContainerTemplate = {
  name: "Drawer E",
  containerType: "Drawer",
  items: [
    { ...MISSING_FIELDS, name: "Thermovent O2 Tubing" },
    { ...MISSING_FIELDS, name: "Thermovent Filter" },
    { ...MISSING_FIELDS, name: "Tracheostomy Tube", size: "7.0" },
    { ...MISSING_FIELDS, name: "Tracheostomy Tube", size: "8.0" },
    { ...MISSING_FIELDS, name: "McGrath VL Spare Battery" },
    {
      ...MISSING_FIELDS,
      name: "Laminated Surgical Airway Procedure Checklist",
    },
    {
      ...MISSING_FIELDS,
      name: "Emergency Laryngectomy/Tracheostomy Management Protocol",
    },
    { ...MISSING_FIELDS, name: "Oxford Headrest" },
  ],
};

export const AIRWAY_TROLLEY_DRAWER_E_AIRWAY_BOX: PartialFixedContainerTemplate =
  {
    name: "Drawer E - Surgical Airway Box",
    containerType: "Box",
    items: [
      { ...MISSING_FIELDS, name: "Scalpel", size: "22" },
      { ...MISSING_FIELDS, name: "Tracheal Hook" },
      { ...MISSING_FIELDS, name: "Tracheostomy Tube", size: "6.0" },
      { ...MISSING_FIELDS, name: "Tracheostomy Tie" },
      ITEM_ET_TUBE_SIZE_6,
      ITEM_10ML_SYRINGE,
      ITEM_LIDOCAINE_VIAL,
    ],
  };

export const AIRWAY_TROLLEY_SIDE: PartialFixedContainerTemplate = {
  name: "Side",
  containerType: "Trolley",
  items: [
    { ...MISSING_FIELDS, name: "Aintree Catheter" },
    { ...MISSING_FIELDS, name: "Bougie (Cook Frova)", quantity: 2 },
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
    ITEM_GUEDEL_AIRWAY_GREEN,
    ITEM_GUEDEL_AIRWAY_ORANGE,
    ITEM_GUEDEL_AIRWAY_RED,
    ITEM_NASOPHARYNGEAL_AIRWAY_SIZE_6,
    ITEM_NASOPHARYNGEAL_AIRWAY_SIZE_7,
    { ...ITEM_DISPOSABLE_MAC_BLADE_SIZE_3, quantity: 2 },
    { ...ITEM_DISPOSABLE_MAC_BLADE_SIZE_4, quantity: 2 },
    { ...MISSING_FIELDS, name: "Laryngoscope Handle" },
    ITEM_10ML_SYRINGE,
    ITEM_TUBE_TIE,
    { ...ITEM_LUBRICATING_GEL_SACHET, quantity: 2 },
  ],
};

export const TRANSFER_BAG_FRONT_NET_POCKET: PartialFixedContainerTemplate = {
  name: "Airway (Front Net Pocket)",
  containerType: "Net Pocket",
  items: [
    ITEM_ET_TUBE_SIZE_9,
    ITEM_ET_TUBE_SIZE_8,
    ITEM_MAGILL_FORCEPS,
    ITEM_MEDIUM_INTRODUCER,
    ITEM_CATHETER_MOUNT,
  ],
};

export const TRANSFER_BAG_MIDDLE_POCKET: PartialFixedContainerTemplate = {
  name: "Breathing (Middle Pocket)",
  containerType: "Pocket",
  items: [
    { ...MISSING_FIELDS, name: "Bag-valve-mask with 1500ml reservoir" },
    ITEM_FACE_MASK_SIZE_4,
    ITEM_FACE_MASK_SIZE_5,
    { ...MISSING_FIELDS, name: "High-flow Oxygen Mask and Tubing" },
  ],
};

export const TRANSFER_BAG_BACK_POCKET: PartialFixedContainerTemplate = {
  name: "Circulation (Back Pocket)",
  containerType: "Pocket",
  items: [
    ITEM_SODIUM_CHLORIDE_1000ML,
    { ...MISSING_FIELDS, name: "PlasmaLyte 148 500mls" },
    { ...MISSING_FIELDS, name: "Giving Set", quantity: 2 },
    { ...MISSING_FIELDS, name: "Small Sharps Bin" },
  ],
};

export const TRANSFER_BAG_BACK_POCKET_CANNULATION_GRAB_BAG: PartialFixedContainerTemplate =
  {
    name: "Circulation (Back Pocket) Cannulation Grab Bag",
    containerType: "Bag",
    items: [
      { ...MISSING_FIELDS, name: "Green IV Cannula", size: "18G", quantity: 2 },
      { ...MISSING_FIELDS, name: "Orange IV Cannula", size: "14G", quantity: 2 },
      { ...MISSING_FIELDS, name: "Disposable Tourniquet" },
      { ...MISSING_FIELDS, name: "IV Tegaderm", quantity: 2 },
      { ...MISSING_FIELDS, name: "Alcohol Swabs", quantity: 4 },
    ],
  };

export const TRANSFER_BAG_BACK_POCKET_SYRINGE_GRAB_BAG: PartialFixedContainerTemplate =
  {
    name: "Circulation (Back Pocket) Syringe Grab Bag",
    containerType: "Bag",
    items: [
      { ...ITEM_10ML_SYRINGE, quantity: 2 },
      { ...MISSING_FIELDS, name: "5ml Syringe", quantity: 2 },
      { ...MISSING_FIELDS, name: "2ml Syringe", quantity: 2 },
      { ...MISSING_FIELDS, name: "Green Needles", quantity: 6 },
      {
        ...MISSING_FIELDS,
        name: "Sodium Chloride 0.9% 10ml Ampoules",
        quantity: 4,
      },
    ],
  };

export const TRANSFER_BAG_BACK_NET_POCKETS: PartialFixedContainerTemplate = {
  name: "Circulation (Back Net Pockets)",
  containerType: "Net Pockets",
  items: [
    { ...MISSING_FIELDS, name: "Adrenaline 1mg Minijet", quantity: 3 },
    { ...MISSING_FIELDS, name: "Atropine 1mg Minijet", quantity: 3 },
    { ...MISSING_FIELDS, name: "Glucose 50% Minijet" },
    { ...MISSING_FIELDS, name: "Amiodarone 300mg Minijet" },
    { ...MISSING_FIELDS, name: "Diazemuls 10mg Ampoules (1 box)" },
    { ...MISSING_FIELDS, name: "Naloxone 400mcg (1 box)" },
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
    ITEM_DISPOSABLE_STERILE_GOWN,
    ITEM_STERILE_GLOVES_SIZE_SMALL,
    ITEM_STERILE_GLOVES_SIZE_MEDIUM,
    ITEM_STERILE_GLOVES_SIZE_LARGE,
    ITEM_DISPOSABLE_HAT,
    ITEM_MASK_WITH_VISOR,
    ITEM_INCO_PAD,
    ITEM_CHLORAPREP_APPLICATOR,
    ITEM_LIDOCAINE_VIAL,
    ITEM_BLUNT_NEEDLE,
    ITEM_ORANGE_NEEDLE,
    ITEM_TEGADERM_LARGE,
    ITEM_DRESSING_PACK,
    ITEM_ARTERIAL_RADIAL,
    ITEM_ARTERIAL_FEMORAL,
    ITEM_STANDARD_SUTURE_PACK,
    ITEM_MERSILK_SUTURE,
    ITEM_LIDOCAINE_VIAL,
    ITEM_SODIUM_CHLORIDE_1000ML,
    ITEM_PRESSURE_TRANSDUCER,
    ITEM_PRESSURE_BAG,
    ITEM_INVASIVE_DEVICES_BUNDLE,
      ],
};

export const NG_INSERTION_KIT_BOX: ContainerTemplate = {
  name: "NG Insertion Kit",
  containerType: "Box",
  containerTemplateId: "ng-insertion-kit",
  items: [
    { ...MISSING_FIELDS, name: "Nasogastric tubes", size: "12FG", quantity: 2 },
    { ...MISSING_FIELDS, name: "Nasogastric tubes", size: "14FG", quantity: 2 },
    { ...MISSING_FIELDS, name: "Nasogastric tubes", size: "16FG", quantity: 2 },
    { ...MISSING_FIELDS, name: "Bile bag" },
    { ...MISSING_FIELDS, name: "Spiggot" },
    { ...ITEM_LUBRICATING_GEL_SACHET, quantity: 2 },
    { ...MISSING_FIELDS, name: "pH Paper" },
    { ...MISSING_FIELDS, name: "50ml Catheter tip syringe" },
    { ...MISSING_FIELDS, name: "1 cm Tape" },
    { ...MISSING_FIELDS, name: "Macbic Clamp" },
  ],
};

export const OTHER_PROCEDURES: StorageAreaTemplate = {
  storageAreaId: "other-procedures",
  name: "Other Procedures",
  containers: [A_LINE_BOX, NG_INSERTION_KIT_BOX],
  possibleContainerLocations: LOCATIONS,
};

export const RED_BAG_FRONT_UPPER_POCKET_SURGICAL_POUCH: PartialFixedContainerTemplate =
  {
    name: "Surgical Pouch (Front Upper Pocket)",
    containerType: "Pocket",
    items: [
      { ...MISSING_FIELDS, name: "Skin Stapler" },
      ITEM_ELASTOPLAST_TAPE,
      { ...MISSING_FIELDS, name: "Giggli Saw & Handles" },
      { ...ITEM_GAUZE_SWABS, quantity: 2 },
      { ...MISSING_FIELDS, name: "Foley Catheter", size: "Ch14" },
      { ...MISSING_FIELDS, name: "Sterile Scissors" },
      { ...ITEM_MERSILK_SUTURE, quantity: 2 },
      { ...MISSING_FIELDS, name: "Mayo Scissors" },
      { ...ITEM_CHLORAPREP_APPLICATOR, quantity: 2 },
      { ...MISSING_FIELDS, name: "22G Scalpel", quantity: 2 },
      { ...MISSING_FIELDS, name: "Adult Spencer Wells", quantity: 2 },
      { ...MISSING_FIELDS, name: "Paeds Spencer Wells", quantity: 2 },
      { ...MISSING_FIELDS, name: "Mosquito Forceps" },
      { ...ITEM_STERILE_GLOVES_SIZE_SMALL, quantity: 2 },
      { ...ITEM_STERILE_GLOVES_SIZE_MEDIUM, quantity: 2 },
      { ...ITEM_STERILE_GLOVES_SIZE_LARGE, quantity: 2 },
    ],
  };

export const RED_BAG_FRONT_UPPER_POCKET_MAX_FAX_POUCH: PartialFixedContainerTemplate =
  {
    name: "Max Fax Pouch (Front Upper Pocket)",
    containerType: "Pocket",
    items: [
      ITEM_BITE_BLOCK_SIZE_SMALL,
      ITEM_BITE_BLOCK_SIZE_MEDIUM,
      ITEM_BITE_BLOCK_SIZE_LARGE,
      { ...ITEM_EPISTAT, quantity: 2 },
      ITEM_20ML_SYRINGE,
      { ...MISSING_FIELDS, name: "Blunt Needle" },
      ITEM_09_SALINE_SIZE_250ML,
    ],
  };

export const RED_BAG_FRONT_LOWER_POCKET_BLOOD_CONSUMABLE_POUCH: PartialFixedContainerTemplate =
  {
    name: "Blood Consumable Pouch (Front Lower Pocket)",
    containerType: "Pocket",
    items: [
      { ...MISSING_FIELDS, name: "Buddy lite warmer" },
      { ...MISSING_FIELDS, name: "Buddy lite disposable set", quantity: 2 },
      ITEM_50ML_SYRINGE,
      { ...MISSING_FIELDS, name: "3-way tap", quantity: 4 },
      { ...MISSING_FIELDS, name: "Alco-wipe", quantity: 2 },
    ],
  };

export const RED_BAG_FRONT_LOWER_POCKET_LOOSE_ITEMS: PartialFixedContainerTemplate =
  {
    name: "Loose Items (Front Lower Pocket)",
    containerType: "Pocket",
    items: [
      { ...MISSING_FIELDS, name: "Blood Giving Set", quantity: 2 },
      { ...MISSING_FIELDS, name: "Fluid Giving Set" },
      { ...MISSING_FIELDS, name: "Sodium Chloride 5% 500ml" },
      ITEM_09_SALINE_SIZE_250ML,
      { ...MISSING_FIELDS, name: "RIC Line" },
      { ...ITEM_CAT_TOURNIQUET, quantity: 2 },
      ITEM_CHITO_GAUZE,
      ITEM_BLAST_BANDAGES,
      ITEM_MODULAR_BANDAGE,
    ],
  };

export const RED_BAG_LEFT_UPPER_POCKET: PartialFixedContainerTemplate = {
  name: "Left Side Upper Pocket",
  containerType: "Pocket",
  items: [
    { ...MISSING_FIELDS, name: "Stethoscope" },
    { ...MISSING_FIELDS, name: "Marker Pen", quantity: 2 },
    { ...MISSING_FIELDS, name: "Headtorch", quantity: 2 },
    { ...MISSING_FIELDS, name: "Spare batteries", size: "AAA", quantity: 2 },
  ],
};

export const RED_BAG_LEFT_LOWER_POCKET: PartialFixedContainerTemplate = {
  name: "Left Side Lower Pocket",
  containerType: "Pocket",
  items: [{ ...MISSING_FIELDS, name: "EtCO2 (EMMA) Device" }],
};

export const RED_BAG_RIGHT_POCKET: PartialFixedContainerTemplate = {
  name: "Right Side Pocket",
  containerType: "Pocket",
  items: [
    { ...MISSING_FIELDS, name: "Russsell chest seal", quantity: 2 },
    { ...MISSING_FIELDS, name: "Tegaderm dressing", quantity: 2 },
    { ...MISSING_FIELDS, name: "Chest drain kit" },
    { ...MISSING_FIELDS, name: "Bougie", size: "Ch14/15", quantity: 2 },
    { ...MISSING_FIELDS, name: "Bougie", size: "Ch10" },
    { ...MISSING_FIELDS, name: "Bougie", size: "Ch5" },
  ],
};

export const RED_BAG_MAIN_COMPARTMENT_ADULT_SCRAM: PartialFixedContainerTemplate =
  {
    name: "Adult Scram (Main Compartment)",
    containerType: "Compartment",
    items: [
      ITEM_IGEL_SIZE_4,
      { ...MISSING_FIELDS, name: "Adult McGills" },
      { ...MISSING_FIELDS, name: "Mac 4 with handle" },
      ITEM_20ML_SYRINGE,
      ITEM_CATHETER_MOUNT,
      { ...MISSING_FIELDS, name: "Adult filter" },
      { ...MISSING_FIELDS, name: "Adult calorimetric" },
      { ...MISSING_FIELDS, name: "Corpuls inline CO2" },
      { ...MISSING_FIELDS, name: "Nasal End title CO2" },
      { ...MISSING_FIELDS, name: "Lubricating jelly", quantity: 2 },
      { ...MISSING_FIELDS, name: "Tube tie" },
      { ...MISSING_FIELDS, name: "Mac 3 with handle" },
      { ...MISSING_FIELDS, name: "ETT", size: "8", quantity: 2 },
      { ...MISSING_FIELDS, name: "ETT", size: "7", quantity: 2 },
      { ...MISSING_FIELDS, name: "ETT", size: "6" },
      { ...MISSING_FIELDS, name: "NGT", size: "Fr16" },
      { ...MISSING_FIELDS, name: "NGT bag" },
      { ...MISSING_FIELDS, name: "NG spiggot", quantity: 2 },
      ITEM_IGEL_SIZE_3,
      ITEM_IGEL_SIZE_5,
      { ...MISSING_FIELDS, name: "RSI Checklist" },
      { ...MISSING_FIELDS, name: "Large stylet" },
      { ...MISSING_FIELDS, name: "NPA", size: "6" },
      { ...MISSING_FIELDS, name: "NPA", size: "7" },
      ITEM_ELASTOPLAST_TAPE,
      { ...MISSING_FIELDS, name: "OPA", size: "2" },
      { ...MISSING_FIELDS, name: "OPA", size: "3" },
      { ...MISSING_FIELDS, name: "OPA", size: "4" },
      { ...MISSING_FIELDS, name: "Thomas Tube holder" },
      { ...MISSING_FIELDS, name: "Tracheostomy Kit" },
      { ...MISSING_FIELDS, name: "22G Scalpel" },
      { ...MISSING_FIELDS, name: "Clinical waste bag" },
      { ...MISSING_FIELDS, name: "McGrath Handle" },
      { ...MISSING_FIELDS, name: "VL Mac 3 Blade" },
      { ...MISSING_FIELDS, name: "VL Mac 4 Blade" },
      { ...MISSING_FIELDS, name: "Spare Battery" },
    ],
  };

export const RED_BAG_MAIN_COMPARTMENT_PAEDIATRIC_SCRAM: PartialFixedContainerTemplate =
  {
    name: "Paediatric Scram (Main Compartment)",
    containerType: "Compartment",
    items: [
      { ...MISSING_FIELDS, name: "Paeds handle with Mac 1" },
      ITEM_20ML_SYRINGE,
      { ...MISSING_FIELDS, name: "Small stylet" },
      { ...MISSING_FIELDS, name: "Paeds calorimetric" },
      { ...MISSING_FIELDS, name: "Small catheter mount" },
      { ...MISSING_FIELDS, name: "Lubricating jelly", quantity: 2 },
      { ...MISSING_FIELDS, name: "Corpuls inline CO2" },
      { ...MISSING_FIELDS, name: "Paeds handle with Mac 3" },
      { ...MISSING_FIELDS, name: "Paeds filter" },
      { ...MISSING_FIELDS, name: "5ml Syringe" },
      { ...MISSING_FIELDS, name: "Bougie", size: "10" },
      { ...MISSING_FIELDS, name: "Bougie", size: "5" },
      { ...MISSING_FIELDS, name: "Paeds Yankeur" },
      { ...MISSING_FIELDS, name: "Soft suction catheter", size: "6" },
      { ...MISSING_FIELDS, name: "Soft suction catheter", size: "10" },
      { ...MISSING_FIELDS, name: "Mapleson F Circuit" },
      { ...MISSING_FIELDS, name: "RSI checklist" },
      { ...MISSING_FIELDS, name: "Age per page cards" },
      { ...MISSING_FIELDS, name: "Sterile scissors" },
      ITEM_ELASTOPLAST_TAPE,
      { ...MISSING_FIELDS, name: "ETT", size: "6.5" },
      { ...MISSING_FIELDS, name: "ETT", size: "6" },
      { ...MISSING_FIELDS, name: "ETT", size: "5.5" },
      { ...MISSING_FIELDS, name: "ETT", size: "5" },
      { ...MISSING_FIELDS, name: "ETT", size: "4.5" },
      { ...MISSING_FIELDS, name: "ETT", size: "4" },
      { ...MISSING_FIELDS, name: "ETT", size: "3.5" },
      { ...MISSING_FIELDS, name: "ETT", size: "3" },
      { ...MISSING_FIELDS, name: "ETT (uncuffed)", size: "2.5" },
      { ...MISSING_FIELDS, name: "VL Mac 3 blade" },
      { ...MISSING_FIELDS, name: "VL Mac 2 blade" },
      { ...MISSING_FIELDS, name: "VL Mac 1 blade" },
      { ...MISSING_FIELDS, name: "Mac 2 blade" },
      { ...MISSING_FIELDS, name: "Mac 0 blade" },
      { ...MISSING_FIELDS, name: "Miller 1 blade" },
      { ...MISSING_FIELDS, name: "R'Shaw 0 blade" },
      { ...MISSING_FIELDS, name: "OPA", size: "2" },
      { ...MISSING_FIELDS, name: "OPA", size: "1" },
      { ...MISSING_FIELDS, name: "OPA", size: "0" },
      { ...MISSING_FIELDS, name: "OPA", size: "00" },
      { ...MISSING_FIELDS, name: "OPA", size: "000" },
      { ...MISSING_FIELDS, name: "NGT", size: "10Fr" },
      { ...MISSING_FIELDS, name: "Enteral Syringe 60ml" },
      ITEM_ELASTOPLAST_TAPE,
      { ...MISSING_FIELDS, name: "i-gel", size: "2.5" },
      { ...MISSING_FIELDS, name: "i-gel", size: "2" },
      { ...MISSING_FIELDS, name: "i-gel", size: "1.5" },
      { ...MISSING_FIELDS, name: "i-gel", size: "1" },
      { ...MISSING_FIELDS, name: "Broslow tape" },
    ],
  };

export const RED_BAG_1: StorageAreaTemplate = {
  storageAreaId: "red-bag-1",
  name: "Red Bag 1",
  containers: [
    {
      ...RED_BAG_FRONT_UPPER_POCKET_SURGICAL_POUCH,
      containerTemplateId: "red-bag-1-front-surgical",
    },
    {
      ...RED_BAG_FRONT_UPPER_POCKET_MAX_FAX_POUCH,
      containerTemplateId: "red-bag-1-front-max-fax",
    },
    {
      ...RED_BAG_FRONT_LOWER_POCKET_BLOOD_CONSUMABLE_POUCH,
      containerTemplateId: "red-bag-1-front-blood",
    },
    {
      ...RED_BAG_FRONT_LOWER_POCKET_LOOSE_ITEMS,
      containerTemplateId: "red-bag-1-front-loose",
    },
    {
      ...RED_BAG_LEFT_UPPER_POCKET,
      containerTemplateId: "red-bag-1-left-upper",
    },
    {
      ...RED_BAG_LEFT_LOWER_POCKET,
      containerTemplateId: "red-bag-1-left-lower",
    },
    {
      ...RED_BAG_RIGHT_POCKET,
      containerTemplateId: "red-bag-1-right",
    },
    {
      ...RED_BAG_MAIN_COMPARTMENT_ADULT_SCRAM,
      containerTemplateId: "red-bag-1-main-adult",
    },
    {
      ...RED_BAG_MAIN_COMPARTMENT_PAEDIATRIC_SCRAM,
      containerTemplateId: "red-bag-1-main-paediatric",
    },
  ],
};

export const BLACK_BAG_MAIN_COMPARTMENT_TOP_FLAP: PartialFixedContainerTemplate =
  {
    name: "Top Flap (Main Compartment)",
    containerType: "Compartment",
    items: [
      ITEM_09_SALINE_SIZE_500ML,
      { ...MISSING_FIELDS, name: "Giving Set" },
    ],
  };

export const BLACK_BAG_MAIN_COMPARTMENT_SUCTION: PartialFixedContainerTemplate =
  {
    name: "Suction (Main Compartment)",
    containerType: "Compartment",
    items: [
      { ...MISSING_FIELDS, name: "LCSU incl canister" },
      { ...MISSING_FIELDS, name: "Suction tubing" },
      { ...MISSING_FIELDS, name: "Adult Yankeur" },
    ],
  };

export const BLACK_BAG_MAIN_COMPARTMENT_HAEMORRHAGE_CONTROL: PartialFixedContainerTemplate =
  {
    name: "Haemorrhage Control (Main Compartment)",
    containerType: "Compartment",
    items: [
      ITEM_MODULAR_BANDAGE,
      ITEM_BLAST_BANDAGES,
      { ...MISSING_FIELDS, name: "Tourniquet", quantity: 2 },
      { ...MISSING_FIELDS, name: "Haemostatic Gauze" },
      { ...ITEM_GAUZE_SWABS, quantity: 2 },
      { ...MISSING_FIELDS, name: "Triangular bandage" },
      { ...MISSING_FIELDS, name: "Tape", quantity: 2 },
    ],
  };

export const BLACK_BAG_MAIN_COMPARTMENT_ACCESS_IO: PartialFixedContainerTemplate =
  {
    name: "Access IO (Main Compartment)",
    containerType: "Compartment",
    items: [
      { ...MISSING_FIELDS, name: "EZ-IO power driver" },
      { ...MISSING_FIELDS, name: "Chloroprep", size: "Small", quantity: 2 },
      {
        ...MISSING_FIELDS,
        name: "Needle & stabiliser dressing",
        size: "15mm : Pink",
        quantity: 2,
      },
      {
        ...MISSING_FIELDS,
        name: "Needle & stabiliser dressing",
        size: "25mm : Blue",
        quantity: 2,
      },
      {
        ...MISSING_FIELDS,
        name: "Needle & stabiliser dressing",
        size: "45mm : Yellow",
        quantity: 2,
      },
      { ...MISSING_FIELDS, name: "3 way tap" },
      { ...MISSING_FIELDS, name: "Syringe 50ml (luer lock)" },
    ],
  };

export const BLACK_BAG_MAIN_COMPARTMENT_ACCESS_IV: PartialFixedContainerTemplate =
  {
    name: "Access IV (Main Compartment)",
    containerType: "Compartment",
    items: [
      { ...MISSING_FIELDS, name: "Disposable tourniquet", quantity: 2 },
      { ...MISSING_FIELDS, name: "Chloroprep", size: "Small", quantity: 4 },
      { ...MISSING_FIELDS, name: "Cannula dressing", quantity: 2 },
      ITEM_GAUZE_SWABS,
      { ...MISSING_FIELDS, name: "Tape" },
      { ...MISSING_FIELDS, name: "Cannula", size: "24G : Yellow", quantity: 2 },
      { ...MISSING_FIELDS, name: "Cannula", size: "22G : Blue", quantity: 2 },
      { ...MISSING_FIELDS, name: "Cannula", size: "20G : Pink", quantity: 2 },
      { ...MISSING_FIELDS, name: "Cannula", size: "18G : Green", quantity: 2 },
      { ...MISSING_FIELDS, name: "Cannula", size: "16G : Grey", quantity: 2 },
      { ...MISSING_FIELDS, name: "Cannula", size: "14G : Orange", quantity: 2 },
    ],
  };

export const BLACK_BAG_MAIN_COMPARTMENT_BOTTOM_SECTION: PartialFixedContainerTemplate =
  {
    name: "Bottom Section (Main Compartment)",
    containerType: "Compartment",
    items: [
      { ...MISSING_FIELDS, name: "Adult HFM" },
      { ...MISSING_FIELDS, name: "Paediatric HFM" },
      { ...MISSING_FIELDS, name: "Nasal Cannula" },
      { ...MISSING_FIELDS, name: "Mask", size: "1" },
      { ...MISSING_FIELDS, name: "Mask", size: "2" },
      { ...MISSING_FIELDS, name: "Mask", size: "3" },
      { ...MISSING_FIELDS, name: "Mask", size: "4" },
      { ...MISSING_FIELDS, name: "Mask", size: "5" },
      { ...MISSING_FIELDS, name: "Adult BVM with clear mask" },
    ],
  };

export const BLACK_BAG_LEFT_POCKET: PartialFixedContainerTemplate = {
  name: "Left Side Pocket",
  containerType: "Pocket",
  items: [
    { ...MISSING_FIELDS, name: "Pelvic Binder (Prometheus)" },
    { ...MISSING_FIELDS, name: "Adult C Spine Collar" },
    { ...MISSING_FIELDS, name: "Paeds C Spine Collar" },
  ],
};

export const BLACK_BAG_RIGHT_POCKET: PartialFixedContainerTemplate = {
  name: "Right Side Pocket",
  containerType: "Pocket",
  items: [{ ...MISSING_FIELDS, name: "Paeds BVM with clear mask" }],
};

export const BLACK_BAG_1: StorageAreaTemplate = {
  storageAreaId: "black-bag-1",
  name: "Black Bag (First Responder) 1",
  containers: [
    {
      ...BLACK_BAG_MAIN_COMPARTMENT_TOP_FLAP,
      containerTemplateId: "black-bag-1-main-top",
    },
    {
      ...BLACK_BAG_MAIN_COMPARTMENT_SUCTION,
      containerTemplateId: "black-bag-1-main-suction",
    },
    {
      ...BLACK_BAG_MAIN_COMPARTMENT_HAEMORRHAGE_CONTROL,
      containerTemplateId: "black-bag-1-main-haemmorrhage",
    },
    {
      ...BLACK_BAG_MAIN_COMPARTMENT_ACCESS_IO,
      containerTemplateId: "black-bag-1-main-access-io",
    },
    {
      ...BLACK_BAG_MAIN_COMPARTMENT_ACCESS_IV,
      containerTemplateId: "black-bag-1-main-access-iv",
    },
    {
      ...BLACK_BAG_MAIN_COMPARTMENT_BOTTOM_SECTION,
      containerTemplateId: "black-bag-1-main-bottom",
    },
    {
      ...BLACK_BAG_LEFT_POCKET,
      containerTemplateId: "black-bag-1-left",
    },
    {
      ...BLACK_BAG_RIGHT_POCKET,
      containerTemplateId: "black-bag-1-right",
    },
  ],
};

export const AIRWAY_TROLLEYS: StorageAreaGroupTemplate = {
  name: "Airway Trolleys",
  storageAreaGroupId: "airway-trolleys",
  storageAreas: [
    AIRWAY_TROLLEY_1,
    AIRWAY_TROLLEY_2,
    AIRWAY_TROLLEY_3,
    AIRWAY_TROLLEY_4,
  ],
};

export const TRANSFER_BAGS: StorageAreaGroupTemplate = {
  name: "Transfer Bags",
  storageAreaGroupId: "transfer-bags",
  storageAreas: [
    TRANSFER_BAG_1,
    TRANSFER_BAG_2,
    TRANSFER_BAG_3,
    TRANSFER_BAG_4,
    TRANSFER_BAG_5,
    TRANSFER_BAG_6,
  ],
};

export const RED_BAGS: StorageAreaGroupTemplate = {
  name: "Medic 1 - Red Bags",
  storageAreaGroupId: "red-bags",
  storageAreas: [RED_BAG_1],
};

export const BLACK_BAGS: StorageAreaGroupTemplate = {
  name: "Medic 1 - Black Bags",
  storageAreaGroupId: "black-bags",
  storageAreas: [BLACK_BAG_1],
};

export const DIRECTORY: (StorageAreaTemplate | StorageAreaGroupTemplate)[] = [
  TRAUMA_TOWER,
  AIRWAY_TROLLEYS,
  TRANSFER_BAGS,
  OTHER_PROCEDURES,
  RED_BAGS,
  BLACK_BAGS,
];

function listStorageAreas() {
  const result: StorageAreaTemplate[] = [];
  DIRECTORY.forEach((item) => {
    if ((item as any).storageAreaGroupId) {
      result.push(...(item as StorageAreaGroupTemplate).storageAreas);
    } else {
      result.push(item as StorageAreaTemplate);
    }
  });
  return result;
}

const STORAGE_AREAS: StorageAreaTemplate[] = listStorageAreas();

export function getStorageArea(storageAreaId: string) {
  return STORAGE_AREAS.find(
    (storageArea) => storageArea.storageAreaId === storageAreaId
  );
}

export function getStorageAreaGroup(
  storageAreaGroupId: string
): StorageAreaGroupTemplate {
  return DIRECTORY.find(
    (storageArea) =>
      (storageArea as any).storageAreaGroupId === storageAreaGroupId
  ) as StorageAreaGroupTemplate;
}

export function getGroupForStorageArea(storageAreaId: string) {
  return DIRECTORY.find(
    (item) =>
      (item as any).storageAreaGroupId &&
      (item as StorageAreaGroupTemplate).storageAreas.find(
        (storageArea) => storageArea.storageAreaId === storageAreaId
      )
  ) as StorageAreaGroupTemplate | undefined;
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
