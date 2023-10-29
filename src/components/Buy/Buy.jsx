import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa useParams
import './Buy.css';

function Buy() {
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad de productos
  const [purchaseSuccess, setPurchaseSuccess] = useState(false); // Estado para el mensaje de compra exitosa

  const product = {
    name: 'Producto de ejemplo', // Nombre del producto (reemplázalo con los datos reales)
    price: 10.99, // Precio del producto (reemplázalo con los datos reales)
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value); // Actualizar la cantidad cuando cambia la casilla
  };

  const handlePurchase = () => {
    // Aquí puedes agregar la lógica para enviar la solicitud de compra al servidor

    // Simulación de éxito en la compra
    setPurchaseSuccess(true);
  };

  return (
    <div className="card4">
      {purchaseSuccess ? (
        // Si la compra se realizó con éxito, muestra el mensaje y el botón de seguir comprando
        <div>
          <h1>¡Compra realizada con éxito!</h1>
          <Link to="/">
          <button className="Botton1">Seguir comprando</button>
          </Link>
          
        </div>
      ) : (
        // Si no se ha realizado la compra, muestra el formulario de compra
        <div>
          <h1>Detalle de compra</h1>
          <div>
            <p>Producto: {product.name}</p>
            <p>Precio: ${product.price}</p>
          </div>
          <div>
            <label>Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max="10" // Establece un límite de cantidad según tus necesidades
            />
          </div>
          <button onClick={handlePurchase} className="button-terminar-compra">Terminar compra</button>
        </div>
      )}
    </div>
  );
}

export default Buy;
