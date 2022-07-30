import React from "react";
import "./App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { getStorageAreaGroup } from "./model/DataDefinitions";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import { ReactComponent as ArrowLeft } from "./icons/arrow-left.svg";

function StorageAreaGroup() {
  let { storageAreaGroupId } = useParams();
  const navigate = useNavigate();

  let storageAreaGroup = getStorageAreaGroup(storageAreaGroupId!);

  if (!storageAreaGroup) {
    return null;
  }

  return (
    <div className="storage-area-group">
      <header>
        <h1>{storageAreaGroup.name}</h1>
        <button
          type="button"
          className="back"
          aria-label="back"
          onClick={() => navigate("/")}
        >
          <ArrowLeft />
        </button>
      </header>
      <main>
        <div className="scroll">
          {storageAreaGroup.storageAreas.map((storageArea, index) => (
            <Link
              className="single-storage-area"
              key={index}
              to={`/area/${storageArea.storageAreaId}`}
            >
              <EditIcon />
              <div className="display-name">{storageArea.name}</div>
            </Link>
          ))}
        </div>
      </main>
      <footer>
        <Navbar />
      </footer>
    </div>
  );
}

export default StorageAreaGroup;
