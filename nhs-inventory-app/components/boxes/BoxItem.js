import { useRouter } from 'next/router';
import Card from '../ui/Card';




function BoxItem(props) {
  const router = useRouter();

  function onClickHandler() {
    router.push('/' + props.id);

  }
  
  return (
          <Card>    
             <label >ID</label>
              <div >{props.id}</div><br/><br/>
             <label >Hip</label>
              <div>{props.hip}</div><br/><br/>
             <label >Spect</label>
              <div>{props.spect}</div><br/><br/>
             <label>Con</label>
              <div>{props.con}</div><br/><br/>
            <button onClick={onClickHandler}>More Details</button>
          </Card>
  );
}

export default BoxItem;
