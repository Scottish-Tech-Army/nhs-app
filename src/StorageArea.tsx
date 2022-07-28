import React from "react";
import "./App.css";
import { ContainerTemplate } from "./model/StorageTypes";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { getStorageArea } from "./model/DataDefinitions";

function StorageArea() {
  let { storageAreaId } = useParams();
  let storageArea = getStorageArea(storageAreaId!);

  const getContainers = (containerTemplate: ContainerTemplate) => {
    const containerQuantity = containerTemplate.quantity ?? 1;

    if (containerQuantity === 1) {
      return (
        <Link
          className="single-container"
          key={containerTemplate.containerTemplateId}
          to={`/container/${storageAreaId}/${containerTemplate.containerTemplateId}/1`}
        >
          {containerTemplate.name}
        </Link>
      );
    }

    const containerNumbers = [];
    for (
      let containerIndex = 1;
      containerIndex <= containerQuantity;
      containerIndex++
    ) {
      containerNumbers.push(
        <Link
          className="container-number"
          key={`${containerTemplate.containerTemplateId}/${containerIndex}`}
          to={`/container/${storageAreaId}/${containerTemplate.containerTemplateId}/${containerIndex}`}
        >
          {containerIndex}
        </Link>
      );
    }
    return (
      <div
        className="multiple-container"
        key={containerTemplate.containerTemplateId}
      >
        <div className="display-name">{`${containerTemplate.name}`}</div>

        <div className="container-numbers">{containerNumbers}</div>
      </div>
    );
  };

  if (!storageArea) {
    return null;
  }

  return (
    <div className="storage-area">
      <header>
        <h1>{storageArea.name}</h1>
      </header>
      <main>
        <div className="scroll">
          {storageArea.containers.map((containerTemplate) =>
            getContainers(containerTemplate)
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
