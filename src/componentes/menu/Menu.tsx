import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { PerfilPaciente, consultarPerfil } from "../../servicios/paciente/PacienteService";

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

    const obtenerUsuarioAutenticado = (): string | null =>
        localStorage.getItem("usuarioAutenticado");

    const validarUsuarioAutenticado = (): void => {
        const usuario = obtenerUsuarioAutenticado();
        if(!usuario) {
            router.push("/");
            return;
        }
        const perfil = consultarPerfil(usuario);
        setEstado(obtenerEstadoConPerfil(estado, perfil));
    };

    useEffect(() => {
        validarUsuarioAutenticado();
    }, [querying]);

    const handleClick = (evento: React.MouseEvent<HTMLButtonElement>): void => {
        const paginaARedireccionar = (evento.target as HTMLButtonElement).name;
        router.push(`/${paginaARedireccionar}`);
    };

    return (
        <>
        <h1>Este es el menu</h1>
        <h2>Bienvenido</h2>
        <button name="perfil" onClick={handleClick}>Perfil</button>
        <button name="enfermedades" onClick={handleClick}>Enfermedades</button>
        <button name="consultasmedicas" onClick={handleClick}>Consultas Médicas</button>
        <button name="planbienestar" onClick={handleClick}>Plan de Bienestar</button>
        </>
    );
};

export default Menu;