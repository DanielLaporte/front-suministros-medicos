import React, { useContext } from 'react';
import './NewProduct.css';
import ProductForm from '../../components/ProductForm/ProductForm';
import { AuthContext } from '../../context/auth.context';

function NewProduct() {
  const { isLoggedIn, user } = useContext(AuthContext);

  // Verifica si el usuario está logueado y es administrador
  if (!isLoggedIn || user.role !== 'admin') {
    // Si el usuario no está logueado o no es administrador, puedes redirigirlo a otra página o mostrar un mensaje de acceso denegado.
    return (
      <div className="container">
        <h1>Acceso denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Nuevo Producto</h1>
      <ProductForm />
    </div>
  );
}

export default NewProduct;