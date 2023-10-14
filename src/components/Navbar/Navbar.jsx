import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  

  return (
    <nav className="navbar navbar-expand-lg justify-content-between">
      <Link to="/">
        <span className="navbar-logo">Suministro_Medicos_Laport</span>
      </Link>

      <div className="navbar-search">
          <input className="form-control" type="text" placeholder="Buscar..." />
          <button className="btn btn-primary">Buscar</button>
        </div>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      
      <div className="collapse navbar-collapse" id="navbarNav">
        

        <Link to="/Product">
          <button className="btn btn-primary mx-2">Productos</button>
        </Link>

        <Link to="/Promotions">
          <button className="btn btn-primary mx-2">Promociones</button>
        </Link>

        <Link to="/Bestsellers">
          <button className="btn btn-primary mx-2">Tendencia</button>
        </Link>
        

        {isLoggedIn && (
          <div className="navbar-user">
            <span className="mr-2">Bienvenido, {user && user.name}</span>

            {user && user.role === "admin" && (
              <Link to="/NewProduct">
                <button className="btn btn-success mx-2">Lanzamiento</button>
              </Link>
            )}
            <button className="btn btn-primary" onClick={logOutUser}>
              Logout
            </button>
          </div>
        )}



        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button className="btn btn-info mx-2">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-info mx-2">Login</button>
            </Link>
          </>
        )}
        </div>
      
    </nav>
  );
}

export default Navbar;