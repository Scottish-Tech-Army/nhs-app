import React from "react";
import "./App.css";
import { BoxTemplate } from "./model/StorageTypes";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { getStorageArea } from "./model/TraumaTower";

function StorageArea() {
  let { storageAreaId } = useParams();
  let storageArea = getStorageArea(storageAreaId!);
 
  const getBoxes = (boxTemplate: BoxTemplate) => {
    const boxNumbers = [];
    for (let boxIndex = 1; boxIndex <= boxTemplate.count; boxIndex++) {
      boxNumbers.push(
        <Link
          className="box-number"
          key={`${boxTemplate.boxTemplateId}/${boxIndex}`}
          to={`/box/${storageAreaId}/${boxTemplate.boxTemplateId}/${boxIndex}`}
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

  if (!storageArea) {
    return null;
  };

  return (
    <div className="storage-area">
      <header>
        <h1>{storageArea.name}</h1>
      </header>
      <main>
        <div className="scroll">
          {storageArea.boxes.map((boxTemplate) =>
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
