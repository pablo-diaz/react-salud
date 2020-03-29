import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

    const irA = (paginaDestino: string): void => {
        router.push(`/${paginaDestino}`);
    };

    const hacerLogOut = (evento: React.MouseEvent<HTMLButtonElement>): void => { 
        Utils.borrarUsuarioDesdeStorage();
        router.push("/");
    };

    return cargando ? <div>Cargando ....</div> : (
        <Grid container justify="center">
            <Grid item>
                <h1>Menú Principal</h1>
                <h2>Bienvenido { estado?.perfil.nombreCompleto }</h2>
                <Button onClick={() => irA("perfil")} variant="contained">Perfil</Button><br /><br />
                <Button onClick={() => irA("enfermedades")} variant="contained">Enfermedades</Button><br /><br />
                <Button onClick={() => irA("consultasmedicas")} variant="contained">Consultas Médicas</Button><br /><br />
                <Button onClick={() => irA("planbienestar")} variant="contained">Plan de Bienestar</Button><br /><br />
                <Button onClick={hacerLogOut} variant="contained" color="secondary">Logout</Button>
            </Grid>
        </Grid>
    );
};

export default Menu;