import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Product from '../../components/Product/Product';
import Brands from '../../components/Brands/Brands';
import Bestsellers from '../../components/Bestsellers/Bestsellers';
import Promotions from '../../components/Promotions/Promotions';

function HomePage() {
  return (
    <div>
      <h1>Home page</h1>
      
      
      <Link to="/NewProduct">
      <button className="black-text">Nuevo producto</button>
      </Link>

      <Link to="/NewProduct">
      <button className="black-text">Editar producto</button>
      </Link>

      <Link to="/NewProduct">
      <button className="black-text">Borrar producto</button>
      </Link>

      <Product/>
 
      <Brands/>

      <Promotions/>

      <Bestsellers/>


    </div>

    
  );
}

export default HomePage;