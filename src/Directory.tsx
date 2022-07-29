import React from "react";
import "./App.css";
import { BoxTemplate } from "./model/StorageTypes";
import { STORAGE_AREAS } from "./model/TraumaTower";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import Navbar from "./Navbar";

function Directory() {
  let navigate = useNavigate();

  return (
    <div className="directory">
      <header>
        <h1>Directory</h1>
      </header>
      <main>
        <div className="scroll">
          {STORAGE_AREAS.map((storageArea, index) => (
            <div
              className="single-storage-area"
              key={index}
              onClick={() =>
                navigate(`/area/${storageArea.storageAreaId}`)
              }
            >
              <EditIcon />
              <div className="display-name">{storageArea.name}</div>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <Navbar />
      </footer>
    </div>
  );
}

export default Directory;
