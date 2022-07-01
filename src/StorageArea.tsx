import React from "react";
import "./App.css";
import storageAreaContents from "./data/traumaTower.json";
import {  Link } from "react-router-dom";


function StorageArea() {
  return (
    <>
      <h1>{storageAreaContents.name}</h1>
      <ul>
        {storageAreaContents.boxes.map((box, index) => (
          <li key={index}>
          <Link to={`/box/${box.boxId}`}>{box.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default StorageArea;
