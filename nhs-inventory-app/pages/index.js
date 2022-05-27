import { testData } from './api/testData.json'
import BoxList from '../components/boxes/BoxList'


 function Home() {
  return (
    <div>
        <BoxList Boxes={testData} />
    </div>
  )
}
export default Home;