export interface Persona {
    tdoc: string;
    id: number;
    nombre_1: string;
    nombre_2: string;
    apellido_1: string;
    apellido_2: string;
    direccion: string;
    rol: number;
    estado: number;
    salario: number;
    pass: string;
}

export interface PersonaConVisibilidad extends Persona {
    mostrarTabla: boolean;
}
