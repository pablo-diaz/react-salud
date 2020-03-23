import React from "react";

type PerfilParams = {};

const Perfil = (_:PerfilParams): JSX.Element => {
    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        // TODO: mejorar esta redireccion
        (window as any).location = "/menu";
    };

    return (
        <>
        <h1>Este es el perfil</h1>
        <button onClick={regresarAlMenu}>Regesar al Menu</button>
        </>
    );
};

export default Perfil;