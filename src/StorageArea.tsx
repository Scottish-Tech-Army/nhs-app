import React from "react";
import "./App.css";
import { BoxTemplate } from "./data/StorageTypes";
import { TRAUMA_TOWER_TEMPLATE } from "./data/TraumaTower";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as ChecklistIcon } from "./icons/checklist.svg";
// Icon SVGs downloaded from https://fonts.google.com/icons?icon.style=Filled&icon.set=Material+Icons under Apache licence

function StorageArea() {
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
    <div className="storage-area">
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
        <div aria-label="storage area" className="navicon selected">
          <HomeIcon />
          <div>Storage Area</div>
        </div>
        <Link aria-label="summary" to={"/summary"} className="navicon summary">
          <ChecklistIcon />
          <div>Summary</div>
        </Link>
      </footer>
    </div>
  );
}

export default StorageArea;
