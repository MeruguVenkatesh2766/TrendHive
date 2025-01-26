import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persister } from './store';

createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
    </ReduxProvider>
  </React.Fragment>
)
