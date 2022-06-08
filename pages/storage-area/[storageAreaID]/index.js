import { useRouter } from 'next/router';
import data from '../../../../testData.json'
import BoxesList from '../../../components/boxes/BoxesList';


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