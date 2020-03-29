import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ConsultaMedica, consultarConsultasMedicas } from "../../servicios/paciente/PacienteService";
import Utils from "../../utils/Utils";

type ConsultasMedicasParams = {};

type ConsultasMedicasEstado = {
    consultas: ConsultaMedica[]
};

const obtenerEstadoConConsultas = (estadoActual: ConsultasMedicasEstado | null, consultas: ConsultaMedica[]): ConsultasMedicasEstado => {
    return { ...estadoActual, consultas };
};

const ConsultasMedicas = (_:ConsultasMedicasParams): JSX.Element => {
    const [estado, setEstado] = useState<ConsultasMedicasEstado | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        Utils.validarUsuarioAutenticado()
        .then(token => consultarConsultasMedicas(token))
        .then(consultas => {
            setEstado(obtenerEstadoConConsultas(estado, consultas));
            setCargando(false);
        })
        .catch(() => router.push("/"));
    }, []);
    
    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/menu");
    };

    return cargando ? <div>Cargando ...</div> : (
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