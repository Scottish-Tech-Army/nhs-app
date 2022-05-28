import Card from "../ui/Card";
import SudoBoxesItem from "./SudoBoxesItems";

function SudoBoxes(props) {
  return (
      <Card>
          {props.boxes.items.map((item) => {
                <SudoBoxesItems
                    name={item.name}
                    description={item.description}
                />
            })}
    </Card>
  );
}

export default SudoBoxes;