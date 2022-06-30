import React, { FormEvent, useState } from "react";
import { StorageAreaType } from "./data/StorageTypes";

export type FormValueType = {
  name: string;
  count: number;
};
export interface BoxProps {
  boxId: string;
  storageAreaContents: StorageAreaType;
  setBoxContents: (boxId: string, contents: FormValueType[]) => void;
}

function Box({ boxId, storageAreaContents, setBoxContents }: BoxProps) {
  const box = storageAreaContents.boxes.find((box) => box.boxId === boxId);

  const startingArrayOfObjects: FormValueType[] =
    box?.items.map(({ name }) => ({ name, count: 0 })) || [];
  const [formValues, setFormValues] = useState<FormValueType[]>(
    startingArrayOfObjects
  );

  if (box === undefined) {
    return null;
  }

  let handleChange = (index: number, target: HTMLInputElement) => {
    let newFormValues = [...formValues];

    newFormValues[index].count = Number.parseInt(target!.value);

    setFormValues(newFormValues);
  };

  let handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBoxContents(boxId, formValues);
  };

  return (
    <div>
      <h1>{box.name}</h1>

      <form onSubmit={handleSubmit}>
        <ul>
          {box.items.map((item, index) => (
            <li key={index}>
              <label>
                {item.name}
                <input
                  name={item.name}
                  type="number"
                  max="10"
                  min="0"
                  step="1"
                  value={formValues[index].count || 0}
                  onChange={({ target }) => handleChange(index, target)}
                />
              </label>
            </li>
          ))}
        </ul>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Box;
