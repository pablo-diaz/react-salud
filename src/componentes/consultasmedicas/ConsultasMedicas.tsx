import React from "react";

type ConsultasMedicasParams = {};

const ConsultasMedicas = (_:ConsultasMedicasParams): JSX.Element => {
    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        // TODO: mejorar esta redireccion
        (window as any).location = "/menu";
    };

    return (
        <>
        <h1>Estas son las Consultas Médicas</h1>
        <button onClick={regresarAlMenu}>Regesar al Menu</button>
        </>
    );
};

export default ConsultasMedicas;