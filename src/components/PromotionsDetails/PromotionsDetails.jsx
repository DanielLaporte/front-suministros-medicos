import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_SERVER_URL;


function PromotionsDetails() {
  const [promotionalProducts, setPromotionalProducts] = useState([]);
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/products/promotional`)
      .then((response) => {
        setPromotionalProducts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos en promoción:', error);
      });
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="container2">
      <h1>Promociones</h1>
      <div className="promotional-products-list">
        {promotionalProducts.map((product) => (
          <div className="promotional-product" key={product._id}>
            <div className="card4">
              <div className="card-body">
                <h5 className="card-title4">{product.name}</h5>
                            
                {location.pathname !== '/' && (
                  <div>
                    <img src={product.image} alt={product.name} className="product-image4" />
                    <div id="descripcion-producto">
                      <p className={showMore ? 'card-text41 mostrar-todo' : 'card-text41'}>
                        {product.description}
                      </p>
                      <button className="Botton3" onClick={toggleShowMore}>
                        {showMore ? 'Leer menos' : 'Saber más'}
                      </button>
                    </div>
                    <div>
                      <p className="card-text42">Precio: ${product.price}</p>
                      <p className="card-text43">Marca: {product.brand}</p>
                    </div>
                    <Link to="/Buy">
                      <button className="Botton2">Comprar</button>
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

export default PromotionsDetails;

