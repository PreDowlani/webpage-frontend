import "./styles/productos.css";

const PerProduct = ({ zapato, addToCart, añadirAlCarrito, añadirTalla }) => {
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
        <p className="tallas-btn">
          {" "}
          Tallas :
          <select className="tallas">
            {todosProductos.tallas.map((todos) => {
              return (
                <option
                  className="tallas-opt"
                  onClick={() => {
                    añadirTalla(todosProductos.tallas);
                    añadirAlCarrito(todosProductos.tallas._id);
                  }}
                >
                  {todos.tallas}
                </option>
              );
            })}
          </select>
        </p>
        {console.log(todosProductos.tallas)}
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
