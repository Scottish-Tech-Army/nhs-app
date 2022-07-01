import React, { FormEvent, useState } from "react";
import { TRAUMA_TOWER_TEMPLATE } from "./data/traumaTower";
import { useParams } from "react-router-dom";

export type FormValueType = {
  name: string;
  count: number;
};
export interface BoxProps {
  setBoxContents: (boxId: string, contents: FormValueType[]) => void;
}

function Box({ setBoxContents }: BoxProps) {
  let { boxTemplateId, boxId } = useParams();


  const boxTemplate = TRAUMA_TOWER_TEMPLATE.boxes.find((box) => box.boxTemplateId === boxTemplateId);

  const startingArrayOfObjects: FormValueType[] =
  boxTemplate?.items.map(({ name }) => ({ name, count: 0 })) || [];
  const [formValues, setFormValues] = useState<FormValueType[]>(
    startingArrayOfObjects
  );

  if (boxTemplate === undefined) {
    return null;
  }

  let handleChange = (index: number, target: HTMLInputElement) => {
    let newFormValues = [...formValues];

    newFormValues[index].count = Number.parseInt(target!.value);

    setFormValues(newFormValues);
  };

  let handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBoxContents(boxId!, formValues);
  };

  return (
    <div>
      <h1>{`${boxTemplate.name} - Box ${boxId}`}</h1>

      <form onSubmit={handleSubmit}>
        <ul>
          {boxTemplate.items.map((item, index) => (
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
