/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';
import { Link, useLocation  } from "react-router-dom";
import { Carousel } from 'react-bootstrap';

//const API_URL = "http://localhost:5005";
const backendUrl = process.env.REACT_APP_SERVER_URL ;


function Product() {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const location = useLocation();
  
  useEffect(() => {
    // Realizar una solicitud GET al servidor para obtener la lista de productos
    axios.get(`${backendUrl}/api/products`)
      .then((response) => {
        setProducts(response.data);
        
        // Copiamos el arreglo de productos original para no alterarlo directamente
        const productsCopy = [...response.data];
  
        // Mezclamos aleatoriamente el arreglo de productos
        for (let i = productsCopy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [productsCopy[i], productsCopy[j]] = [productsCopy[j], productsCopy[i]];
        }
  
        // Tomamos los primeros 8 productos del arreglo mezclado
        const first8RandomProducts = productsCopy.slice(0, 24);
  
        // Actualizamos el estado para mostrar los productos aleatorios
        setRandomProducts(first8RandomProducts);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, []);


  const createGradientBackground = () => {
    // Crea un fondo degradado con colores de izquierda a derecha
    const gradientColors = ['white', customBlue]; // Puedes cambiar los colores aquí
    return `linear-gradient(to top, ${gradientColors.join(', ')})`;
  };

  const customBlue = '#007BFF';

  return (
    <div className="container1">
      {location.pathname !== '/Product' && (
        <Carousel
          interval={3000}
          className="d-none d-sm-block"
          style={{ background: createGradientBackground() }}
          indicators={false}
        >
          {randomProducts.map((product, index) => (
            <Carousel.Item key={index}>
              <h3>Excelente calidad</h3>
              <img src={product?.image} alt={product.name} className="product-image" />
            </Carousel.Item>
          ))}
        </Carousel>
        )}
            

      <div className="row">
        {randomProducts.map((product) => ( 
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>

                <Link to={`/ProductDetails/${product._id}`} key={product._id} className="product-image-link">
                  <img src={product.image} alt={product.name} className="product-image2" />
                </Link>
               
                {location.pathname !== '/' && (
                  // Muestra estos elementos solo cuando no estás en la página de inicio
                  <div>
                    
                    <p className="card-text">Precio: ${product.price}</p>
                    
                    
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
      <div className="random-product-images">
      {randomProducts.slice(0, 8).map((product) => (
        <Link to={`/ProductDetails/${product._id}`} key={product._id} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      ))}
    </div>
    </div>
  );
}

export default Product;
