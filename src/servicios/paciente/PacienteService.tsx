export type PerfilPaciente = {
    nombreCompleto: string,
    edad: number,
    genero: string
};

export type Enfermedad = {
    nombre: string
};

export type ConsultaMedica = {
    sitio: string,
    fecha: Date
};

export type PlanDeBienestar = {
    id: number,
    nombre: string,
    descripcion: string,
    explicacion: string
};

export const consultarPerfil = (usuario: string) : PerfilPaciente => {
    console.log("Consulta Perfil", usuario);
    return {nombreCompleto: "Pablo Andrés Díaz Patiño", edad: 41, genero: "Masculino"};
};

export const consultarEnfermedades = (usuario: string) : Enfermedad[] => {
    console.log("Consulta Enfermedades", usuario);
    return [
        { nombre: "Enfermedad 01" },
        { nombre: "Enfermedad 02" },
        { nombre: "Enfermedad 03" }
    ];
};

export const consultarConsultasMedicas = (usuario: string) : ConsultaMedica[] => {
    console.log("Consulta Consultas Medicas", usuario);
    return [
        { sitio: "Sitio 01", fecha: new Date(2019, 3, 25, 16, 15) },
        { sitio: "Sitio 02", fecha: new Date(2019, 5, 10, 11, 40) },
        { sitio: "Sitio 03", fecha: new Date(2019, 10, 20, 10, 15) },
        { sitio: "Sitio 04", fecha: new Date(2020, 2, 2, 9, 10) }
    ];
};

export const consultarPlanesBienestar = (usuario: string) : PlanDeBienestar[] => {
    console.log("Consulta Planes Bienestar", usuario);
    return [1, 2, 3, 4, 5].map(id => {
        return {
            id,
            nombre: `Plan 00${id}`,
            descripcion: `Esta es la descripcion del Plan 00${id}`,
            explicacion: `Esta es la explicación del Plan 00${id}`
        } 
    });
};