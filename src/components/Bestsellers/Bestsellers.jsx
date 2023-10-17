import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bestsellers.css';

const API_URL = 'http://localhost:5005'; // Reemplaza con la URL de tu servidor

function Bestsellers() {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET al servidor para obtener los 10 productos más vendidos
    axios
      .get(`${API_URL}/api/bestsellers`)
      .then((response) => {
        setBestsellers(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los productos más vendidos:', error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Los productos más vendidos</h2>
      <div className="bestsellers-list">
        {bestsellers.map((product) => (
          <div className="bestseller-item" key={product._id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
            {/* Otros detalles del producto */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bestsellers;