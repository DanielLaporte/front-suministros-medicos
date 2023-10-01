import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api', formData)
      .then((response) => {
        console.log('Producto creado:', response.data);
        // Puedes hacer algo después de crear el producto, como redirigir a otra página o mostrar un mensaje de éxito.
      })
      .catch((error) => {
        console.error('Error al crear el producto:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del producto:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange} // Aquí se utiliza la función handleChange
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange} // Aquí se utiliza la función handleChange
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange} // Aquí se utiliza la función handleChange
        />
      </div>
      <div>
        <label>Categoría:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange} // Aquí se utiliza la función handleChange
        />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default ProductForm;