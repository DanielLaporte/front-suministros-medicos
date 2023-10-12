import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <span className="navbar-logo">Suministros Medicos Laport</span>
        </Link>
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." />
        <button>Buscar</button>
      </div>

      <Link to="/Product">
        <button>Productos</button>
      </Link>

      <Link to="/Promotions">
        <button>Promociones</button>
      </Link>

      <Link to="/Bestsellers">
        <button>Lo más vendido</button>
      </Link>

      {isLoggedIn && ( 
  <div className="navbar-user">
    <span>Bienvenido, {user.name}</span>
    <span>Tienes permisos de, {user.role}</span>
    {user.role === 'admin' && (
      <Link to="/NewProduct">
        <button className="black-text">Nuevo producto</button>
      </Link>
    )}
    <button onClick={logOutUser}>Logout</button>
  </div>
)}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;



