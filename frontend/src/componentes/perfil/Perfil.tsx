import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

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
            .then(token => consultarPerfil(token))
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
        <Grid container justify="center">
            <Grid item>
                <h1>Perfil del Paciente</h1>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow key={1}>
                                <TableCell>Nombre</TableCell>
                                <TableCell>{estado?.info.nombreCompleto}</TableCell>
                            </TableRow>
                            <TableRow key={2}>
                                <TableCell>Edad</TableCell>
                                <TableCell>{estado?.info.edad}</TableCell>
                            </TableRow>
                            <TableRow key={3}>
                                <TableCell>Género</TableCell>
                                <TableCell>{estado?.info.genero}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <Button onClick={regresarAlMenu} variant="contained" color="primary">Regesar al Menú</Button>
            </Grid>
        </Grid>
    );
};

export default Perfil;