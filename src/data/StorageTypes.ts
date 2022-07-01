export type StorageAreaItemType = {
  name: string;
  size?: string;
  description: string;
  location: string;
  photo?: string;
  quantity?: number;
};

export type StorageAreaBoxTemplate = {
  boxTemplateId: string;
  name: string;
  items: StorageAreaItemType[];
  count: number;
};

export type StorageAreaBoxType = {
  boxId: string;
  name: string;
  items: StorageAreaItemType[];
};

export type StorageAreaType = {
  storageAreaId: string;
  name: string;
  boxes: StorageAreaBoxTemplate[];
};
