import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import miImagen from '../../image/logo laport.png';


function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  

  return (
    <nav className="navbar navbar-expand-lg justify-content-between">
      <Link to="/">
  <img
    src={miImagen}
    alt="Logo de Suministro Médicos Laport"
    className="navbar-logo-img" 
  />
</Link>

      <div className="navbar-search">
          <input className="form-control" type="text" placeholder="Buscar..." />
          <button className="Botton1">🔍</button>
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
          <button className="Botton1">Productos</button>
        </Link>

        <Link to="/Promotions">
          <button className="Botton1">Promociones</button>
        </Link>

        <Link to="/Bestsellers">
          <button className="Botton1">Tendencias</button>
        </Link>
        

        {isLoggedIn && (
          <div className="navbar-user">

            <span className="mr-2">Bienvenido, {user && user.name}</span>
            
            {user && user.role === "admin" && (

              
              <Link to="/NewProduct">
                <button className="Botton1">Lanzamiento</button>
              </Link>
            )}
            <button className="Botton1" onClick={logOutUser}>
              Logout
            </button>
            

          </div>
        )}



        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button className="Botton1">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="Botton1">Login</button>
            </Link>
          </>
        )}
        </div>
      
    </nav>
  );
}

export default Navbar;