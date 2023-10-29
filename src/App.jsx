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
import Promotions from "./components/Promotions/Promotions";
import PromotionsDetails from "./components/PromotionsDetails/PromotionsDetails";
import ProducDetails from "./components/ProductDetails/ProductDetails";
import Buy from "./components/Buy/Buy";

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
          element={<ProductForm />}/>c

        <Route
          path="/Product"
          element={<Product />}/>

        <Route
          path="/Promotions"
          element={<Promotions />}/>  

        <Route
          path="/PromotionsDetails"
          element={<PromotionsDetails />}/>    

        
        <Route 
        path="/ProductDetails/:id" 
        element={<ProducDetails />}/>

        <Route 
        path="/Buy" 
        element={<Buy />}/>
        

      </Routes>

    </div>
  );
}



export default App;
