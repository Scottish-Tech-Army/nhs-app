import React from 'react';
import './App.css';
import storageAreaContents from "./data/traumaTower.json";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";  

import Box1 from './pages/Box1';
import Box2 from './pages/Box2';
import Box3 from './pages/Box3';
import Box4 from './pages/Box4';
import Box5 from './pages/Box5';

function StorageArea() {
  return (
    <Router>
      <h1>{storageAreaContents.name}</h1>
      <ul>
        {storageAreaContents.boxes.map((box) => (
          <Link to={`/box/${box.boxId}`} >
          {box.name}
          </Link>
        ))}
      </ul>



      <Switch>
        <Route path='box/box1'>
          <Box1 />
        </Route>
        <Route path='box/box2'>
          <Box2 />
        </Route>
        <Route path='box/box3'>
          <Box3 />
        </Route>
        <Route path='box/box4'>
          <Box4 />
        </Route>
        <Route path='box/box5'>
          <Box5 />
        </Route>
      </Switch>
    </Router>
  );
}

export default StorageArea;
