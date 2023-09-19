export interface Empleado {
    tdoc_empleado: string;
    id_empleado : number;
    nombre_1: string;
    nombre_2: string;
    apellido_1: string;
    apellido_2: string;
    direccion: string;
    rol: number;
    estado: boolean;
    salario: number;
    pass_empleado: string;
}

export interface EmpleadoConVisibilidad extends Empleado {
    mostrarTabla: boolean;
}