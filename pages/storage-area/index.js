import StorageAreaList from "../../components/storage-areas/StorageAreaList";

import data from '../api/testData.json'

function StorageArea() {
    const storageAreas = data;

    return (
        <StorageAreaList firstLevel={storageAreas}/>
    )
} 

export default StorageArea;