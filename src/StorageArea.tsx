import React from "react";
import "./App.css";
import { BoxTemplate } from "./model/StorageTypes";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function StorageArea() {
  let { storageAreaId } = useParams();

  const getBoxes = (boxTemplate: BoxTemplate) => {
    const boxNumbers = [];
    for (let boxIndex = 1; boxIndex <= boxTemplate.count; boxIndex++) {
      boxNumbers.push(
        <Link
          className="box-number"
          key={`${boxTemplate.boxTemplateId}/${boxIndex}`}
          to={`/box/${boxTemplate.boxTemplateId}/${boxIndex}`}
        >
          {boxIndex}
        </Link>
      );
    }
    return (
      <div className="box" key={boxTemplate.boxTemplateId}>
        <div className="display-name">{`${boxTemplate.name}`}</div>

        <div className="box-numbers">{boxNumbers}</div>
      </div>
    );
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
        <Navbar />
      </footer>
    </div>
  );
}

export default StorageArea;
