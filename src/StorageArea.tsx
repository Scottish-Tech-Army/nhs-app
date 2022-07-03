import React from "react";
import "./App.css";
import { BoxTemplate } from "./data/StorageTypes";
import { TRAUMA_TOWER_TEMPLATE } from "./data/TraumaTower";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import { ReactComponent as RestartIcon } from "./icons/refresh.svg";
import { resetAllBoxContents } from "./data/BoxContentsSlice";
import { useAppDispatch } from "./data/store";

function StorageArea() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getBoxes = (boxTemplate: BoxTemplate) => {
    const result = [];
    for (let boxIndex = 1; boxIndex <= boxTemplate.count; boxIndex++) {
      const boxId = `${boxTemplate.boxTemplateId}/${boxIndex}`;
      result.push(
        <div className="box" key={boxId}>
          <button
            type="button"
            className="check-box"
            aria-label="check box"
            onClick={() =>
              navigate(`/box/${boxTemplate.boxTemplateId}/${boxIndex}`)
            }
          >
            <EditIcon />
          </button>
          <div className="display-name">{`${boxTemplate.name} - Box ${boxIndex}`}</div>
        </div>
      );
    }
    return result;
  };

  // TODO - need a confirm on the restart button
  return (
    <div className="storage-area">
      <header>
        <h1>{TRAUMA_TOWER_TEMPLATE.name}</h1>
        <button
          type="button"
          className="restart"
          aria-label="restart"
          onClick={() => dispatch(resetAllBoxContents())}
        >
          <RestartIcon />
        </button>
      </header>
      <main>
        <div className="scroll">
          {TRAUMA_TOWER_TEMPLATE.boxes.map((boxTemplate) =>
            getBoxes(boxTemplate)
          )}
        </div>
      </main>
      <footer>
        <Link to={"/needed"} className="needed">
          Items needed
        </Link>
      </footer>
    </div>
  );
}

export default StorageArea;
