import { StorageAreaType } from "./StorageTypes";

export const TRAUMA_TOWER_TEMPLATE: StorageAreaType = {
  storageAreaId: "0",
  name: "Trauma Tower",
  boxes: [
    {
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
          name: "Chest drain catheter 28Fr",
          size: "28Fr",
          description: "Chest drain catheter - 28Fr",
          location: "Resus store XX",
          photo: "pleuralcatheter.jpg",
        },
        {
          name: "Chest drain catheter 32Fr",
          size: "32Fr",
          description: "Chest drain catheter",
          location: "Resus store XX",
          photo: "pleuralcatheter.jpg",
        },
        {
          name: "Chest drain catheter 36Fr",
          size: "36Fr",
          description: "Chest drain catheter",
          location: "Resus store XX",
          photo: "pleuralcatheter.jpg",
        },
        {
          name: "ChloraPrep applicator",
          size: "n/a",
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
          size: "n/a",
          description: "Chest drain bottle for draining air and blood",
          location: "Resus store XX",
          photo: "chestdrainbottle.jpg",
        },
        {
          name: "Chest drain tubing",
          size: "n/a",
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
    },
  ],
};
