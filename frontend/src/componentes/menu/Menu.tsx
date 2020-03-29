import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { PerfilPaciente, consultarPerfil } from "../../servicios/paciente/PacienteService";
import Utils from "../../utils/Utils";

type MenuProps = {};

type MenuState = {
    perfil: PerfilPaciente
};

const obtenerEstadoConPerfil = (estadoActual: MenuState | null, perfil: PerfilPaciente): MenuState => {
    return { ...estadoActual, perfil };
};

const Menu = (_:MenuProps): JSX.Element => {
    const [estado, setEstado] = useState<MenuState | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        Utils.validarUsuarioAutenticado()
        .then(token => consultarPerfil(token))
        .then(perfil => {
            setEstado(obtenerEstadoConPerfil(estado, perfil));
            setCargando(false);
        })
        .catch(() => router.push("/"));
    }, []);

    const handleClick = (evento: React.MouseEvent<HTMLButtonElement>): void => {
        const paginaARedireccionar = (evento.target as HTMLButtonElement).name;
        router.push(`/${paginaARedireccionar}`);
    };

    const hacerLogOut = (evento: React.MouseEvent<HTMLButtonElement>): void => { 
        Utils.borrarUsuarioDesdeStorage();
        router.push("/");
    };

    return cargando ? <div>Cargando ....</div> : (
        <>
        <h1>Este es el menu</h1>
        <h2>Bienvenido { estado?.perfil.nombreCompleto }</h2>
        <button name="perfil" onClick={handleClick}>Perfil</button>
        <button name="enfermedades" onClick={handleClick}>Enfermedades</button>
        <button name="consultasmedicas" onClick={handleClick}>Consultas Médicas</button>
        <button name="planbienestar" onClick={handleClick}>Plan de Bienestar</button>
        <button onClick={hacerLogOut}>Logout</button>
        </>
    );
};

export default Menu;