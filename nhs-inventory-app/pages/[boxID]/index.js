import BoxItemDetail from '../../components/boxes/BoxItemDetail';
import testData from '../api/testData.json'




function BoxesDetails(props) {
    const { loadedBox } = props;


    return (
        <BoxItemDetail
            id={loadedBox.items.id}
            name={loadedBox.items.name}
            size={loadedBox.items.size} 
            description={loadedBox.items.description} 
        />
    )
}


export async function getStaticPaths() {

    return {
        
        paths: [
            {
                params: {
                    boxID: "1",
                },
            },
            {
                params: {
                    boxID: "2",
                },
            },
            {
                params: {
                    boxID: "3",
                },
            },
        ],
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const { params } = context;
    const boxId = params.boxID;

    const boxFound = testData.find(boxFound => boxFound.id === boxId)
    return {
        props: {
            loadedBox: boxFound
        },
    };
    }


export default BoxesDetails;

