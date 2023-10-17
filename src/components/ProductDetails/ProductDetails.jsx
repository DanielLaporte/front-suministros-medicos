import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetails.css';
import { Link, useLocation, useParams } from 'react-router-dom'; // Importa useParams

const API_URL = 'http://localhost:5005';

function ProductDetails() {
  const [product, setProduct] = useState(null); // Cambia a un solo producto en lugar de una lista
  const { id } = useParams(); // Obtiene el valor de _id de la URL
  const location = useLocation();

  useEffect(() => {
    // Realiza una solicitud GET al servidor para obtener los detalles de un producto específico
    axios
      .get(`${API_URL}/api/products/${id}`) // Utiliza el id de la URL
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el producto:', error);
      });
  }, [id]); // Asegúrate de que la solicitud se realice cuando cambia el id

  return (
    <div className="container2">
      <div className="row">
        
        {product && ( // Asegúrate de que haya un producto antes de mostrar los detalles
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="card3">
              <div className="card-body3">
                <h5 className="card-title3">{product.name}</h5>
                
                {location.pathname !== '/' && (
                  <div>
                    <img src={product.image} alt={product.name} className="product-image3" />
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
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
