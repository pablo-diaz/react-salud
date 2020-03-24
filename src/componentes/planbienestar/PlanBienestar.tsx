import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { PlanDeBienestar, consultarPlanesBienestar } from "../../servicios/paciente/PacienteService";
import Utils from "../../utils/Utils";

type PlanBienestarParams = {};

type PlanBienestarEstado = {
    planes: PlanDeBienestar[]
};

const obtenerEstadoConPlanes = (estadoActual: PlanBienestarEstado | null, planes: PlanDeBienestar[]): PlanBienestarEstado => {
    return { ...estadoActual, planes };
};

const PlanBienestar = (_:PlanBienestarParams): JSX.Element => {
    const [estado, setEstado] = useState<PlanBienestarEstado | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        Utils.validarUsuarioAutenticado(() => router.push("/"), 
            usuarioAutenticado => {
                const planes = consultarPlanesBienestar(usuarioAutenticado);
                setEstado(obtenerEstadoConPlanes(estado, planes));
                setCargando(false);
            });
    }, []);

    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/menu");
    };

    return cargando ? <div></div> : (
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