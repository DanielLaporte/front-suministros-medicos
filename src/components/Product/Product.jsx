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
    <div className="container1">
      
      {/* Espacio para las promociones (puedes agregar contenido aquí) */}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <img src={product?.image} alt={product.name} />
                <p className="card-text">{product.description}</p>
                <p className="card-text">Precio: ${product.price}</p>
                <p className="card-text">Categoría: {product.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;