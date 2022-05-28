import BoxItem from "./BoxItem";

function BoxList(props) {
  return (
    <ul >
      {
        props.boxes.map((box) => (
          <BoxItem
            id={box.id}
          name={box.name}
          />
        ))}
    </ul>
  );
}

export default BoxList;