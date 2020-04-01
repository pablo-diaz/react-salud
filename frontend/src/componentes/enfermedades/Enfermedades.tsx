import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Enfermedad,
    consultarEnfermedadesDelPaciente, 
    consultarEnfermedadesDisponibles, 
    almacenarEnfermedadesPaciente } from "../../servicios/paciente/PacienteService";
import Utils from "../../utils/Utils";
import { Seleccionable, ItemAPintar } from "../shared/seleccionable/Seleccionable";

type EnfermedadesParams = {};

type EnfermedadesEstado = {
    usuario: string,
    enfermedadesDelPaciente: Enfermedad[],
    enfermedadesDisponibles: Enfermedad[]
};

const obtenerEstadoConEnfermedades = (estadoActual: EnfermedadesEstado | null, usuario: string, 
        delPaciente: Enfermedad[], habilitadas: Enfermedad[]): EnfermedadesEstado => {
    const nuevasEnfermedadesDisponibles = habilitadas.filter(disponible => !delPaciente.find(paciente => paciente.id === disponible.id));
    return { ...estadoActual, usuario, enfermedadesDelPaciente: delPaciente, enfermedadesDisponibles: nuevasEnfermedadesDisponibles };
};

const notificarExito = (): void => {
    toast.success("Se han almacenado las enfermedades de este paciente exitosamente");
};

const notificarError = (errores: string[]): void => {
    errores.forEach(error => toast.error(error));
};

const mapearEnfermedadesAItems = (enfermedades: Enfermedad[] | undefined): ItemAPintar[] => {
    if(enfermedades)
        return enfermedades.map(enfermedad => { 
            return {id: enfermedad.id, nombre: enfermedad.nombre }
        });
    return [];
};

const Enfermedades = (_:EnfermedadesParams): JSX.Element => {
    const [estado, setEstado] = useState<EnfermedadesEstado | null>(null);
    const [enfermedadesDisponibles, setEnfermedadesDisponibles] = useState<Enfermedad[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        Utils.validarUsuarioAutenticado()
        .then(token => Promise.all([
            token, 
            consultarEnfermedadesDelPaciente(token), 
            consultarEnfermedadesDisponibles(token)]))
        .then(([usuarioAutenticado, delPaciente, habilitadas]) => {
            setEstado(obtenerEstadoConEnfermedades(estado, usuarioAutenticado, delPaciente, habilitadas));
            setEnfermedadesDisponibles(habilitadas);
            setCargando(false);
        })
        .catch(() => router.push("/"));
    }, []);

    const quitarEnfermedadDePaciente = (idEnfermedad: number): void => {
        const nuevasEnfermedadesPaciente = estado?.enfermedadesDelPaciente.filter(enfermedad => enfermedad.id !== idEnfermedad);
        setEstado(obtenerEstadoConEnfermedades(estado, estado?.usuario as string, nuevasEnfermedadesPaciente as Enfermedad[], enfermedadesDisponibles));
    };

    const agregarEnfermedadAPaciente = (idEnfermedad: number): void => {
        const enfermedadAAgregar = enfermedadesDisponibles.find(enfermedad => enfermedad.id === idEnfermedad);
        const nuevasEnfermedadesPaciente = estado?.enfermedadesDelPaciente.concat([enfermedadAAgregar as Enfermedad]);
        setEstado(obtenerEstadoConEnfermedades(estado, estado?.usuario as string, nuevasEnfermedadesPaciente as Enfermedad[], enfermedadesDisponibles));
    };

    const almacenar = (evento: React.MouseEvent<HTMLButtonElement>): void => {
        Utils.validarUsuarioAutenticado()
        .then(token => almacenarEnfermedadesPaciente(token, estado?.enfermedadesDelPaciente as Enfermedad[]))
        .then(_ => { notificarExito(); })
        .catch(razon => { notificarError([razon]); });
    };

    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/menu");
    };

    return cargando ? <div>Cargando ...</div> : (
        <>
        <Grid container >
            <Grid item>
                <Seleccionable
                    titulo="Estas son las Enfermedades del Paciente" 
                    items={ mapearEnfermedadesAItems(estado?.enfermedadesDelPaciente) }
                    onItemClick={quitarEnfermedadDePaciente}
                    textoBoton="Quitar" />
                <br />
                <Seleccionable
                    titulo="Estas son las Enfermedades Disponibles a asignar" 
                    items={ mapearEnfermedadesAItems(estado?.enfermedadesDisponibles) }
                    onItemClick={agregarEnfermedadAPaciente}
                    textoBoton="Añadir" />
                <br />
                <Button onClick={almacenar} variant="contained" color="primary">Almacenar Asignación de Enfermedades</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={regresarAlMenu} variant="contained" color="secondary">Regesar al Menú</Button>
            </Grid>
        </Grid>
        <ToastContainer />
        </>
    );
};

export default Enfermedades;