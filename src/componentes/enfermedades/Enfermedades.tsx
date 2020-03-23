import React, { useState, useEffect } from "react";

import { Enfermedad, consultarEnfermedades } from "../../servicios/paciente/PacienteService";

type EnfermedadesParams = {};

type EnfermedadesEstado = {
    enfermedades: Enfermedad[]
};

const obtenerEstadoConEnfermedades = (estadoActual: EnfermedadesEstado | null, enfermedades: Enfermedad[]): EnfermedadesEstado => {
    return { ...estadoActual, enfermedades };
};

const Enfermedades = (_:EnfermedadesParams): JSX.Element => {
    const [estado, setEstado] = useState<EnfermedadesEstado | null>(null);
    const [querying, _1] = useState<boolean>(true);

    useEffect(() => {
        const enfermedades = consultarEnfermedades("pablo");
        setEstado(obtenerEstadoConEnfermedades(estado, enfermedades));
    }, [querying]);

    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        // TODO: mejorar esta redireccion
        (window as any).location = "/menu";
    };

    return (
        <>
        <h1>Estas son las Enfermedades</h1>
        <ul>
            { estado?.enfermedades.map((enfermedad, index) => <li key={index}>{ enfermedad.nombre }</li>) }
        </ul>
        <button onClick={regresarAlMenu}>Regesar al Menu</button>
        </>
    );
};

export default Enfermedades;