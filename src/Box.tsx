import React, { FormEvent, useState } from "react";
import { TRAUMA_TOWER_TEMPLATE } from "./data/traumaTower";
import { useParams } from "react-router-dom";

export type FormValueType = {
  name: string;
  count: number;
};

export interface BoxProps {
  setBoxContents: (boxTemplateId: string, boxNumber: number, contents: FormValueType[]) => void;
}

function Box({ setBoxContents }: BoxProps) {

//init variables
  //destructure nested routes from useParams  
  let { boxTemplateId, boxId } = useParams();
  //init boxTemplate var finding boxTemplateId from TRAUMA_TOWER_TEMPLATE Doc
  const boxTemplate = TRAUMA_TOWER_TEMPLATE.boxes.find(
    (box) => box.boxTemplateId === boxTemplateId
  );
  //init var of mapped items in template creating obj of name and count/amount of each
  const startingArrayOfObjects: FormValueType[] =
      boxTemplate?.items.map(({ name }) => ({ name, count: 0 })) || [];
  //init- useState hook using mapped items stored as init value  
  const [formValues, setFormValues] = useState<FormValueType[]>(
    startingArrayOfObjects
  );
  //init boxNumber to zero   
    let boxNumber = 0;
  //check boxId matches string of starting digit/end digit  
    //parse boxId as Int
    //it should so continue(maybe integrate fail condition?)
  if (boxId?.match(/^\d+$/)) {
    boxNumber = Number.parseInt(boxId);
  }
  //check- no boxTemplate OR boxNumber less than 1 OR boxNumber is more than boxTemplate count/value
    //if true return null (probably should return Error)
    //if false continue
  if (!boxTemplate || boxNumber < 1 || boxNumber > boxTemplate.count) {
    return null;
  }

  //Functions for storing form values on user input- form change/submit
    //handle change- capture change to useState, set change to setFormValues
        //init- form new form values to array
        //process values to Int
        //set to form values state
  let handleChange = (index: number, target: HTMLInputElement) => {
    let newFormValues = [...formValues];

    newFormValues[index].count = Number.parseInt(target!.value);

    setFormValues(newFormValues);
  };

   //handleSubmit- pass router values and inputted state values  
        //handle browser event to keep inputted data
        //pass router values and inputted form values to setBoxContents function
  let handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBoxContents(boxTemplateId!, boxNumber, formValues);
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
