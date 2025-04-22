import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/home";
import ProductDetails from "./pages/ProductDetails/product-detail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-details" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;