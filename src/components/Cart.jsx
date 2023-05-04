import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import("../components/styles/cart.css");

const Cart = ({
  cart,
  setCart,
  estaLogeado,
  quitarDelCarrito,
  cartData,
  setCartData,
}) => {
  const [totalPrice, setPrice] = useState(0);
  useEffect(() => {
    if (cartData && cartData.carrito) {
      setCart(cartData.carrito);
    }
  }, [cartData]);

  //  La función realiza un cálculo para sumar los precios de todos los elementos del carrito, y actualiza el estado de totalPrice utilizando el método setPrice() de useState.
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.precio * item.cantidad;
    });
    setPrice(total);
  }, [cart]);

  // La función gestorSuma es un controlador de eventos que se ejecuta cuando se hace clic en el botón + para aumentar la cantidad de un producto en el carrito.

  // Primero, se crea una copia del estado del carrito original utilizando el operador spread .... Luego, se accede al objeto correspondiente en la copia del carrito utilizando el índice proporcionado y se aumenta su cantidad en uno.

  const gestorSuma = (index) => {
    const nuevoCarrito = [...cart];
    nuevoCarrito[index].cantidad += 1;
    setCart(nuevoCarrito);
  };

  const gestorResta = (index) => {
    const nuevoCarrito = [...cart];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad -= 1;
      setCart(nuevoCarrito);
    }
  };

  const gestorQuitar = (item) => {
    cart.splice(item, 1);
    setCart(cart);

    window.location.reload();
  };

  const navegar = useNavigate();

  const usuarioLogeado = () => {
    if (!estaLogeado) {
      navegar("/login");
    } else {
    }
  };

  return (
    <div className="contendor-carrito">
      <div className="map-carrito">
        {cart &&
          cart.map((item, index) => {
            const precioTotal = item.precio * item.cantidad;
            return (
              <div className="image-carrito">
                <img src={item.image} alt="imagen" key={item.id} />
                <h2>{item.nombre}</h2>
                <div>
                  <button
                    className="cantidad"
                    onClick={() => gestorSuma(index)}
                  >
                    {" "}
                    +{" "}
                  </button>
                  <button className="cantidad">{item.cantidad}</button>
                  <button
                    className="cantidad"
                    onClick={() => gestorResta(index)}
                  >
                    {" "}
                    -{" "}
                  </button>
                </div>
                <div>
                  <span className="precio-carrito"> €{precioTotal}</span>
                  <button
                    className="quitar"
                    onClick={() => {
                      gestorQuitar(item._id);
                      quitarDelCarrito(item._id); //HAY QUE PONER EL PUTO _ Si no , NO TE ELIMINA DEL ARRAY CARRITO DEL USUARIO
                      window.location.reload();
                    }}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="total">
        <span> Precio Total : </span>
        <span className="total-euros"> Euros- {totalPrice} </span>
      </div>
      <div className="llevar-login">
        <button onClick={usuarioLogeado}>Tramitar pedido</button>
      </div>
    </div>
  );
};

export default Cart;
