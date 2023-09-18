export interface Persona {
    tdoc_admin: string;
    tdoc_empleado: string;
    id_admin : number;
    id_empleado : number;
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
