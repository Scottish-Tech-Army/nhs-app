import React from "react";
import "./App.css";
import { StorageAreaBoxTemplate } from "./data/StorageTypes";
import { TRAUMA_TOWER_TEMPLATE } from "./data/traumaTower";
import {  Link } from "react-router-dom";


//Function getBoxes- create a list of links with dynamic nested routes
  //init result variable
  //use count boxIndex and boxTemplate.count to iterate
  //init boxId of route path
  //push Links to result
  //return result
const getBoxes = (boxTemplate: StorageAreaBoxTemplate) => {
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

//Component- StorageArea map over boxes in TRAUMA_TOWER_TEMPLATE
  //call getBoxes with boxTemplate passed to render list of dynamically routed links
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
