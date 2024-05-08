import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import RestaurantHomePage from './pages/RestaurantHomePage';
import StreetHomePage from './pages/StreetHomePage';
import DetailsAndMenu from './pages/DetailsAndMenu';
import Map from './pages/Map';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
        <Route path="/" element={<StreetHomePage/>} />
        <Route path="/restaurant" element={<RestaurantHomePage/>} />
        <Route path="/place" element={<DetailsAndMenu/>} />
        <Route path="/map" element={<Map/>} />
      </Routes>
    </Router>
);

