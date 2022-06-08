import React, { useState } from 'react';


function InputCard(props) {

        // const [amount, setAmount] = useState('')
        let handleChange = (i, e) => {
            let newFormValues = [...formValues];
            newFormValues[i][e.target.name] = e.target.value;
            setFormValues(newFormValues);
          }

    return (
        <div>
            <label>{props.name}</label>
            <input key={props.id}
                type="number"
                max="10"
                min="1"
                step="1"
                value={"0"}  
                onChange={e => handleChange(index, e)}
            />
        </div>
    )
}

export default InputCard;