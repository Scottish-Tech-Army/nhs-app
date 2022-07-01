import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import StorageArea from './StorageArea';

import Box from './Box';


//React-router V6+ method of wrapping routing app
  //home route defined as Storage Area
  //Nested routes use dynamic variables boxTemplate and boxId from Box component props lifted through setBoxContents function
    //Nested route values passed into setBoxContents function
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<StorageArea />}/>
        <Route path='box/:boxTemplateId/:boxId' element={<Box setBoxContents={() => {}}/>} />
      </Routes>
    </Router> 
      );
}

export default App;
