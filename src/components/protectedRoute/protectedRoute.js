import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      return <Navigate to="/user" replace/>;
    }
  
    return children;
};

export default ProtectedRoute