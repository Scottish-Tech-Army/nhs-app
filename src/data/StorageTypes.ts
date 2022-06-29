export type StorageAreaItemType = {
  name: string;
  size?: string;
  description: string;
  location: string;
  photo?: string;
  quantity?: number;
};

export type StorageAreaBoxType = {
  boxId: string;
  name: string;
  items: StorageAreaItemType[];
};

export type StorageAreaType = {
  rackId: string;
  name: string;
  boxes: StorageAreaBoxType[];
};
