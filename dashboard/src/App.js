import React, { useState } from 'react';
import { Provider } from 'react-redux';
// import store from "./components/redux/store"
import store from "./store/configureStore"
import Settings from './components/Settings';
import Contacts from './components/Contacts';
import './App.css';
import 'tailwindcss/tailwind.css'; // This imports the default Tailwind CSS styles.

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [currentPage, setCurrentPage] = useState('settings');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <Provider store={store}>
    <div className="App">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleNavigation('settings')}>Maps & Chart</li>
          <li onClick={() => handleNavigation('contacts')}>Contacts</li>
        </ul>
      </div>
      <div className="content">
        {currentPage === 'settings' ? <Settings /> : <Contacts />}
      </div>
    </div>
  </Provider>
  );
}

export default App;
