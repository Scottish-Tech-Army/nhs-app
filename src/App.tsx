import React from 'react';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';
import StorageArea from './StorageArea';

import Box from './Box';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <StorageArea />
        </Route>
        <Route path='box/box1'>
          <Box />
        </Route>
      </Switch>
    </Router> 
      );
}

export default App;
