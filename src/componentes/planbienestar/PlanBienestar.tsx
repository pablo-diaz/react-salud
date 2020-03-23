import React, { useState, useEffect } from "react";

import { PlanDeBienestar, consultarPlanesBienestar } from "../../servicios/paciente/PacienteService";

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

    useEffect(() => {
        const planes = consultarPlanesBienestar("pablo");
        setEstado(obtenerEstadoConPlanes(estado, planes));
    }, [querying]);

    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        // TODO: mejorar esta redireccion
        (window as any).location = "/menu";
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