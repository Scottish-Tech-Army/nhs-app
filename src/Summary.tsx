import { Auth } from "@aws-amplify/auth";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { ContainerData } from "./model/StorageTypes";
import {
  getContainerName,
  getContainerTemplate,
  getItemDisplayName,
} from "./model/DataDefinitions";

import Navbar from "./Navbar";

export type FormValueType = {
  name: string;
  count: number;
};

const CONTAINERS_API_ENDPONT = `${process.env.REACT_APP_INVENTORY_API_ENDPOINT}containers`;

function Summary() {
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
    return format(timestamp, "EEE d/M/yyyy 'at' HH:mm");
  }

  function getContainerShoppingList(container: ContainerData, index: number) {
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

    return (
      <div key={index} className="container">
        <div>
          <h2>
            {getContainerName(containerTemplate, container.containerNumber)}
          </h2>
          <div className="checker">{`Checked by ${
            container.checker
          } on ${getDisplayTime(container.checkTime)}`}</div>
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
    <div className="summary-list">
      <header>
        <h1>Summary</h1>
      </header>
      <main>
        {loading ? (
          <div>Fetching Items</div>
        ) : partiallyFullContainers.length ? (
          <div className="scroll">
            {partiallyFullContainers.map(getContainerShoppingList)}
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

export default Summary;
