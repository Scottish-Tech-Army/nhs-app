import Card from "../ui/Card";


function SudoBoxesItem(props) {
  return (
      <Card>
          {props.name}
          {props.description}
    </Card>
  );
}

export default SudoBoxesItem;