import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navegar = useNavigate();
  useEffect(() => {
    localStorage.removeItem("datosUsuario");
    navegar("/login");
    window.location.reload();
  }, []);

  return (
    <div>
      <h3>LogOut</h3>
    </div>
  );
};

export default Logout;
