import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_SERVER_URL;

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

  const handleSearch = async () => {
    if (searchTerm) {
      setLoading(true);
      setError(null); // Limpiar el estado de error al realizar una nueva búsqueda

      try {
        // Realizar una solicitud GET a la API para buscar productos en función del término de búsqueda en nombre y descripción
        const response = await axios.get(`${backendUrl}/api/products/search?term=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error al obtener los resultados de búsqueda:', error);
        setError('Error al obtener los resultados de búsqueda. Inténtalo de nuevo más tarde.'); // Establecer el estado de error
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="navbar-search">
        <input
          className="form-control"
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="Button1" onClick={handleSearch}>🔍</button>
      </div>
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error si existe un error */}
        {loading ? (
          <p>Cargando resultados...</p>
        ) : (
          searchResults.map((result) => (
            <div key={result._id}>
              <Link to={`/ProductDetails/${result._id}`} className="product-image-link">
                <img src={result.image} alt={result.name} className="product-image" />
              </Link>
              <h5>{result.name}</h5>
              <p>{result.description}</p>
              <p>Precio: ${result.price}</p>
              <p>Marca: {result.brand}</p>
              <Link to="/Buy">
                <button className="Botton1">Comprar</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchBar;
