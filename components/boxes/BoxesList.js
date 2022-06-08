import Link from 'next/link';
import Card from '../UI/card/Card';


function BoxesList(props) {

    const { secondLevel, storageAreaID } = props;
    
    
    return (
        <ul>
            {secondLevel[storageAreaID].boxes.map((item) => {
                    return (
                        <Card key={item.id}>
                            <Link href={`${storageAreaID}/` + item.id}  >{item.name}</Link>
                        </Card>
                    )
             })
        }    
       </ul>
    )
} 

export default BoxesList;