import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import StorageArea from './StorageArea';

import Box from './Box';

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
