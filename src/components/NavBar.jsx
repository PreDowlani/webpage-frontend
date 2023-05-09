import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import emoji from "../images/emoji.png";
import axios from "axios";
import Buscador from "./Buscador";
import { FiMenu } from "react-icons/fi";
import("boxicons");

const NavBar = ({ size, estaLogeado }) => {
  const [buscar, setBuscar] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const gestorBuscar = (event) => {
    setBuscar(event.target.value);
  };

  useEffect(() => {
    const buscador = async () => {
      if (buscar === "") {
        setResults([]);
      } else {
        const respuesta = await axios.get(
          process.env.REACT_APP_BACKEND + `/api/productos/search/${buscar}`
        );
        setResults(respuesta.data.zapatos);
        console.log(respuesta.data);
      }
      console.log(results);
    };
    buscador();
  }, [buscar]);

  return (
    <div className="nav">
      <NavLink to={"/"}>
        <div className="img01">
          <img src={emoji} alt="imagen-online" width="80" />
          <NavLink to={"/"}></NavLink>
        </div>
      </NavLink>
      <button
        className="menu-btn"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        {console.log(menuOpen)}
        <FiMenu />
        {menuOpen ? (
          <ul className="menu-hamb">
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "activo" : "noactivo")}
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "activo" : "noactivo")}
                to={"/productos"}
              >
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "activo" : "noactivo")}
                to={"/contacto"}
              >
                Contacto
              </NavLink>
            </li>
            <li className={!estaLogeado ? "activo" : "desaparece"}>
              <NavLink
                className={({ isActive }) => (isActive ? "activo" : "noactivo")}
                to={"/login"}
              >
                LogIn
              </NavLink>
            </li>
            <li className={!estaLogeado ? "activo" : "desaparece"}>
              <NavLink
                className={({ isActive }) => (isActive ? "activo" : "noactivo")}
                to={"/singup"}
              >
                Singup
              </NavLink>
            </li>
            <li className={estaLogeado ? "activo" : "desaparece"}>
              <NavLink
                className={({ isActive }) => (isActive ? "noactivo" : "activo")}
                to={"/logout"}
              >
                LogOut
              </NavLink>
            </li>
            <li>
              <input
                type="text"
                name="buscar"
                id="buscar"
                placeholder="buscador"
                onChange={gestorBuscar}
              />
              <Buscador results={results} />
            </li>
            <li className="cart">
              <NavLink to={"/carrito"}>
                <box-icon name="cart"></box-icon>
                <span className="total-items">{size}</span>
              </NavLink>
            </li>
          </ul>
        ) : null}
      </button>

      <ul className="normal-menu">
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "activo" : "noactivo")}
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "activo" : "noactivo")}
            to={"/productos"}
          >
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "activo" : "noactivo")}
            to={"/contacto"}
          >
            Contacto
          </NavLink>
        </li>
        <li className={!estaLogeado ? "activo" : "desaparece"}>
          <NavLink
            className={({ isActive }) => (isActive ? "activo" : "noactivo")}
            to={"/login"}
          >
            LogIn
          </NavLink>
        </li>
        <li className={!estaLogeado ? "activo" : "desaparece"}>
          <NavLink
            className={({ isActive }) => (isActive ? "activo" : "noactivo")}
            to={"/singup"}
          >
            Singup
          </NavLink>
        </li>
        <li className={estaLogeado ? "activo" : "desaparece"}>
          <NavLink
            className={({ isActive }) => (isActive ? "noactivo" : "activo")}
            to={"/logout"}
          >
            LogOut
          </NavLink>
        </li>
        <li>
          <input
            type="text"
            name="buscar"
            id="buscar"
            placeholder="buscador"
            onChange={gestorBuscar}
          />
          <Buscador results={results} />
        </li>
        <li className="cart">
          <NavLink to={"/carrito"}>
            <box-icon name="cart"></box-icon>
            <span className="total-items">{size}</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
