export type ItemTemplate = {
  name: string;
  size?: string;
  description: string;
  location: string;
  photo: string;
  quantity?: number;
};

export type ContainerTemplate = {
  containerTemplateId: string;
  name: string;
  containerType: string;
  items: ItemTemplate[];
  quantity?: number;
};

export type StorageAreaTemplate = {
  storageAreaId: string;
  name: string;
  containers: ContainerTemplate[];
  possibleContainerLocations?: string[];
};

export type StorageAreaGroupTemplate = {
  storageAreaGroupId: string;
  name: string;
  storageAreas: StorageAreaTemplate[];
};

export type MissingContainerItem = {
  name: string;
  size?: string;
  quantity: number;
  location?: string;
};

export type ContainerInputData = {
  checker: string;
  containerTemplateId: string;
  containerNumber?: number;
  storageAreaId: string;
  location?: string;
  name: string;
  missingItems: MissingContainerItem[];
  isFull: boolean;
};

export type ContainerData = ContainerInputData & {
  checkId: string;
  checkTime: string;
};
