export interface Administrador {
    apellido_1: string;
    apellido_2: string;
    direccion: string;
    id_admin?: number;
    nombre_1: string;
    nombre_2?: string;
    pass_admin?: string;
    rol?: number;
    tdoc_admin?: string;
}

export interface AdministradorConVisibilidad extends Administrador {
    mostrarTabla: boolean;
}
