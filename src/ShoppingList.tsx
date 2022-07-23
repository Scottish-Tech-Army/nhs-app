import { format, parseISO } from "date-fns";
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
  const [loading, setLoading] = useState<boolean>(true);
  const partiallyFullBoxes = boxes.filter((box) => !box.isFull);

  useEffect(() => {
    fetch(BOXES_API_ENDPONT)
      .then((response) => response.json())
      .then((data) => {
        setBoxes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setBoxes([]);
      });
  }, []);

  useAppSelector(getAreaContents);
  let navigate = useNavigate();

  function getDisplayTime(isoDateTime: string) {
    const timestamp = parseISO(isoDateTime)
    return format(timestamp, "EEE d/M/yyyy 'at' HH:mm")
  }

  function getBoxShoppingList(box: EIBox, index: number) {
    return (
      <div key={index} className="box">
        <div>
        <h2>{`${box.name} - Box ${box.boxNumber}`}</h2>
        <div className="checker">{`Checked by ${box.checker} on ${getDisplayTime(box.checkTime)}`}</div>
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
          aria-label="back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </button>
        <h1>Summary</h1>
      </header>
      <main>
        {loading ? (
          <div>Fetching Items</div>
        ) : partiallyFullBoxes.length ? (
          <div className="scroll">
            {partiallyFullBoxes.map(getBoxShoppingList)}
          </div>
        ) : (
          <div className="nothing-to-replace">No Items</div>
        )}
      </main>
    </div>
  );
}

export default ShoppingList;
