import "./styles/productos.css";

const PerProduct = ({ zapato, addToCart, añadirAlCarrito }) => {
  const todosProductos = zapato;

  return (
    <div className="contenedor-producto">
      <div className="image">
        <img src={todosProductos.image} alt="nike" />
      </div>
      <div className="producto-details">
        <h1>{todosProductos.id}</h1>
        <h1>{todosProductos.nombre}</h1>
        <h2>{todosProductos.marca}</h2>
        <p>{todosProductos.categoria}</p>
        <p className="precio"> €{todosProductos.precio}</p>
        <button
          className="button"
          onClick={() => {
            addToCart(zapato);
            añadirAlCarrito(todosProductos._id);
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default PerProduct;