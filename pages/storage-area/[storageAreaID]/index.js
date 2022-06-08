import { useRouter } from 'next/router';
import BoxesList from '../../../components/boxes/BoxesList';
import data from '../../api/testData.json'


function StorageAreaId() {
    const router = useRouter();
    const storageAreaID = router.query.storageAreaID;



    return (
        <div>
            <BoxesList
                secondLevel={data}
                storageAreaID={storageAreaID}
            />
        </div>
    )
} 

export default StorageAreaId;