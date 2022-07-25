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

export type EIMissingBoxItem = {
  name: string;
  size?: string;
  quantity: number;
};

export type EIBoxInput = {
  checker: string;
  boxTemplateId: string;
  boxNumber: number;
  name: string;
  missingItems: EIMissingBoxItem[];
  isFull: boolean;
};

export type EIBox = EIBoxInput & {
  checkId: string;
  checkTime: string;
};
