import React, { createContext } from "react";


import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';
import {Routes, Route } from 'react-router-dom';

export const searchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <searchContext.Provider value = {{searchValue, setSearchValue}}>
      <div className="wrapper">
      <Header />
      <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      </div>
    </div>
    </searchContext.Provider>
  );
}

export default App;
