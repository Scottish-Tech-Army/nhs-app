import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAreaContents } from "./data/BoxContentsSlice";
import { EIBox } from "./data/StorageTypes";
import { useAppSelector } from "./data/store";
import { getItemDisplayName } from "./data/TraumaTower";
import { ReactComponent as ArrowLeft } from "./icons/arrow-left.svg";

export type FormValueType = {
  name: string;
  count: number;
};

const BOXES_API_ENDPONT = `${process.env.REACT_APP_INVENTORY_API_ENDPOINT}boxes`;

function ShoppingList() {
  const [boxes, setBoxes] = useState<EIBox[]>([]);

  useEffect(() => {
    fetch(BOXES_API_ENDPONT)
      .then((response) => response.json())
      .then(setBoxes)
      .catch((error) => {
        console.error(error);
        setBoxes([]);
      });
  }, []);

  useAppSelector(getAreaContents);
  let navigate = useNavigate();

  function getBoxShoppingList(box: EIBox, index: number) {
    return (
      <div key={index} className="box">
        <div>
          <h2>{`${box.name} - Box ${box.boxNumber}`}</h2>
        </div>

        <div className="items">
          {box.missingItems.map((item, index) => (
            <div key={index} className="item">
              {`${item.quantity} x ${getItemDisplayName(item)}`}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-list">
      <header>
        <button
          type="button"
          className="back"
          aria-label="Back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </button>
        <h1>Items to replace</h1>
      </header>
      <main>
        {boxes.length ? (
          <div className="scroll">
            {boxes.filter((box) => !box.isFull).map(getBoxShoppingList)}
          </div>
        ) : (
          <div className="nothing-to-replace">Nothing to replace</div>
        )}
      </main>
    </div>
  );
}

export default ShoppingList;
