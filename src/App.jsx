import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewProduct from "./pages/NewProduct/NewProduct";

import Navbar from "./components/Navbar/Navbar";

import ProductForm from "./components/ProductForm/ProductForm";
import Product from "./components/Product/Product";
import Brands from "./components/Brands/Brands";
import Promotions from "./components/Promotions/Promotions";
import Bestsellers from "./components/Bestsellers/Bestsellers";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        
        <Route 
          path="/" 
          element={<HomePage/>}/>

        <Route
          path="/profile"
          element={<ProfilePage/>}/>

        <Route
          path="/signup"
          element={<SignupPage />}/>

        <Route
          path="/login"
          element={<LoginPage />}/>

        <Route
          path="/NewProduct"
          element={<NewProduct />}/>

        <Route
          path="/ProductForm"
          element={<ProductForm />}/>

        <Route
          path="/Product"
          element={<Product />}/>

        <Route
          path="/Brands"
          element={<Brands />}/>

        <Route
          path="/Promotions"
          element={<Promotions />}/>  

        <Route
          path="/Bestsellers"
          element={<Bestsellers />}/>  
       
      </Routes>
    </div>
  );
}

export default App;
