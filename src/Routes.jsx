import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuyElectricity from './First';
import SelectProvider from './Second';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyElectricity />} />
        <Route path="/select-provider" element={<SelectProvider />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
