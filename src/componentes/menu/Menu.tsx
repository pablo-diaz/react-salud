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
    const [querying, _1] = useState<boolean>(true);
    const router = useRouter();

    const validarUsuarioAutenticado = (): void => {
        const usuarioAutenticado = Utils.validarUsuarioAutenticado(() => router.push("/"));
        const perfil = consultarPerfil(usuarioAutenticado);
        setEstado(obtenerEstadoConPerfil(estado, perfil));
    };

    useEffect(() => {
        validarUsuarioAutenticado();
    }, [querying]);

    const handleClick = (evento: React.MouseEvent<HTMLButtonElement>): void => {
        const paginaARedireccionar = (evento.target as HTMLButtonElement).name;
        router.push(`/${paginaARedireccionar}`);
    };

    const hacerLogOut = (evento: React.MouseEvent<HTMLButtonElement>): void => { 
        localStorage.removeItem("usuarioAutenticado");
        router.push("/");
    };

    return (
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