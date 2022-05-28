import SudoBoxes from "./SudoBoxes";

function BoxItemDetail(props) {


    return (
        <section section >
            <div>{props.name}</div>
            {props.boxes.map((box) => {
                <SudoBoxes
                    id={box.id}
                    name={box.name}
                />
            })}
            <button></button>
        </section>
    )
}

export default BoxItemDetail;