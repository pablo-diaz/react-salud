import React from "react";

type EnfermedadesParams = {};

const Enfermedades = (_:EnfermedadesParams): JSX.Element => {
    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        // TODO: mejorar esta redireccion
        (window as any).location = "/menu";
    };

    return (
        <>
        <h1>Estas son las Enfermedades</h1>
        <button onClick={regresarAlMenu}>Regesar al Menu</button>
        </>
    );
};

export default Enfermedades;