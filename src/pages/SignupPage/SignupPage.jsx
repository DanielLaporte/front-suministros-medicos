import "./SignupPage.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden antes de enviar el formulario
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
    } else {
      // Create an object representing the request body
      const requestBody = { email, password, name };

      // Send a request to the server using authService
      authService
        .signup(requestBody)
        .then(() => {
          // Si la solicitud POST es exitosa, redirige a la página de inicio de sesión
          navigate("/login");
        })
        .catch((error) => {
          // Si la solicitud se resuelve con un error, establece el mensaje de error en el estado
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    }
  };

  return (
    <div className="form-container text-center">
      <h1 className="my-4">Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>

      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={handleName}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={handleEmail}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </div>

        
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message mt-3">{errorMessage}</p>}

      <p className="mt-3">¿Ya tienes una cuenta?</p>
      <Link to="/login" className="btn btn-secondary">
        Login
      </Link>
    </div>
  );
}

export default SignupPage;