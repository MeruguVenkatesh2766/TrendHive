import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persister } from './store';
import App from "./app/App";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);
