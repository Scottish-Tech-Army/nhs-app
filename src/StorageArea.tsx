import React from "react";
import "./App.css";
import { StorageAreaBoxTemplate } from "./data/StorageTypes";
import { TRAUMA_TOWER_TEMPLATE } from "./data/traumaTower";

const getBoxes = (boxTemplate: StorageAreaBoxTemplate) => {
  const result = [];
  for (let boxIndex = 1; boxIndex <= boxTemplate.count; boxIndex++) {
    const boxId = `${boxTemplate.boxTemplateId}/${boxIndex}`;
    result.push(
      <li key={boxId}>
        <a href={`/box/${boxId}`}>{`${boxTemplate.name} - Box ${boxIndex}`}</a>
      </li>
    );
  }
  return result;
};

function StorageArea() {
  return (
    <div>
      <h1>{TRAUMA_TOWER_TEMPLATE.name}</h1>
      <ul>
        {TRAUMA_TOWER_TEMPLATE.boxes.map((boxTemplate) =>
          getBoxes(boxTemplate)
        )}
      </ul>
    </div>
  );
}

export default StorageArea;
