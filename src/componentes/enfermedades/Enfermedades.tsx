import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Enfermedad, consultarEnfermedades } from "../../servicios/paciente/PacienteService";
import { obtenerUsuarioAutenticado } from "../../utils/Utils";

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
    const router = useRouter();

    useEffect(() => {
        const usuarioAutenticado = obtenerUsuarioAutenticado();
        if(!usuarioAutenticado)
            router.push("/");
        const enfermedades = consultarEnfermedades(usuarioAutenticado as string);
        setEstado(obtenerEstadoConEnfermedades(estado, enfermedades));
    }, [querying]);

    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/menu");
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