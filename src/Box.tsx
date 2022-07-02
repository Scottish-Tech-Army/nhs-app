import React, { FormEvent, useEffect, useState } from "react";
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

const clone = rfdc();

function Box() {
  let { boxTemplateId, boxId } = useParams();
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

  let handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newBoxContents = clone(boxContents)!;
    itemCounts?.forEach(
      (count, index) => (newBoxContents.items[index].quantity = count)
    );

    dispatch(setBoxContents(newBoxContents));
    navigate("/");
  };

  function getItem(itemTemplate: ItemTemplate, index: number) {
    const expectedQuantity = itemTemplate.quantity || 1;
    const actualQuantity = itemCounts![index];
    // TODO are too many items bad?
    const enoughItems = actualQuantity - expectedQuantity >= 0;

    return (
      <div className="item" key={index}>
        <div className="display-name">{getItemDisplayName(itemTemplate)}</div>
        <button
          type="button"
          className="item-details"
          onClick={() => navigate(`/item/${boxTemplateId}/${index}`)}
        >
          i
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
          onClick={() =>
            setItemCounts((itemCounts) => {
              const result = [...itemCounts!];
              result![index] = Math.max(0, result![index] - 1);
              return result;
            })
          }
          disabled={itemCounts![index] === 0}
        >
          -
        </button>
        <button
          type="button"
          className="change-quantity"
          onClick={() =>
            setItemCounts((itemCounts) => {
              const result = [...itemCounts!];
              result![index] = result![index] + 1;
              return result;
            })
          }
        >
          +
        </button>
      </div>
    );
  }

  if (!boxTemplate) {
    return null;
  }

  return (
    <div className="box-details">
      <h1>{getBoxName(boxTemplate!.name, boxContents!.boxNumber)}</h1>
      <button
        type="button"
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
        Filled
      </button>
      <form onSubmit={handleSubmit}>
        {boxTemplate?.items.map(getItem)}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Box;
