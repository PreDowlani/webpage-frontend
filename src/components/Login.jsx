import React, { useState } from "react";
import "../components/styles/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const [fallo, setFallo] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navega = useNavigate();

  const gestorFormulario = async (data) => {
    await axios
      .post(process.env.REACT_APP_BACKEND + "/usuario/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log("Login Correcto");
        navega("/");
        window.location.reload();
        console.log(response.data);
        localStorage.setItem(
          "datosUsuario",
          JSON.stringify({
            userId: response.data.userId,
            token: response.data.token,
          })
        );
      })
      .catch((error) => {
        setFallo(true);
        console.log(error);
      });
  };

  return (
    <div className="contenedor-login">
      <div className="formulario-login">
        <h1> Iniciar Session :</h1>
        {fallo ? <h2>Correo o Contraseña no valida</h2> : null}
        <br />
        <form className="form-login" onSubmit={handleSubmit(gestorFormulario)}>
          <label htmlFor="nombre">Usuario : </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="introduzca su e-mail"
            {...register(
              "email",
              { required: true, message: "Requerido" },
              {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ingresa un email válido",
              }
            )}
          />
          {errors.email && errors.email.type === "required" && (
            <span> Ingresa un email válido</span>
          )}
          <br />
          <label htmlFor="password">Contraseña : </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="su contraseña"
            {...register(
              "password",
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^])[A-Za-z\d\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^]{8,}$/,
                message:
                  "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un caracter especial permitido: ! # @ $ % & / ( ) = ? * - + _ . : ; , ] [ { } ^",
              },
              { required: true, message: "Requerido" }
            )}
          />
          {errors.password && errors.password.type === "required" && (
            <span> Campo requerido</span>
          )}
          {errors.password && errors.password.type === "pattern" && (
            <span>
              La contraseña debe tener al menos 8 caracteres, incluyendo una
              letra mayúscula, una letra minúscula, un número y un caracter
              especial
            </span>
          )}

          <br />
          <button className="form-enviar" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
