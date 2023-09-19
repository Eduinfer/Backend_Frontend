export interface Administrador {
    tdoc_admin: string;
    id_admin : number;
    nombre_1: string;
    nombre_2?: string;
    apellido_1: string;
    apellido_2: string;
    direccion: string;
    rol: number;
    estado: boolean;
    pass_admin: string;
}

export interface AdministradorConVisibilidad extends Administrador {
    mostrarTabla: boolean;
}
