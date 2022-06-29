import React from 'react';
import './App.css';
import storageAreaContents from "./data/traumaTower.json";

function StorageArea() {
  return (
    <div>
      <h1>{storageAreaContents.name}</h1>
      <ul>
        {storageAreaContents.boxes.map((box) => (
          <li key={box.boxId} >
            <a href={`/box/${box.boxId}`}>{box.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StorageArea;
