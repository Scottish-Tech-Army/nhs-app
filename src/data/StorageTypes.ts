export type ItemTemplate = {
  name: string;
  size?: string;
  description: string;
  location: string;
  photo: string;
  quantity?: number;
};

export type BoxTemplate = {
  boxTemplateId: string;
  name: string;
  items: ItemTemplate[];
  count: number;
};

export type StorageAreaTemplate = {
  storageAreaId: string;
  name: string;
  boxes: BoxTemplate[];
};

export type ItemContents = {
  name: string;
  size?: string;
  quantity: number;
};

export type BoxContents = {
  boxTemplateId: string;
  boxNumber: number;
  items: ItemContents[];
};

export type StorageAreaContents = {
  storageAreaId: string;
  boxes: BoxContents[];
};

export type ItemShoppingList = ItemContents;

export type BoxShoppingList = {
  boxTemplateId: string;
  boxNumber: number;
  name: string;
  items: ItemShoppingList[];
};
