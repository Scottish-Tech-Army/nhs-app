import BoxItem from "./BoxItem";

function BoxList(props) {
  return (
    <ul >
      {
        props.boxes.map((box) => (
          <BoxItem
          name={props.name}
          />
        ))}
    </ul>
  );
}

export default BoxList;