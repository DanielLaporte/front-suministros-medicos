import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Promotions.css';
import { Link, useLocation } from 'react-router-dom';

const API_URL = "process.env.REACT_APP_SERVER_URL";

function Promotions() {
  const [promotionalProducts, setPromotionalProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Realizar una solicitud GET al servidor para obtener la lista de productos en promoción
    axios
      .get(`${API_URL}/api/products/promotional`)
      .then((response) => {
        setPromotionalProducts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos en promoción:', error);
      });
  }, []);

  return (
    <div className="container1">
      <div className="row">
        <h1>Promociones</h1>
        {promotionalProducts.map((product) => (
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
              
                <Link to={`/ProductDetails/${product._id}`} key={product._id} className="product-image-link">
                  <img src={product.image} alt={product.name} className="product-image" />
                </Link>
                
                {location.pathname !== '/' && (
                  <div>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Precio: ${product.price}</p>
                    <p className="card-text">Marca: {product.brand}</p>
                    <Link to="/Buy">
                      <button className="Botton1">Comprar</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Promotions;
