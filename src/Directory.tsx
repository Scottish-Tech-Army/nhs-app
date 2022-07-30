import React from "react";
import "./App.css";
import { DIRECTORY } from "./model/DataDefinitions";
import { Link } from "react-router-dom";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import Navbar from "./Navbar";
import {
  StorageAreaGroupTemplate,
  StorageAreaTemplate,
} from "./model/StorageTypes";

function Directory() {
  function renderDirectoryItem(
    item: StorageAreaTemplate | StorageAreaGroupTemplate,
    index: number
  ) {
    const path = (item as any).storageAreaId
      ? `/area/${(item as StorageAreaTemplate).storageAreaId}`
      : `/areas/${(item as StorageAreaGroupTemplate).storageAreaGroupId}`;

    return (
      <Link className="single-storage-area" key={index} to={path}>
        <EditIcon />
        <div className="display-name">{item.name}</div>
      </Link>
    );
  }

  return (
    <div className="directory">
      <header>
        <h1>Directory</h1>
      </header>
      <main>
        <div className="scroll">{DIRECTORY.map(renderDirectoryItem)}</div>
      </main>
      <footer>
        <Navbar />
      </footer>
    </div>
  );
}

export default Directory;
