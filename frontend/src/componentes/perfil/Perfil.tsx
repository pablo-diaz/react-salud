import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { PerfilPaciente, consultarPerfil } from "../../servicios/paciente/PacienteService";
import Utils from "../../utils/Utils";

type PerfilParams = {
    perfil: PerfilPaciente
};

type PerfilEstado = {
    info: PerfilPaciente
};

const obtenerEstadoConPerfil = (estadoActual: PerfilEstado | null, perfil: PerfilPaciente): PerfilEstado => {
    return { ...estadoActual, info: perfil };
};

const Perfil = (_:PerfilParams): JSX.Element => {
    const [estado, setEstado] = useState<PerfilEstado | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        Utils.validarUsuarioAutenticado()
            .then(usuarioAutenticado => consultarPerfil(usuarioAutenticado))
            .then(perfil => {
                setEstado(obtenerEstadoConPerfil(estado, perfil));
                setCargando(false);
            })
            .catch(() => router.push("/"));
    }, []);

    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/menu");
    };

    return cargando ? <div>Cargando ....</div> : (
        <>
        <h1>Este es el Perfil del Paciente</h1>
        <ul>
            <li>Nombre: {estado?.info.nombreCompleto}</li>
            <li>Edad: {estado?.info.edad}</li>
            <li>Género: {estado?.info.genero}</li>
        </ul>
        <br />
        <button onClick={regresarAlMenu}>Regesar al Menu</button>
        </>
    );
};

export default Perfil;