import type { Music } from '../models/music.tsx';
import type { Album} from '../models/album.tsx';


export const musicDB: Music[] = [
    {
        id: 1,
        nombre: 'Africa',
        artista: 'Toto',
        src: '/Africa.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b2734a052b99c042dc15f933145b',
        meGusta: true,
        Album: ['Un Poco de Ruido'],
    },
    {
        id: 2,
        nombre: 'Diva Virtual',
        artista: 'Porta',
        src: '/DivaVirtual.mp3',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmpdxHEDQpWF1qoPKvIDatx5sDkc5L_sc97Q&s',
        meGusta: false,
        Album: ['Un Poco de Ruido'],
    },
    {
        id: 3,
        nombre: 'Don',
        artista: 'Miranda!',
        src: '/Don.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273143c72a64d265868dcc0dbc6',
        meGusta: false,
        Album: ['Un Poco de Ruido'],
    },
    {
        id: 4,
        nombre: 'Frijolero',
        artista: 'Molotov',
        src: '/Frijolero.mp3',
        imagen: 'https://www.sopitas.com/wp-content/uploads/2024/04/historia-frijolero-molotov.jpeg',
        meGusta: false,
        Album: ['Un Poco de Ruido'],

    },
    {
        id: 5,
        nombre: 'Latinoamérica',
        artista: 'Calle 13',
        src: '/Latinoamérica.mp3',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqR_2U-AVzWMOqO1o712tWEWBmLEjXAj1KQ&s',
        meGusta: false,
        Album: ['Un Poco de Ruido'],
    },
    {
        id: 6,
        nombre: 'Me voy',
        artista: 'Julieta Venegas',
        src: '/MeVoy.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273a043fa84be801dca33dacca1',
        Album: ['Un Poco de Ruido'],
        meGusta: true,
    },
    {
        id: 7,
        nombre: 'Vale la Pena',
        artista: 'Marc Anthony',
        src: '/ValeLaPena.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273536c9d3bdf8a3959efc41a0f',
        Album: ['Un Poco de Ruido'],
        meGusta: false,
    },
]

export const getNextMusicId = () => {
    const stored = localStorage.getItem('musicDB');
    const localSongs = stored ? JSON.parse(stored) : [];
    const allSongs = [...musicDB, ...localSongs];
    return Math.max(...allSongs.map((song) => song.id)) + 1;
};










export const albumDB: Album[] = [
    {
        id: 1,
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849d25907759522a25b86a3033",
        title: "Tus Me Gusta",
        creadoPor: "",
        radio: false,
        seccion: "Ultimo Escuchado",
    },
    {
        id: 2,
        image: "https://i.scdn.co/image/ab6761610000e5ebb3cf4936e79bdd3a28b09aee",
        title: "Un Poco de Ruido",
        creadoPor: "Artista",
        radio: true,
        seccion: "Ultimo Escuchado",
    },
    {
        id: 3,
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84763ad41af32e7e0658b4a7dd",
        title: "Las mejores Cumbias.argentinas",
        creadoPor: "instagram @chino.beats las mejores cumbias...",
        radio: false,
        seccion: "Ultimo Escuchado",
    },
    {
        id: 4,
        image: "https://is1-ssl.mzstatic.com/image/thumb/Music117/v4/7a/e2/a3/7ae2a3ec-5710-64e2-5f65-2dd02a934d6e/656291240726.jpg/600x600bf-60.jpg",
        title: "Devorando Intensidad",
        creadoPor: "El Plan De La Mariposa",
        radio: false,
        seccion: "Ultimo Escuchado",
    },
    {
        id: 5,
        image: "https://i.scdn.co/image/ab67616d0000b27308a404fd7ff6b0ac7febd5bf",
        title: "A Contraluz",
        creadoPor: "La Vela Puerca",
        radio: false,
        seccion: "Rock",
    },
    {
        id: 6,
        image: "https://i.scdn.co/image/ab67616d0000b2737cbf214a462056895cdac24e",
        title: "Palabra De To's",
        creadoPor: "Carín León",
        radio: false,
        seccion: "Ultimo Escuchado",
    },
    {
        id: 7,
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da845aca77eab3a20c4ef132bd81",
        title: "Rompiendo el Silencio",
        creadoPor: "Nestor En Bloque",
        radio: false,
        seccion: "Rock",
    },
    {
        id: 8,
        image: "https://i.scdn.co/image/ab676161000051745914c48d40ee28fe0074d426",
        title: "Mercedes Sosa",
        creadoPor: "Artista",
        radio: true,
        seccion: "Ultimo Escuchado",
    },
    {
        id: 9,
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84d3c7e071b8d21f513358e99e",
        title: "música nueva",
        creadoPor: "Tu mix semanal de música nueva y...",
        radio: false,
        seccion: "Otro",
    },
    {
        id: 10,
        image: "https://i.scdn.co/image/ab676161000051745914c48d40ee28fe0074d426",
        title: "FLOW",
        creadoPor: "Soledad, Chaqueño Palavecino, Abel Pintos...",
        radio: false,
        seccion: "Latino",
    },
    {
        id: 11,
        image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/artistmix/4VMYDCV2IEDYJArk749S6m/en",
        title: "",
        creadoPor: "Daddy Yankee, Anuel AA, Wisin y más",
        radio: false,
        seccion: "Reggaeton",
    },
    {
        id: 12,
        image: "https://i.scdn.co/image/ab6761610000e5eb4a12f1e3b5e88f2acb497e81",
        title: "",
        creadoPor: "Amar Azul, Los Charros, La Nueva Luna y más",
        radio: false,
        seccion: "Latino",
    },
    {
        id: 13,
        image: "https://m.media-amazon.com/images/I/51MxPRJK7xL._UXNaN_FMjpg_QL85_.jpg",
        title: "FLOW",
        creadoPor: "Geek Music, FLOW, Eve y más",
        radio: false,
        seccion: "Ultimo Escuchado",
    },
    {
        id: 14,
        image: "https://sm.mashable.com/mashable_in/article/h/how-to-get/how-to-get-the-spotify-ai-dj_qqdw.jpg",
        title: "DJ de Spotify",
        creadoPor: "Todo tipo de música, seleccionada por tu estilo",
        radio: false,
        seccion: "Ultimo Escuchado",
    },
    {
        id: 15,
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da845aca77eab3a20c4ef132bd81",
        title: "mix semanal",
        creadoPor: "Tu mix semanal de música nueva y...",
        radio: false,
        seccion: "Otro",
    },
    {
        id: 16,
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84475030aa0f2713f3e103bfcd",
        title: "FOLKLORE PARA EL ASADO",
        creadoPor: "El mejor Folklore para el Asado. Folklore del...",
        radio: false,
        seccion: "Folklore",
    },
    {
        id: 17,
        image: "https://i.scdn.co/image/ab67616d00001e027279daf2eeda4517d53121bc",
        title: "Los Manseros",
        creadoPor: "Con Los Manseros Santiagueños, Néstor...",
        radio: false,
        seccion: "Folklore",
    },
    {
        id: 18,
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8452bc81dac649e2c67e219abe",
        title: "REGUETON VIEJO",
        creadoPor: "Reguetón Viejito, perreo de antes y los clásicos...",
        radio: false,
        seccion: "Reggaeton",
    },
    {
        id: 19,
        image: "https://i.scdn.co/image/ab67616d0000b27338e72304b620159fb3f153ee",
        title: "Escencia",
        creadoPor: "Mario Luis",
        radio: false,
        seccion: "Latino",
    },
    {
        id: 20,
        image: "https://m.media-amazon.com/images/I/71vZTntGuqL._UF894,1000_QL80_.jpg",
        title: "Infest (UK Version)",
        creadoPor: "Papa Roach",
        radio: false,
        seccion: "Rock",
    },
    {
        id: 21,
        image: "https://s.mxmcdn.net/images-storage/albums4/5/6/0/8/5/2/47258065_500_500.jpg",
        title: "Sortilegio de Arrabal (En Vivo)",
        creadoPor: "Los Gardelitos",
        radio: false,
        seccion: "Rock",
    },
    {
        id: 22,
        image: "https://i.scdn.co/image/ab67616d0000b27388618511a51169b87f2f9bd5",
        title: "Entrega De Amor",
        creadoPor: "Los Ángeles Azules",
        radio: false,
        seccion: "Latino",
    },
];

export const getNextAlbumId = () => {
    const stored = localStorage.getItem('albumDB');
    const localSongs = stored ? JSON.parse(stored) : [];
    const allAlbum = [...albumDB, ...localSongs];
    return Math.max(...allAlbum.map((song) => song.id)) + 1;
};
