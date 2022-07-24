import React, { useEffect, useState } from "react";
import {
  getBoxName,
  getItemDisplayName,
  TRAUMA_TOWER_TEMPLATE,
} from "./model/TraumaTower";
import { useNavigate, useParams } from "react-router-dom";
import {
  BoxTemplate,
  EIBoxInput,
  EIMissingBoxItem,
  ItemTemplate,
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
): EIMissingBoxItem | undefined {
  const quantityToGet = (itemTemplate.quantity || 1) - currentQuantity;

  return quantityToGet > 0
    ? {
        name: itemTemplate.name,
        size: itemTemplate.size,
        quantity: quantityToGet,
      }
    : undefined;
}

function calculateBoxMissingItems(
  boxTemplate: BoxTemplate,
  boxNumber: number,
  itemCounts: number[],
  currentUser: string
): EIBoxInput {
  const missingItems = boxTemplate?.items
    .map((itemTemplate, index) =>
      calculateMissingItem(itemTemplate, itemCounts[index])
    )
    .filter(Boolean) as EIMissingBoxItem[];

  return {
    boxTemplateId: boxTemplate.boxTemplateId,
    boxNumber,
    name: boxTemplate.name,
    missingItems,
    isFull: !missingItems.length,
    checker: currentUser,
  };
}

function Box() {
  let { boxTemplateId, boxId } = useParams();
  let navigate = useNavigate();

  let boxNumber = 0;
  if (boxId?.match(/^\d+$/)) {
    boxNumber = Number.parseInt(boxId);
  }

  const currentUser = useAppSelector(getUser);

  const [boxTemplate, setBoxTemplate] = useState<BoxTemplate>();
  const [itemCounts, setItemCounts] = useState<number[]>();

  useEffect(() => {
    const boxTemplate = TRAUMA_TOWER_TEMPLATE.boxes.find(
      (box) => box.boxTemplateId === boxTemplateId
    );
    if (boxTemplate) {
      setBoxTemplate(boxTemplate);
      setItemCounts(boxTemplate.items.map(() => 0));
    } else {
      setBoxTemplate(undefined);
      setItemCounts([]);
    }
  }, [boxTemplateId, boxNumber]);

  async function handleSubmit() {
    await Auth.currentSession()
      .then((session) =>
        fetch(CHECK_API_ENDPONT, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
          },
          body: JSON.stringify(
            calculateBoxMissingItems(
              boxTemplate!,
              boxNumber,
              itemCounts!,
              currentUser!.name
            )
          ),
        })
      )
      .then(({ status }) => status === 200 && navigate("/"));
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
            boxTemplateId: boxTemplate!.boxTemplateId,
            boxNumber,
            name: boxTemplate!.name,
            missingItems: [],
            isFull: true,
            checker: currentUser!.name,
          }),
        })
      )
      .then(({ status }) => status === 200 && navigate("/"));
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
    // TODO are too many items bad?
    const enoughItems = actualQuantity - expectedQuantity >= 0;

    return (
      <div className="item" key={index}>
        <div className="display-name">{getItemDisplayName(itemTemplate)}</div>
        <div className="controls">
          <button
            type="button"
            className="item-info"
            aria-label="item information"
            onClick={() => navigate(`/item/${boxTemplateId}/${index}`)}
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

  if (!boxTemplate || boxNumber <= 0 || boxNumber > boxTemplate.count) {
    return null;
  }

  return (
    <div className="box-details">
      <header>
        <h1>{getBoxName(boxTemplate!.name, boxNumber)}</h1>
        <button
          type="button"
          className="back"
          aria-label="Back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </button>
        <button type="button" className="full" onClick={handleClickFull}>
          FULL
        </button>
      </header>
      <main>
        <div className="scroll">{boxTemplate?.items.map(getItem)}</div>
      </main>
      <footer>
        <button type="button" className="save" onClick={handleSubmit}>
          Save
        </button>
      </footer>
    </div>
  );
}

export default Box;
