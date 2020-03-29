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

export const consultarPerfil = async (token: string) : Promise<PerfilPaciente> => {
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `https://localhost:5001/paciente/perfil`;
    const { data } = await axios.get<PerfilPaciente>(url, { headers });
    return data;
};

export const consultarEnfermedadesDelPaciente = async (token: string) : Promise<Enfermedad[]> => {
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `https://localhost:5001/paciente/enfermedades`;
    const { data } = await axios.get<Enfermedad[]>(url, { headers });
    return data;
};

export const consultarEnfermedadesDisponibles = async (token: string) : Promise<Enfermedad[]> => {
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `https://localhost:5001/paciente/enfermedadesDisponibles`;
    const { data } = await axios.get<Enfermedad[]>(url, { headers });
    return data;
};

export const almacenarEnfermedadesPaciente = async (token: string, enfermedades: Enfermedad[]): Promise<string> => {
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `https://localhost:5001/paciente/enfermedades`;
    const { data } = await axios.post<string>(url, enfermedades, { headers });
    return data;
}

export const consultarConsultasMedicas = async (token: string) : Promise<ConsultaMedica[]> => {
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `https://localhost:5001/paciente/citasMedicas`;
    const { data } = await axios.get<ConsultaMedica[]>(url, { headers });
    return data;
};

export const consultarActividadesDisponibles = async (token: string) : Promise<Actividad[]> => {
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `https://localhost:5001/paciente/actividadesDisponibles`;
    const { data } = await axios.get<Actividad[]>(url, { headers });
    return data;
};

export const evaluarActividadesContraEnfermedades = async (token: string, actividades: Actividad[]): Promise<ResultadoOperacion<Enfermedad[]>> => {
    if(!actividades || actividades.length === 0)
        return crearResultadoParaFalla(["No se han seleccionado actividades aun"]);
    
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `https://localhost:5001/paciente/evaluarActividadesContraEnfermedades`;
    const { data } = await axios.post<Enfermedad[]>(url, actividades, { headers });
    return crearResultadoParaExito(data);
};