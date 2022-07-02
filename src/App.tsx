import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import StorageArea from "./StorageArea";

import Box from "./Box";
import ShoppingList from "./ShoppingList";
import ItemDetails from "./ItemDetails";

function App() {
  return (
    <Routes>
      <Route path="box/:boxTemplateId/:boxId" element={<Box />} />
      <Route path="item/:boxTemplateId/:itemId" element={<ItemDetails />} />
      <Route path="needed" element={<ShoppingList />} />
      <Route path="*" element={<StorageArea />} />
    </Routes>
  );
}

export default App;
