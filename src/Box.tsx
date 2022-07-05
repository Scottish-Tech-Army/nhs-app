import React, { useEffect, useState } from "react";
import {
  getBoxName,
  getItemDisplayName,
  TRAUMA_TOWER_TEMPLATE,
} from "./data/TraumaTower";
import { useNavigate, useParams } from "react-router-dom";
import { BoxTemplate, ItemTemplate } from "./data/StorageTypes";
import { getBoxContents, setBoxContents } from "./data/BoxContentsSlice";
import rfdc from "rfdc";
import { useAppDispatch, useAppSelector } from "./data/store";
import "./App.css";
import { ReactComponent as ArrowLeft } from "./icons/arrow-left.svg";
import { ReactComponent as InfoCircle } from "./icons/info-circle.svg";
import { ReactComponent as Plus } from "./icons/add.svg";
import { ReactComponent as Minus } from "./icons/minus.svg";

// Icons vuesax linear. Licence: https://iconsax.io/#license

const clone = rfdc();

function Box() {
  //init variables
  //destructure nested routes from useParams 
        let {boxTemplateId, boxId} = useParams();
      
  let navigate = useNavigate();

  const boxContents = useAppSelector(getBoxContents(boxTemplateId, boxId));
  const dispatch = useAppDispatch();

  const [boxTemplate, setBoxTemplate] = useState<BoxTemplate>();
  const [itemCounts, setItemCounts] = useState<number[]>();

  useEffect(() => {
    if (boxContents) {
      setBoxTemplate(
        TRAUMA_TOWER_TEMPLATE.boxes.find(
          (box) => box.boxTemplateId === boxContents.boxTemplateId
        )
      );

      setItemCounts(boxContents.items.map((item) => item.quantity));
    } else {
      setBoxTemplate(undefined);
      setItemCounts([]);
    }
  }, [boxContents]);

  let handleSubmit = () => {
    const newBoxContents = clone(boxContents)!;
    itemCounts?.forEach(
      (count, index) => (newBoxContents.items[index].quantity = count)
    );

    dispatch(setBoxContents(newBoxContents));
    navigate("/");
  };

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

  if (!boxTemplate) {
    return null;
  }

  return (
    <div className="box-details">
      <header>
        <h1>{getBoxName(boxTemplate!.name, boxContents!.boxNumber)}</h1>
        <button
          type="button"
          className="back"
          aria-label="Back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          className="full"
          onClick={() => {
            const newBoxContents = clone(boxContents)!;
            boxTemplate.items.forEach(
              ({ quantity }, index) =>
                (newBoxContents.items[index].quantity = quantity || 1)
            );

            dispatch(setBoxContents(newBoxContents));
            navigate("/");
          }}
        >
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
