import React from 'react';
import './NewProduct.css';

// Importa el componente ProductForm
import ProductForm from '../../components/ProductForm/ProductForm'; // Asegúrate de que la ruta sea correcta

function NewProduct() {
    return (
      <div className="container">
        <h1>Nuevo Producto</h1>
  
        {/* Renderiza el formulario para agregar un nuevo producto */}
        <ProductForm />
      </div>
    );
  }
  
  export default NewProduct;

