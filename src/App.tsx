import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import StorageArea from "./StorageArea";
import { useAppDispatch, useAppSelector } from "./model/store";
import { refreshState } from "./model/BoxContentsSlice";

import Box from "./Box";
import ShoppingList from "./ShoppingList";
import ItemDetails from "./ItemDetails";
import { isAuthenticating, SignIn } from "./auth/SignIn";
import { getAuthState } from "./model/auth/AuthSlice";
import { Amplify } from "@aws-amplify/core";

const awsConfig = {
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
  },
};

// eslint-disable-next-line jest/require-hook
console.debug("Configure", Amplify.configure(awsConfig));

function App() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(getAuthState);

  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  useEffect(() => {
    dispatch(refreshState());
  }, [dispatch]);

  if (isAuthenticating(authState)) {
    return (
      <div className="root">
        <SignIn />
      </div>
    );
  }

  return (
    <div className="root">
      <Routes>
        <Route path="box/:boxTemplateId/:boxId" element={<Box />} />
        <Route path="item/:boxTemplateId/:itemId" element={<ItemDetails />} />
        <Route path="summary" element={<ShoppingList />} />
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
