import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Enfermedad,
    consultarEnfermedadesDelPaciente, 
    consultarEnfermedadesDisponibles, 
    almacenarEnfermedadesPaciente } from "../../servicios/paciente/PacienteService";
import Utils from "../../utils/Utils";

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

const renderizarEnfermedades = (titulo: string, enfermedades: Enfermedad[] | undefined | null, clickCallbackFn: (id: number) => void): JSX.Element => {
    return (!enfermedades || enfermedades.length === 0) ? <div></div> : (
        <>
        <h1>{titulo}</h1>
        <ul>
            { enfermedades.map(enfermedad =>
                <li key={`P_${enfermedad.id}`} onClick={() => clickCallbackFn(enfermedad.id)}>{ enfermedad.nombre }</li>) }
        </ul>
        </>
    );
};

const Enfermedades = (_:EnfermedadesParams): JSX.Element => {
    const [estado, setEstado] = useState<EnfermedadesEstado | null>(null);
    const [enfermedadesDisponibles, setEnfermedadesDisponibles] = useState<Enfermedad[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        Utils.validarUsuarioAutenticado(() => router.push("/"),
            usuarioAutenticado => {
                const delPaciente = consultarEnfermedadesDelPaciente(usuarioAutenticado);
                const habilitadas = consultarEnfermedadesDisponibles();
                setEstado(obtenerEstadoConEnfermedades(estado, usuarioAutenticado, delPaciente, habilitadas));
                setEnfermedadesDisponibles(habilitadas);
                setCargando(false);
        });
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
        const resultadoAccion = almacenarEnfermedadesPaciente(estado?.usuario as string, estado?.enfermedadesDelPaciente as Enfermedad[]);
        if(resultadoAccion.exitosa) console.log("Exitoso !!");
        else console.log("Error !!");
    };

    const regresarAlMenu = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/menu");
    };

    return cargando ? <div></div> : (
        <>
        { renderizarEnfermedades("Estas son las Enfermedades del Paciente", estado?.enfermedadesDelPaciente, quitarEnfermedadDePaciente) }
        <br />
        { renderizarEnfermedades("Estas son las Enfermedades Disponibles a asignar", estado?.enfermedadesDisponibles, agregarEnfermedadAPaciente) }
        <br />
        <button onClick={almacenar}>Almacenar Asignación de Enfermedades</button>
        <br />
        <button onClick={regresarAlMenu}>Regesar al Menu</button>
        </>
    );
};

export default Enfermedades;