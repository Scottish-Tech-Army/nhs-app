import BoxItem from "./BoxItem";

function BoxList(props) {
  return (
    <ul >
      {
        props.areas.map((box) => (
          <BoxItem
            key={box.id}
            id={box.id}
            name={box.name}
            size={box.size}
            description={box.description}
          />
        ))}
    </ul>
  );
}

export default BoxList;