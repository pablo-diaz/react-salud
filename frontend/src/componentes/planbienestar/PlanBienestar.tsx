import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Actividad,
    consultarActividadesDisponibles,
    evaluarActividadesContraEnfermedades, 
    Enfermedad} from "../../servicios/paciente/PacienteService";
import Utils from "../../utils/Utils";

import { Seleccionable, ItemAPintar } from "../shared/seleccionable/Seleccionable";

type PlanBienestarParams = {};

type PlanBienestarEstado = {
    actividadesPaciente: Actividad[],
    actividadesDisponibles: Actividad[]
};

const obtenerEstadoPorDefecto = (): PlanBienestarEstado => {
    return { actividadesPaciente: [], actividadesDisponibles: [] };
};

const obtenerEstadoConActividades = (estadoActual: PlanBienestarEstado | null, 
        actividadesPaciente: Actividad[], disponibles: Actividad[]): PlanBienestarEstado => {
    const nuevasActividadesDisponibles = disponibles.filter(disponible => !actividadesPaciente.find(paciente => paciente.id === disponible.id));
    return { ...estadoActual, actividadesPaciente, actividadesDisponibles: nuevasActividadesDisponibles };
};

const mapearEnfermedadesAItems = (enfermedades: Enfermedad[] | undefined): ItemAPintar[] => {
    if(enfermedades)
        return enfermedades.map(enfermedad => { 
            return {id: enfermedad.id, nombre: enfermedad.nombre }
        });
    return [];
};

const mapearActividadesAItems = (actividades: Actividad[] | undefined): ItemAPintar[] => {
    if(actividades)
        return actividades.map(actividad => { 
            return {id: actividad.id, nombre: actividad.nombre }
        });
    return [];
};

const notificarError = (errores: string[]): void => {
    errores.forEach(error => toast.error(error));
};

const PlanBienestar = (_:PlanBienestarParams): JSX.Element => {
    const [estado, setEstado] = useState<PlanBienestarEstado>(obtenerEstadoPorDefecto());
    const [actividadesDisponibles, setActividadesDisponibles] = useState<Actividad[]>([]);
    const [enfermedades, setEnfermedades] = useState<Enfermedad[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        Utils.validarUsuarioAutenticado()
        .then(token => consultarActividadesDisponibles(token))
        .then(actividades => {
            setEstado(obtenerEstadoConActividades(estado, [], actividades));
            setActividadesDisponibles(actividades);
            setCargando(false);
        })
        .catch(() => router.push("/"));
    }, []);

    const quitarActividadDePaciente = (idActividad: number): void => {
        const nuevasActividadesPaciente = estado?.actividadesPaciente.filter(actividad => actividad.id !== idActividad);
        setEstado(obtenerEstadoConActividades(estado, nuevasActividadesPaciente as Actividad[], actividadesDisponibles));
        setEnfermedades([]);
    };

    const agregarActividadPaciente = (idActividad: number): void => {
        const actividadAAgregar = actividadesDisponibles.find(actividad => actividad.id === idActividad);
        const nuevasActividadesPaciente = estado?.actividadesPaciente.concat([actividadAAgregar as Actividad]);
        setEstado(obtenerEstadoConActividades(estado, nuevasActividadesPaciente as Actividad[], actividadesDisponibles));
        setEnfermedades([]);
    };

    const alEvaluarActividades = (evento: React.MouseEvent<HTMLButtonElement>): void => {
        Utils.validarUsuarioAutenticado()
        .then(token => evaluarActividadesContraEnfermedades(token, estado.actividadesPaciente))
        .then(resultadoEvaluacion => {
            if(resultadoEvaluacion.exitosa)
                setEnfermedades(resultadoEvaluacion.extraData as Enfermedad[]);
            else {
                notificarError(resultadoEvaluacion.errores as string[]);
                setEnfermedades([]);
            }
        })
        .catch(razon => notificarError([razon]));
    };

    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/menu");
    };

    return cargando ? <div>Cargando ...</div> : (
        <>
        <Grid container>
            <Grid item>
                <Seleccionable
                    titulo="Actividades seleccionadas para el Paciente" 
                    items={ mapearActividadesAItems(estado.actividadesPaciente) }
                    onItemClick={quitarActividadDePaciente}
                    textoBoton="Quitar" />
                <br />
                <Button onClick={alEvaluarActividades} variant="contained" color="primary">Evaluar Actividades</Button>
                <br />
                <Seleccionable
                    titulo="La siguientes son las posibles enfermedades, según las anteriores actividades" 
                    items={ mapearEnfermedadesAItems(enfermedades) } />
                <br />
                <Seleccionable
                    titulo="Actividades disponibles para seleccionar" 
                    items={ mapearActividadesAItems(estado.actividadesDisponibles) }
                    onItemClick={agregarActividadPaciente}
                    textoBoton="Agregar" />
                <br />
                <Button onClick={regresarAlMenu} variant="contained" color="secondary">Regesar al Menú</Button>
            </Grid>
        </Grid>
        <ToastContainer />
        </>
    );
};

export default PlanBienestar;