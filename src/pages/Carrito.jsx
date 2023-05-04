import axios from "axios";
import Cart from "../components/Cart";
import { useEffect } from "react";
import("../components/styles/cart.css");

const Carrito = ({ cart, setCart, cartData, setCartData, estaLogeado }) => {
  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosRecuperar && datosRecuperar.token) {
      // Si existe algo que recuperar y dentro de lo recuperado existe la propiedad token
      console.log(datosRecuperar.token);
      return [datosRecuperar.token, datosRecuperar.userId];
    }
  };

  const arreglaCarrito = (carrito) => {
    carrito = carrito.carrito;
    let carritoArreglado = [];
    carrito.forEach((element) => {
      let zapato = carritoArreglado.find((z) => z._id === element._id);
      if (!zapato) {
        carritoArreglado.push(element);
      } else {
        zapato.cantidad++;
      }
    });
    return { carrito: carritoArreglado };
  };

  const mostrarCarrito = async () => {
    await axios
      .get(
        process.env.REACT_APP_BACKEND +
          `/api/usuario/${extraerDatosDeUsuario()[1]}/ver_carrito`,
        {
          headers: {
            Authorization: "Bearer " + extraerDatosDeUsuario()[0], // En los headers van 'Bearer ' + token recibido
          },
        }
      )
      .then((response) => {
        let carrito = arreglaCarrito(response.data);
        setCartData(carrito);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    mostrarCarrito();
  }, []);

  const quitarDelCarrito = async (idDelZapato) => {
    //llamamos el id del zapato
    await axios
      .delete(
        process.env.REACT_APP_BACKEND +
          `/api/usuario/${extraerDatosDeUsuario()[1]}/carrito`,
        {
          data: {
            id: idDelZapato, //al hacer click automaticamente elimina el id del zapato del carrito de usuario
          },
        },
        {
          headers: {
            Authorization: "Bearer " + extraerDatosDeUsuario()[0], // En los headers van 'Bearer ' + token recibido
          },
        }
      )
      .then((response) => {
        console.log(response.data.carrito);
        setCartData(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <Cart
        key={cart.id}
        cart={cart}
        setCart={setCart}
        quitarDelCarrito={quitarDelCarrito}
        cartData={cartData}
        setCartData={setCartData}
        estaLogeado={estaLogeado}
      />
    </div>
  );
};

export default Carrito;
