import { Auth } from "@aws-amplify/auth";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { ContainerData } from "./model/StorageTypes";
import {
  getContainerName,
  getContainerTemplate,
  getItemDisplayName,
  getStorageArea,
} from "./model/DataDefinitions";

import Navbar from "./Navbar";

export type FormValueType = {
  name: string;
  count: number;
};

const CONTAINERS_API_ENDPONT = `${process.env.REACT_APP_INVENTORY_API_ENDPOINT}containers`;

function MissingItems() {
  const [containers, setContainers] = useState<ContainerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const partiallyFullContainers = containers.filter(
    (container) => !container.isFull
  );

  useEffect(() => {
    Auth.currentSession()
      .then((session) =>
        fetch(CONTAINERS_API_ENDPONT, {
          headers: {
            Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
          },
        })
      )
      .then((response) => response.json())
      .then((data) => {
        setContainers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setContainers([]);
      });
  }, []);

  function getDisplayTime(isoDateTime: string) {
    const timestamp = parseISO(isoDateTime);
    return format(timestamp, "EEE d/M/yyyy HH:mm");
  }

  function getContainerMissingItems(container: ContainerData, index: number) {
    const containerTemplate = getContainerTemplate(
      container.containerTemplateId
    );

    if (!containerTemplate) {
      console.error(
        "Container template not found: ",
        container.containerTemplateId
      );
      return null;
    }

    const storageArea = getStorageArea(container.storageAreaId);

    if (!storageArea) {
      console.error("Storage area not found: ", container.storageAreaId);
      return null;
    }

    return (
      <div key={index} className="container">
        <div>
          <h2>
            {storageArea.name}
            <br />
            {getContainerName(containerTemplate, container.containerNumber)}
          </h2>
          {!!container.location && (
            <div className="location">Location: {container.location}</div>
          )}
          <div className="checker">{`Checked: ${getDisplayTime(
            container.checkTime
          )} by ${container.checker}`}</div>
        </div>

        <div className="items">
          {container.missingItems.map((item, index) => (
            <div key={index} className="item">
              {`${item.quantity} x ${getItemDisplayName(item)}`}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="missing-items-list">
      <header>
        <h1>Missing Items</h1>
      </header>
      <main>
        {loading ? (
          <div>Fetching Items</div>
        ) : partiallyFullContainers.length ? (
          <div className="scroll">
            {partiallyFullContainers.map(getContainerMissingItems)}
          </div>
        ) : (
          <div className="nothing-to-replace">No Items</div>
        )}
      </main>
      <footer>
        <Navbar />
      </footer>
    </div>
  );
}

export default MissingItems;
