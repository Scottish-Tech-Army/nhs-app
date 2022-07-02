import React from "react";
import "./App.css";
import { BoxTemplate } from "./data/StorageTypes";
import { TRAUMA_TOWER_TEMPLATE } from "./data/TraumaTower";
import {  Link } from "react-router-dom";

const getBoxes = (boxTemplate: BoxTemplate) => {
  const result = [];
  for (let boxIndex = 1; boxIndex <= boxTemplate.count; boxIndex++) {
    const boxId = `${boxTemplate.boxTemplateId}/${boxIndex}`;
    result.push(
      <li key={boxId}>
         <Link to={`/box/${boxTemplate.boxTemplateId}/${boxIndex}`}>{`${boxTemplate.name} - Box ${boxIndex}`}</Link>
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
      <Link to={"/needed"}>Items needed</Link>
    </div>
  );
}

export default StorageArea;
