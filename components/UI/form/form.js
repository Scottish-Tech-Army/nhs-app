
import { useState } from "react";

function Form(props) {

    const { thirdLevel, boxID, storageAreaID } = props;

    const startingArrayOfObjects = thirdLevel[storageAreaID].boxes[boxID].items.map(({name}) => (
        { [name] : 0 })
    )

    const [formValues, setFormValues] = useState(
        startingArrayOfObjects
    );

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];

           newFormValues[i][e.target.name] = e.target.value

        setFormValues(newFormValues);
    }

    
    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
            <div>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {thirdLevel[storageAreaID].boxes[boxID].items.map((item, index) => {
                            return (
                                <div key={index}>
                                    <label>{item.name}</label>
                                    <input
                                        name={item.name}
                                        type="number"
                                        max="10"
                                        min="0"
                                        step="1"
                                        value={formValues[index][item.name] || 0}  
                                        onChange={e => handleChange(index, e)}
                                    />
                                </div>
                            )
                        })
                        }    
                    </ul>
                        <div>
                            <button type="submit" >Submit</button>
                        </div>
                </form>
            </div>
    )
}

export default Form;

