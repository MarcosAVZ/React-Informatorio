export type Album= {
    id: number;
    image: string;
    title?: string;
    artists: string;
    radio?: boolean;
    seccion?: string;
    onClick?: () => void;
}

