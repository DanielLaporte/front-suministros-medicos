// Componente LikeButton.js
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5005'; // Reemplaza con tu URL del servidor

function LikeButton({ productId, userToken }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    axios
      .post(`${API_URL}/api/like/${productId}`, null, {
      
      })
      .then((response) => {
        if (response.data.message === 'Producto añadido a tus favoritos.') {
          setLiked(true);
        } else if (response.data.message === 'Producto eliminado de tus favoritos.') {
          setLiked(false);
        }
      })
      .catch((error) => {
        console.error('Error al dar "Me gusta" al producto:', error);
      });
  };

  return (
    <div>
      <button onClick={toggleLike}>
        {liked ? 'No me gusta' : 'Me gusta'}
      </button>
      {liked && <p>¡Te gusta!</p>}
    </div>
  );
}

export default LikeButton;
