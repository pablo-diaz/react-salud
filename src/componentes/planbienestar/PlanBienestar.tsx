import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { PlanDeBienestar, consultarPlanesBienestar } from "../../servicios/paciente/PacienteService";
import { obtenerUsuarioAutenticado } from "../../utils/Utils";

type PlanBienestarParams = {};

type PlanBienestarEstado = {
    planes: PlanDeBienestar[]
};

const obtenerEstadoConPlanes = (estadoActual: PlanBienestarEstado | null, planes: PlanDeBienestar[]): PlanBienestarEstado => {
    return { ...estadoActual, planes };
};

const PlanBienestar = (_:PlanBienestarParams): JSX.Element => {
    const [estado, setEstado] = useState<PlanBienestarEstado | null>(null);
    const [querying, _1] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const usuarioAutenticado = obtenerUsuarioAutenticado();
        if(!usuarioAutenticado)
            router.push("/");
        const planes = consultarPlanesBienestar(usuarioAutenticado as string);
        setEstado(obtenerEstadoConPlanes(estado, planes));
    }, [querying]);

    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/menu");
    };

    return (
        <>
        <h1>Estos son los Planes de Bienestar</h1>
        <ul>
            { estado?.planes.map(plan => <li key={plan.id}>{plan.nombre}</li>) }
        </ul>
        <br />
        <button onClick={regresarAlMenu}>Regesar al Menu</button>
        </>
    );
};

export default PlanBienestar;