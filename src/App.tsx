import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Directory from "./Directory";
import { useAppSelector } from "./model/store";

import Container from "./Container";
import MissingItems from "./MissingItems";
import ItemDetails from "./ItemDetails";
import { isAuthenticating, SignIn } from "./auth/SignIn";
import { getAuthState } from "./model/auth/AuthSlice";
import { Amplify } from "@aws-amplify/core";
import StorageArea from "./StorageArea";

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
  const authState = useAppSelector(getAuthState);

  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

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
        <Route path="container/:storageAreaId/:containerTemplateId/:containerNumber" element={<Container />} />
        <Route path="item/:containerTemplateId/:itemId" element={<ItemDetails />} />
        <Route path="missing-items" element={<MissingItems />} />
        <Route path="area/:storageAreaId" element={<StorageArea />} />
        <Route path="*" element={<Directory />} />
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
