import React from "react";
import { getAreaContents } from "./data/BoxContentsSlice";
import {
  BoxContents,
  BoxShoppingList,
  BoxTemplate,
  ItemContents,
  ItemShoppingList,
  ItemTemplate,
  StorageAreaContents,
} from "./data/StorageTypes";
import { useAppSelector } from "./data/store";
import {
  getBoxName,
  getItemDisplayName,
  TRAUMA_TOWER_TEMPLATE,
} from "./data/TraumaTower";

export type FormValueType = {
  name: string;
  count: number;
};

function calculateItemShoppingList(
  itemTemplate: ItemTemplate,
  boxContents: BoxContents
): ItemShoppingList | undefined {
  const currentQuantity =
    boxContents.items.find(
      (itemContents) =>
        itemTemplate.name === itemContents.name &&
        itemTemplate.size === itemContents.size
    )?.quantity || 0;
  const quantityToGet = (itemTemplate.quantity || 1) - currentQuantity;

  return quantityToGet > 0
    ? {
        name: itemTemplate.name,
        size: itemTemplate.size,
        quantity: quantityToGet,
      }
    : undefined;
}

function calculateBoxShoppingList(
  boxTemplate: BoxTemplate,
  boxNumber: number,
  areaContents: StorageAreaContents
): BoxShoppingList | undefined {
  const boxContents = areaContents.boxes.find(
    (boxContents) =>
      boxContents.boxNumber === boxNumber &&
      boxContents.boxTemplateId === boxTemplate.boxTemplateId
  ) || {
    boxTemplateId: boxTemplate.boxTemplateId,
    boxNumber,
    items: [],
  };

  const itemsToGet = boxTemplate?.items
    .map((itemTemplate) => calculateItemShoppingList(itemTemplate, boxContents))
    .filter(Boolean) as ItemContents[];

  return itemsToGet.length
    ? {
        boxTemplateId: boxTemplate.boxTemplateId,
        boxNumber,
        name: getBoxName(boxTemplate.name, boxNumber),
        items: itemsToGet,
      }
    : undefined;
}

function calculateAreaShoppingList(
  areaContents: StorageAreaContents
): BoxShoppingList[] {
  const areaShoppingList: (BoxShoppingList | undefined)[] = [];
  TRAUMA_TOWER_TEMPLATE.boxes.forEach((boxTemplate) => {
    for (let boxNumber = 1; boxNumber <= boxTemplate.count; boxNumber++) {
      areaShoppingList.push(
        calculateBoxShoppingList(boxTemplate, boxNumber, areaContents)
      );
    }
  });

  return areaShoppingList.filter(Boolean) as BoxShoppingList[];
}

function ShoppingList() {
  const areaContents = useAppSelector(getAreaContents);

  const areaShoppingList = calculateAreaShoppingList(areaContents);

  function getBoxShoppingList(boxShoppingList: BoxShoppingList, index: number) {
    return (
      <div key={index} className="box">
        <div>
          <h2>{boxShoppingList.name}</h2>
        </div>

        <dl>
          {boxShoppingList.items.map((item, index) => (
            <div key={index}>
              <dt>{getItemDisplayName(item)}</dt>
              <dd>{item.quantity}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <div>
      <h1>Items to replace</h1>

      {areaShoppingList.length ? (
        areaShoppingList.map(getBoxShoppingList)
      ) : (
        <div>Nothing to replace</div>
      )}
    </div>
  );
}

export default ShoppingList;
