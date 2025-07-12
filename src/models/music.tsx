type Music = {
    id: number;
    nombre: string;
    artista: string;
    src: string;
    imagen: string;
    meGusta?: boolean;
};


export const musicList: Music[] = [

    {
        id: 1,
        nombre: 'Africa',
        artista: 'Toto',
        src: '/Africa.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b2734a052b99c042dc15f933145b',
        meGusta: false,
    },
    {
        id: 2,
        nombre: 'Diva Virtual',
        artista: 'Porta',
        src: '/DivaVirtual.mp3',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmpdxHEDQpWF1qoPKvIDatx5sDkc5L_sc97Q&s',
        meGusta: false,
    },
    {
        id: 3,
        nombre: 'Don',
        artista: 'Miranda!',
        src: '/Don.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273143c72a64d265868dcc0dbc6',
        meGusta: false,
    },
    {
        id: 4,
        nombre: 'Frijolero',
        artista: 'Molotov',
        src: '/Frijolero.mp3',
        imagen: 'https://www.sopitas.com/wp-content/uploads/2024/04/historia-frijolero-molotov.jpeg',
        meGusta: false,
    },
    {
        id: 5,
        nombre: 'Latinoamérica',
        artista: 'Calle 13',
        src: '/Latinoamérica.mp3',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqR_2U-AVzWMOqO1o712tWEWBmLEjXAj1KQ&s',
        meGusta: false,
    },
    {
        id: 6,
        nombre: 'Me voy',
        artista: 'Julieta Venegas',
        src: '/MeVoy.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273a043fa84be801dca33dacca1',
        meGusta: false,
    },
    {
        id: 7,
        nombre: 'Vale la Pena',
        artista: 'Marc Anthony',
        src: '/ValeLaPena.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273536c9d3bdf8a3959efc41a0f',
        meGusta: false,
    },

]