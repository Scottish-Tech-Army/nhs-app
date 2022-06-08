import { useRouter } from 'next/router';
import data from '../../../../../testData.json'
import BoxesContents from '../../../../components/contents/BoxesContents';
import Form from '../../../../components/UI/form/form';

function Box() {
    const router = useRouter();
    const storageAreaID = router.query.storageAreaID;
    const boxID = router.query.boxID;
    

    return (
        
        <Form thirdLevel={data}
            storageAreaID={storageAreaID}
            boxID={boxID} />

    )
} 

export default Box;

/* 
<BoxesContents
            thirdLevel={data}
            storageAreaID={storageAreaID}
            boxID={boxID}
/>
         */