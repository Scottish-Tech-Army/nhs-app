import React, { useState } from "react";
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

  const [confirmReset, setConfirmReset] = useState(false);

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
          onClick={() => setConfirmReset(true)}
          // onClick={() => dispatch(resetAllBoxContents())}
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
      {confirmReset && (
        <>
          <div className="confirm-reset-popup">
            <h2>Reset</h2>
            <div className="message">
              Reset all boxes to empty - are you sure?
            </div>
            <button
              type="button"
              className="confirm-yes"
              onClick={() => {
                dispatch(resetAllBoxContents());
                setConfirmReset(false);
              }}
            >
              YES
            </button>
            <button
              type="button"
              className="confirm-no"
              onClick={() => setConfirmReset(false)}
            >
              Cancel
            </button>
          </div>
          <div className="modal-overlay" />
        </>
      )}
    </div>
  );
}

export default StorageArea;
