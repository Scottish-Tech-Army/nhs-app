import BoxItemDetail from '../../components/boxes/BoxItemDetail';
import starJson from '../../data/stars';
import fs from 'fs/promises';
import path from 'path';



function BoxesDetails(props) {
    const { loadedBox } = props;


    return (
        <BoxItemDetail
            id={loadedBox.id}
            hip={loadedBox.hip}
            hd={loadedBox.hd} 
            hr={loadedBox.hr} 
        />
    )
}


export async function getStaticPaths() {

    return {
        
        paths: [
            {
                params: {
                    sID: "9",
                },
            },
            {
                params: {
                    sID: "0",
                },
            },
            {
                params: {
                    sID: "1",
                },
            },
        ],
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const { params } = context;
    const boxId = params.boxID;

    const filePath = path.join(process.cwd(), 'data', 'testData.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);


    const boxFound = data.testDataJson.find(boxFound => boxFound.id === boxId)
    return {
        props: {
            loadedBox: boxFound
        },
    };
    }


export default BoxesDetails;

