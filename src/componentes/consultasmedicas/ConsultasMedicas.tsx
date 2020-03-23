import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ConsultaMedica, consultarConsultasMedicas } from "../../servicios/paciente/PacienteService";
import { obtenerUsuarioAutenticado } from "../../utils/Utils";

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
    const router = useRouter();

    useEffect(() => {
        const usuarioAutenticado = obtenerUsuarioAutenticado();
        if(!usuarioAutenticado)
            router.push("/");
        const consultas = consultarConsultasMedicas(usuarioAutenticado as string);
        setEstado(obtenerEstadoConConsultas(estado, consultas));
    }, [querying]);
    
    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/menu");
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