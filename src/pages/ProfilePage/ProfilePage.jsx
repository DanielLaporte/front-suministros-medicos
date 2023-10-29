import React, { useContext } from 'react';
import './ProfilePage.css'; // Asegúrate de importar el archivo CSS correcto.
import { AuthContext } from '../../context/auth.context';

function ProfilePage() {
  const { isLoggedIn, user } = useContext(AuthContext);

  if (!isLoggedIn || (user.role !== 'admin' && user.role !== 'user')) {
    return (
      <div className="container">
        <h1>Acceso denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="profile-card">
      
      <h2>Nombre de usuario:{user.name}</h2>
      <p>Correo:{user.email}</p>
      <p>Rol: {user.role}</p>
      
      {/* Agrega aquí otros campos según la estructura de tu objeto de usuario */}
    </div>
  );
}


export default ProfilePage;

