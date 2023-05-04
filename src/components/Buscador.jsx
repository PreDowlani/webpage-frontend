import React from "react";
import("../components/styles/buscador.css");

const Buscador = ({ results }) => {
  return (
    <div className="contenedor-buscador">
      <div className="buscador">
        {results.map((results) => {
          <h1>Listado de la búsqueda:</h1>;
          return (
            <ul>
              <li>
                <img src={results.image} alt="shoes" width="250" />
              </li>
              <li>{results.id}</li>
              <li>{results.nombre}</li>
              <li>{results.marca}</li>
              <li>{results.categoria}</li>
              <li>{results.precio}€</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Buscador;
