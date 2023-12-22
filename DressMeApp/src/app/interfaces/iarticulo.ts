export interface Iarticulo {
    
    id?: String;
    titulo: String;
    publico: String;
    categoria: String;
    detalle: String;
    imagen:string[];
    precio: string | number;
    disponible: Boolean;
    fecha: Date;
}
