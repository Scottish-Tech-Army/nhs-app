import BoxItem from "./BoxItem";
//import classes from './MeetupList.module.css';

function BoxList(props) {
  return (
    <ul >
      {
        props.boxes.map((box) => (
          <BoxItem
            key={box.id}
            id={box.id}
            hip={box.hip}
            spect={box.spect}
            con={box.con}
          />
        ))}
    </ul>
  );
}

export default BoxList;