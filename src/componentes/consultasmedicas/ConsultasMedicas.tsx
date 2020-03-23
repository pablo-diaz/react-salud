import React, { useState, useEffect } from "react";

import { ConsultaMedica, consultarConsultasMedicas } from "../../servicios/paciente/PacienteService";

type ConsultasMedicasParams = {};

type ConsultasMedicasEstado = {
    consultas: ConsultaMedica[]
};

const obtenerEstadoConConsultas = (estadoActual: ConsultasMedicasEstado | null, consultas: ConsultaMedica[]): ConsultasMedicasEstado => {
    return { ...estadoActual, consultas };
};

const ConsultasMedicas = (_:ConsultasMedicasParams): JSX.Element => {
    const [estado, setEstado] = useState<ConsultasMedicasEstado | null>(null);
    const [querying, _1] = useState<boolean>(true);

    useEffect(() => {
        const consultas = consultarConsultasMedicas("pablo");
        setEstado(obtenerEstadoConConsultas(estado, consultas));
    }, [querying]);
    
    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        // TODO: mejorar esta redireccion
        (window as any).location = "/menu";
    };

    return (
        <>
        <h1>Estas son las Consultas Médicas</h1>
        <ul>
            { estado?.consultas.map((consulta, index) =>
            <li key={index}>{ consulta.sitio } [ { `${consulta.fecha}` } ] </li> ) }
        </ul>
        <br />
        <button onClick={regresarAlMenu}>Regesar al Menu</button>
        </>
    );
};

export default ConsultasMedicas;