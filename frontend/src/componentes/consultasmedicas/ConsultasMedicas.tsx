import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { ConsultaMedica, consultarConsultasMedicas } from "../../servicios/paciente/PacienteService";
import Utils from "../../utils/Utils";

type ConsultasMedicasParams = {};

type ConsultasMedicasEstado = {
    consultas: ConsultaMedica[]
};

const obtenerEstadoConConsultas = (estadoActual: ConsultasMedicasEstado | null, consultas: ConsultaMedica[]): ConsultasMedicasEstado => {
    return { ...estadoActual, consultas };
};

const ConsultasMedicas = (_:ConsultasMedicasParams): JSX.Element => {
    const [estado, setEstado] = useState<ConsultasMedicasEstado | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        Utils.validarUsuarioAutenticado()
        .then(token => consultarConsultasMedicas(token))
        .then(consultas => {
            setEstado(obtenerEstadoConConsultas(estado, consultas));
            setCargando(false);
        })
        .catch(() => router.push("/"));
    }, []);
    
    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/menu");
    };

    return cargando ? <div>Cargando ...</div> : (
        <Grid container>
            <Grid item>
                <h1>Citas Médicas en último año</h1>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sitio</TableCell>
                                <TableCell>Fecha</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { estado?.consultas.map((consulta, index) =>
                            <TableRow key={index}>
                                <TableCell>{consulta.sitio}</TableCell>
                                <TableCell>{ `${consulta.fecha}` }</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <Button onClick={regresarAlMenu} variant="contained" color="primary">Regesar al Menú</Button>
            </Grid>
        </Grid>
    );
};

export default ConsultasMedicas;