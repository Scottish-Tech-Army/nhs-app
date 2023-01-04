import React, { useEffect, useState } from "react";
import {
  getContainerName,
  getContainerTemplate,
  getItemDisplayName,
  getStorageArea,
} from "./model/DataDefinitions";
import { useNavigate, useParams } from "react-router-dom";
import {
  ContainerTemplate,
  ContainerInputData,
  MissingContainerItem,
  ItemTemplate,
  StorageAreaTemplate,
} from "./model/StorageTypes";
import { useAppSelector } from "./model/store";
import "./App.css";
import { ReactComponent as ArrowLeft } from "./icons/arrow-left.svg";
import { ReactComponent as InfoCircle } from "./icons/info-circle.svg";
import { ReactComponent as Plus } from "./icons/add.svg";
import { ReactComponent as Minus } from "./icons/minus.svg";
import { Auth } from "@aws-amplify/auth";
import { getUser } from "./model/auth/AuthSlice";

// Icons vuesax linear. Licence: https://iconsax.io/#license

const CHECK_API_ENDPONT = `${process.env.REACT_APP_INVENTORY_API_ENDPOINT}check`;

function calculateMissingItem(
  itemTemplate: ItemTemplate,
  currentQuantity: number
): MissingContainerItem | undefined {
  const quantityToGet = (itemTemplate.quantity || 1) - currentQuantity;

  return quantityToGet > 0
    ? {
        name: itemTemplate.name,
        size: itemTemplate.size,
        location: itemTemplate.location,
        quantity: quantityToGet,
      }
    : undefined;
}

function calculateContainerMissingItems(
  storageArea: StorageAreaTemplate,
  containerTemplate: ContainerTemplate,
  containerNumber: number,
  itemCounts: number[],
  currentUser: string,
  location: string | undefined
): ContainerInputData {
  const missingItems = containerTemplate?.items
    .map((itemTemplate, index) =>
      calculateMissingItem(itemTemplate, itemCounts[index])
    )
    .filter(Boolean) as MissingContainerItem[];

  return {
    containerTemplateId: containerTemplate.containerTemplateId,
    containerNumber,
    storageAreaId: storageArea?.storageAreaId,
    name: containerTemplate.name,
    missingItems,
    isFull: !missingItems.length,
    checker: currentUser,
    location,
  };
}

function Container() {
  const { storageAreaId, containerTemplateId, containerNumber } = useParams();
  const navigate = useNavigate();

  let containerNumberValue = 0;
  if (containerNumber?.match(/^\d+$/)) {
    containerNumberValue = Number.parseInt(containerNumber);
  }

  const currentUser = useAppSelector(getUser);

  const [storageArea, setStorageArea] = useState<StorageAreaTemplate>();
  const [containerTemplate, setContainerTemplate] =
    useState<ContainerTemplate>();
  const [itemCounts, setItemCounts] = useState<number[]>();
  const [location, setLocation] = useState<string>();

  useEffect(() => {
    const currentStorageArea = getStorageArea(storageAreaId!);
    setLocation(undefined);
    setStorageArea(currentStorageArea);
    const currentContainerTemplate = getContainerTemplate(containerTemplateId!);

    if (currentContainerTemplate) {
      setContainerTemplate(currentContainerTemplate);
      setItemCounts(currentContainerTemplate.items.map(() => 0));
    } else {
      setContainerTemplate(undefined);
      setItemCounts([]);
    }
  }, [storageAreaId, containerTemplateId, containerNumberValue]);

  const isMultipleLocation = !!storageArea?.possibleContainerLocations;

  async function handleSubmit() {
    await Auth.currentSession()
      .then((session) =>
        fetch(CHECK_API_ENDPONT, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
          },
          body: JSON.stringify(
            calculateContainerMissingItems(
              storageArea!,
              containerTemplate!,
              containerNumberValue,
              itemCounts!,
              currentUser!.name,
              location
            )
          ),
        })
      )
      .then(
        ({ status }) =>
          status === 200 && navigate(`/area/${storageArea?.storageAreaId}`)
      );
  }

  async function handleClickFull() {
    await Auth.currentSession()
      .then((session) =>
        fetch(CHECK_API_ENDPONT, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
          },
          body: JSON.stringify({
            containerTemplateId: containerTemplate!.containerTemplateId,
            containerNumber: containerNumberValue,
            storageAreaId: storageArea?.storageAreaId,
            name: containerTemplate!.name,
            missingItems: [],
            isFull: true,
            checker: currentUser!.name,
          }),
        })
      )
      .then(
        ({ status }) =>
          status === 200 && navigate(`/area/${storageArea?.storageAreaId}`)
      );
  }

  function preventExtraClickEvents(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    functionToCall: () => void
  ) {
    // Repeated fast clicks were being counted more than once
    event.detail === 1 && functionToCall();
  }

  function getItem(itemTemplate: ItemTemplate, index: number) {
    const expectedQuantity = itemTemplate.quantity || 1;
    const actualQuantity = itemCounts![index];
    const enoughItems = actualQuantity - expectedQuantity >= 0;

    return (
      <div className="item" key={index}>
        <div className="display-name">{getItemDisplayName(itemTemplate)}</div>
        <div className="controls">
          <button
            type="button"
            className="item-info"
            aria-label="item information"
            onClick={() => navigate(`/item/${containerTemplateId}/${index}`)}
          >
            <InfoCircle />
          </button>
          <div className="quantity">
            <span
              className={
                enoughItems ? "actual-quantity-good" : "actual-quantity-bad"
              }
            >
              {itemCounts![index]}
            </span>
            <span>{` / `}</span>
            <span className="expected-quantity">
              {itemTemplate.quantity || 1}
            </span>
          </div>
          <button
            type="button"
            className="change-quantity"
            aria-label="remove item"
            onClick={(event) =>
              preventExtraClickEvents(event, () =>
                setItemCounts((itemCounts) => {
                  const result = [...itemCounts!];
                  result![index] = Math.max(0, result![index] - 1);
                  return result;
                })
              )
            }
            disabled={itemCounts![index] === 0}
          >
            <Minus />
          </button>
          <button
            type="button"
            className="change-quantity"
            aria-label="add item"
            onClick={(event) =>
              preventExtraClickEvents(event, () =>
                setItemCounts((itemCounts) => {
                  const result = [...itemCounts!];
                  result![index] = result![index] + 1;
                  return result;
                })
              )
            }
          >
            <Plus />
          </button>
        </div>
      </div>
    );
  }

  const getLocationListbox = () => (
    <div className="container-locations">
      <label htmlFor="location">Location</label>
      <select
        name="location"
        id="location"
        value={location}
        onChange={({ target }) => setLocation(target.value)}
      >
          <option key="undefined" value="">
            Choose a location
          </option>
        {storageArea!.possibleContainerLocations!.map((current, index) => (
          <option key={index} value={current}>
            {current}
          </option>
        ))}
      </select>
    </div>
  );

  const containerQuantity = containerTemplate?.quantity ?? 1;

  if (
    !storageArea ||
    !containerTemplate ||
    containerNumberValue <= 0 ||
    containerNumberValue > containerQuantity
  ) {
    return null;
  }

  return (
    <div className={`container-details ${isMultipleLocation ? "with-location" : ""}`}>
      <header>
        <h1>
          {storageArea.name}
          <br />
          {getContainerName(containerTemplate!, containerNumberValue)}
        </h1>
        <button
          type="button"
          className="back"
          aria-label="back"
          onClick={() => navigate(`/area/${storageArea?.storageAreaId}`)}
        >
          <ArrowLeft />
        </button>
        <button type="button" className="full" onClick={handleClickFull}>
          FULL
        </button>
      </header>
      <main>
        <div className="scroll">{containerTemplate?.items.map(getItem)}</div>
      </main>
      <footer>
        {isMultipleLocation && getLocationListbox()}
        <button type="button" className="save" onClick={handleSubmit} disabled={isMultipleLocation && !location}>
          Save
        </button>
      </footer>
    </div>
  );
}

export default Container;
