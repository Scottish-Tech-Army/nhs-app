import Form from '../UI/form/form';


function BoxesContents(props) {

    const { thirdLevel, boxID, storageAreaID } = props;
    
    return (
        <ul>
        {thirdLevel[storageAreaID].boxes[boxID].items.map((item) => {
        return (
            <ul>
                <li key={item.id} >
                    <h1>
                        {item.name}
                    </h1>
                </li>
            </ul>
        )
 })
}    
</ul> 
    )
} 

export default BoxesContents;

/* 

        <Form thirdLevel={thirdLevel} boxID={boxID} storageAreaID={storageAreaID}/>

*/