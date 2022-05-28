import { useRouter } from 'next/router';
import Card from '../ui/Card';


function BoxItem(props) {
  const router = useRouter();

  function onClickHandler() {
    router.push('/' + props.id);

  }
  
  return (
          <Card>    
            <button onClick={onClickHandler}>{props.name}</button>
          </Card>
  );
}

export default BoxItem;

/* 
<label >Box ID</label>
<div >{props.items.id}</div><br/><br/>
<label >Name of equipment</label>
<div>{props.items.name}</div><br/><br/>
<label >Size</label>
<div>{props.items.size}</div><br/><br/>
<label>Description</label>
<div>{props.items.description}</div><br/><br/> */