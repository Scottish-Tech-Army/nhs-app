import Link from 'next/link';
import Card from '../UI/card/Card';


function StorageAreaList(props) {

    const { firstLevel } = props;
 
    return (
        <ul>
            {firstLevel.map((item) => {
                return (
                    <Card key={item.id}>
                    <Link href={'storage-area/' + item.id}  >{item.name}</Link>
                    </Card>
                )
            })
            }
       </ul>
    )
} 

export default StorageAreaList;