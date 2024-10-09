import './App.css';
import Product from './Product';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductEdit from './ProductEdit'; // Example for edit component


function App() {
  return (
    // <div className="app">
    //   <Product/>
    // </div>
    <Router>
    <div>
      {/* Define routes here */}
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/edit/:id" element={<ProductEdit />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
