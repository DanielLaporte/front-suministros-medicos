import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetails.css';
import { Link, useLocation, useParams } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_SERVER_URL;

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el producto:', error);
      });
  }, [id]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleLikeButtonClick = () => {
    axios
      .put(`${backendUrl}/api/products/${id}/favorites`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error al dar "Me Gusta" al producto:', error);
      });
  };

  return (
    <div className="container2">
      {product && (
        <div className="" key={product._id}>
          <div className="card3">
            <div className="card-body3">
              <h5 className="card-title3">{product.name} </h5>
              {location.pathname !== '/' && (
                <div>
                  <img src={product.image} alt={product.name} className="product-image3" />
                  <div id="descripcion-producto">
                    <p className={showMore ? 'card-text31 mostrar-todo' : 'card-text31'}>
                      {product.description}
                    </p>
                    <button className="Botton3" onClick={toggleShowMore}>
                      {showMore ? 'Leer menos' : 'Saber más'}
                    </button>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"></label>
                    <button
                      type="button"
                      className={`btn ${product.favorites ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={handleLikeButtonClick}
                    >
                      {product.favorites ? 'Quitar Me Gusta' : 'Me Gusta'}
                    </button>
                  </div>
                  <div>
                    <p className="card-text32">Precio: ${product.price}</p>
                    <p className="card-text33">Marca: {product.brand}</p>
                  </div>
                  <Link to="/Buy">
                    <button className="Botton2">Comprar</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
