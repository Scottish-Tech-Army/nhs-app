import React from "react";
import "./App.css";
import { BoxTemplate } from "./data/StorageTypes";
import { TRAUMA_TOWER_TEMPLATE } from "./data/TraumaTower";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import Navbar from "./Navbar";
// Icon SVGs downloaded from https://fonts.google.com/icons?icon.style=Filled&icon.set=Material+Icons under Apache licence

function Directory() {
  let navigate = useNavigate();

  const getBoxes = (boxTemplate: BoxTemplate) => {
    const result = [];
    for (let boxIndex = 1; boxIndex <= boxTemplate.count; boxIndex++) {
      result.push(
        <div
          className="box"
          key={`${boxTemplate.boxTemplateId}/${boxIndex}`}
          onClick={() =>
            navigate(`/box/${boxTemplate.boxTemplateId}/${boxIndex}`)
          }
        >
          <EditIcon />
          <div className="display-name">{`${boxTemplate.name} - Box ${boxIndex}`}</div>
        </div>
      );
    }
    return result;
  };

  return (
    <div className="directory">
      <header>
        <h1>{TRAUMA_TOWER_TEMPLATE.name}</h1>
      </header>
      <main>
        <div className="scroll">
          {TRAUMA_TOWER_TEMPLATE.boxes.map((boxTemplate) =>
            getBoxes(boxTemplate)
          )}
        </div>
      </main>
      <footer>
        <Navbar />
      </footer>
    </div>
  );
}

export default Directory;
