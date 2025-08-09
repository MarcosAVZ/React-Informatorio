export type Music = {
    id: number;
    nombre: string;
    artista: string;
    src: string;
    imagen: string;
    meGusta?: boolean;
    categorias: string[]; // Nueva propiedad para categorías
    AlbumRelacion?: number[]; // Relación con otros álbumes
};

