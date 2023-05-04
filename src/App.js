import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import Carrito from "./pages/Carrito";
import Contacto from "./components/Contacto";
import Login from "./components/Login";
import Logout from "./components/Logout";
import FormularioAlta from "./components/FormularioAlta";
import Buscador from "./components/Buscador";

function App() {
  const [cart, setCart] = useState([]);
  let [logged, setLogged] = useState(false);
  const [cartData, setCartData] = useState([]);

  let estaLogeado = (dentro) => {
    setLogged((dentro = logged));
  };

  const token = localStorage.getItem("datosUsuario");
  token ? console.log("hola") : console.log("adios");

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="App">
      <Router>
        <Navbar size={cart.length} estaLogeado={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/productos"
            element={
              <Productos
                addToCart={addToCart}
                cartData={cartData}
                setCartData={setCartData}
              />
            }
          />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/carrito"
            element={
              <Carrito
                cart={cart}
                setCart={setCart}
                estaLogeado={token}
                cartData={cartData}
                setCartData={setCartData}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/singup" element={<FormularioAlta />} />
          <Route path="/buscador" element={<Buscador />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
