import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <Router>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </Router>
);

