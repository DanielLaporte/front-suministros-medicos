import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';
const API_URL = "http://localhost:5005";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET al servidor para obtener la lista de productos
    axios.get(`${API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, []);

  
  return (
    <div>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <span>{product.name}</span>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Categoría: {product.category}</p>
            <div className="button-group">
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;