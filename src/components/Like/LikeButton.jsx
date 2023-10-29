import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "process.env.REACT_APP_SERVER_URL"; // Reemplaza con tu URL del servidor

function LikeButton({ productId, userToken }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    axios
      .post(`${API_URL}/api/like/${productId}`, null)
      .then((response) => {
        const message = response.data.message;
        setLiked(message === 'Producto añadido a tus favoritos' ? !liked : liked);
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
