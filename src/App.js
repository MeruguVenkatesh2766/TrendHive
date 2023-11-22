// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Home from './components/Home';
import AddResourceItem from './components/AddResourceItem';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-resource" element={<AddResourceItem />} />
      </Routes>
    </Router>
  );
};

export default App;
