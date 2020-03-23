import React from "react";

type PlanBienestarParams = {};

const PlanBienestar = (_:PlanBienestarParams): JSX.Element => {
    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        // TODO: mejorar esta redireccion
        (window as any).location = "/menu";
    };

    return (
        <>
        <h1>Este es el Plan de Bienestar</h1>
        <button onClick={regresarAlMenu}>Regesar al Menu</button>
        </>
    );
};

export default PlanBienestar;