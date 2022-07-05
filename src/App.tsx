import React, { useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import StorageArea from "./StorageArea";
import { useAppDispatch } from "./data/store";
import { refreshState } from "./data/BoxContentsSlice";

import Box from "./Box";
import ShoppingList from "./ShoppingList";
import ItemDetails from "./ItemDetails";

//React-router V6+ method of wrapping routing app
  //home route defined as Storage Area
  //Nested routes use dynamic variables boxTemplate and boxId from Box component props lifted through setBoxContents function
    //Nested route values passed into setBoxContents function
  
function App() {
  const dispatch = useAppDispatch();
  
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  useEffect(() => {
    dispatch(refreshState());
  }, [dispatch]);

  return (
    <div className="root">
      <Routes>
        <Route path="box/:boxTemplateId/:boxId" element={<Box />} />
        <Route path="item/:boxTemplateId/:itemId" element={<ItemDetails />} />
        <Route path="needed" element={<ShoppingList />} />
        <Route path="*" element={<StorageArea />} />
      </Routes>
      {!disclaimerAccepted && (
        <>
          <div className="disclaimer-popup">
            <h2>Disclaimer</h2>
            <div className="message">
              This application is for demo use only. It is not intended for real
              life use.
            </div>
            <button
              type="button"
              className="confirm-yes"
              onClick={() => setDisclaimerAccepted(true)}
            >
              Accept
            </button>
          </div>
          <div className="modal-overlay" />
        </>
      )}
    </div>
  );
}

export default App;
