import axios from "axios";

import { ResultadoOperacion, crearResultadoParaExito, crearResultadoParaFalla } from "../../utils/SharedDTOs";

export type PerfilPaciente = {
    nombreCompleto: string,
    edad: number,
    genero: string
};

export type Enfermedad = {
    id: number,
    nombre: string
};

export type ConsultaMedica = {
    sitio: string,
    fecha: Date
};

export type Actividad = {
    id: number,
    nombre: string
};

export const consultarPerfil = async (usuario: string) : Promise<PerfilPaciente> => {
    const url = `https://localhost:5001/paciente/perfil`;
    const { data } = await axios.get<PerfilPaciente>(url);
    return data;
};

export const consultarEnfermedadesDelPaciente = async (usuario: string) : Promise<Enfermedad[]> => {
    const url = `https://localhost:5001/paciente/enfermedades`;
    const { data } = await axios.get<Enfermedad[]>(url);
    return data;
};

export const consultarEnfermedadesDisponibles = async () : Promise<Enfermedad[]> => {
    const url = `https://localhost:5001/paciente/enfermedadesDisponibles`;
    const { data } = await axios.get<Enfermedad[]>(url);
    return data;
};

export const almacenarEnfermedadesPaciente = async (usuario: string, enfermedades: Enfermedad[]): Promise<string> => {
    const url = `https://localhost:5001/paciente/enfermedades`;
    const { data } = await axios.post<string>(url, enfermedades);
    return data;
}

export const consultarConsultasMedicas = async (usuario: string) : Promise<ConsultaMedica[]> => {
    const url = `https://localhost:5001/paciente/citasMedicas`;
    const { data } = await axios.get<ConsultaMedica[]>(url);
    return data;
};

export const consultarActividadesDisponibles = async () : Promise<Actividad[]> => {
    const url = `https://localhost:5001/paciente/actividadesDisponibles`;
    const { data } = await axios.get<Actividad[]>(url);
    return data;
};

export const evaluarActividadesContraEnfermedades = async (actividades: Actividad[]): Promise<ResultadoOperacion<Enfermedad[]>> => {
    if(!actividades || actividades.length === 0)
        return crearResultadoParaFalla(["No se han seleccionado actividades aun"]);
    
    const url = `https://localhost:5001/paciente/evaluarActividadesContraEnfermedades`;
    const { data } = await axios.post<Enfermedad[]>(url, actividades);
    return crearResultadoParaExito(data);
};