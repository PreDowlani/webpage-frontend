import React from "react";

import("boxicons");

const Contacto = () => {
  return (
    <div className="contendor-contacto">
      <form className="formulario" action="">
        <h1>Contacte con nosotros:</h1>
        <br />
        <label htmlFor="nombre">Nombre :</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="introduza su nombre"
        />
        <br />
        <label htmlFor="email">E-mail :</label>
        <input type="email" name="email" id="email" placeholder="su e-mail" />
        <br />
        <label htmlFor="telf">Teléfono de Contacto :</label>
        <input type="tel" name="telf" id="telf" placeholder="su contacto" />
        <br />
        <label htmlFor="preferencia">Como prefiere que le contactemos ? </label>
        <br />
        <label className="pref" htmlFor="tel">
          Teléfono{" "}
        </label>
        <input type="radio" name="preferencia" id="preferencia" />
        <label className="pref" htmlFor="email">
          {" "}
          E-mail{" "}
        </label>
        <input type="radio" name="preferencia" id="preferencia" />
        <br />
        <button className="enviar">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
