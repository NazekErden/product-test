import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductsPage";
import EditProductPage from "./pages/EditProductsPage";
import "./App.css"
const App: React.FC = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </div>
  );
};

export default App;
