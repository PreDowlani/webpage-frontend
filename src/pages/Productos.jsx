import React, { useEffect, useState } from "react";
import PerProduct from "../components/PerProduct";
import "../components/styles/productos.css";
import axios from "axios";

const Productos = ({ addToCart, cartData, setCartData }) => {
  const [zapatos, setZapatos] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/productos")
      .then((respuesta) => {
        setZapatos(respuesta.data.zapatos);
      })
      .catch((error) => {
        console.log(error.respuesta.data);
      });
  }, []);

  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosRecuperar && datosRecuperar.token) {
      // Si existe algo que recuperar y dentro de lo recuperado existe la propiedad token
      console.log(datosRecuperar.token);
      return [datosRecuperar.token, datosRecuperar.userId];
    }
  };

  const añadirAlCarrito = async (idDelZapato) => {
    await axios
      .put(
        process.env.REACT_APP_BACKEND +
          `/api/usuario/${
            extraerDatosDeUsuario()[1] //aqui es como poner el id del usuario
          }/ver_carrito`,
        {
          carrito: idDelZapato,
        },
        console.log(idDelZapato),
        {
          headers: {
            Authorization: "Bearer " + extraerDatosDeUsuario()[0], // En los headers van 'Bearer ' + token recibido
          },
        }
      )
      .then((response) => {
        console.log("Añadido al carrito", response.data);
        setCartData(response.data.carrito);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="map-producto">
      {zapatos.map((zapato) => {
        return (
          <PerProduct
            zapato={zapato}
            key={zapato.id}
            addToCart={addToCart}
            añadirAlCarrito={añadirAlCarrito}
            extraerDatosDeUsuario={extraerDatosDeUsuario}
            cartData={cartData}
            setCartData={setCartData}
          />
        );
      })}
    </div>
  );
};

export default Productos;
