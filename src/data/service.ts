import { musicDB, getNextMusicId, albumDB, getNextAlbumId } from './data.ts';
import type { Music } from '../models/music.tsx';
import type { Album } from '../models/album.tsx';

// Simulate API delay
const delay = (ms: number = 300): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock API service with CRUD operations
export const musicService = {
  // GET all songs
    async getAllSongs(): Promise<Music[]> {
        await delay(700);
        // Load from localStorage if available, fallback to initial data
        const stored = localStorage.getItem('musicDB');
        if (stored) {
            return JSON.parse(stored) as Music[];
        }
    return [...musicDB];
},

  // GET song by ID
async getSongById(id: number): Promise<Music> {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs = stored ? JSON.parse(stored) : musicDB;
    const song = songs.find((s: Music) => s.id === id);
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  },

  // GET songs by categorias
  async getSongsByGenre(categorias: string): Promise<Music[]> {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs = stored ? JSON.parse(stored) : musicDB;

    if (!categorias) {
      throw new Error('Genre parameter is required');
    }

    return songs.filter((song: Music) =>
      song.categorias.some((g) => g.toLowerCase() === categorias.toLowerCase())
    );
  },

  // GET songs by artista
  async getSongsByArtist(artista: string): Promise<Music[]> {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs = stored ? JSON.parse(stored) : musicDB;

    if (!artista) {
      throw new Error('Artist parameter is required');
    }

    return songs.filter((song: Music) =>
      song.artista.toLowerCase().includes(artista.toLowerCase())
    );
  },

  // GET all categoriass with songs grouped by categorias
  async getCategorias()  {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs = stored ? JSON.parse(stored) : musicDB;

    const categoriasMap: { [key: string]: Music[] } = {};

    songs.forEach((song: Music) => {
      song.categorias.forEach((categorias) => {
        if (!categoriasMap[categorias]) {
          categoriasMap[categorias] = [];
        }
        categoriasMap[categorias].push(song);
      });
    });

    // Convert to array format with categorias name and songs
    return Object.keys(categoriasMap)
      .map((categorias) => ({
        categorias,
        songs: categoriasMap[categorias],
      }))
      .sort((a, b) => a.categorias.localeCompare(b.categorias));
  },

  // POST - Create new song
  async createSong(songData: Music): Promise<Music> {
    await delay(400);
    const stored = localStorage.getItem('musicDB');
    const songs = stored ? JSON.parse(stored) : [...musicDB];

    const newSong = {
      ...songData,
      id: getNextMusicId(),
      cover:
        songData.imagen ||
        'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    };

    songs.push(newSong);
    localStorage.setItem('musicDB', JSON.stringify(songs));
    return newSong;
  },

  // PUT - Update existing song
  async updateSong(id: string, songData: Music): Promise<Music> {
    await delay(400);
    const stored = localStorage.getItem('musicDB');
    const songs = stored ? JSON.parse(stored) : [...musicDB];

    const index = songs.findIndex((s: Music) => s.id === parseInt(id));
    if (index === -1) {
      throw new Error('Song not found');
    }

    songs[index] = { ...songs[index], ...songData };
    localStorage.setItem('musicDB', JSON.stringify(songs));
    return songs[index];
  },

  // DELETE song
  async deleteSong(id: number): Promise<{ success: boolean }> {
    await delay(300);
    const stored = localStorage.getItem('musicDB');
    const songs = stored ? JSON.parse(stored) : [...musicDB];

    const index = songs.findIndex((s: Music) => s.id === id);
    if (index === -1) {
      throw new Error('Song not found');
    }

    songs.splice(index, 1);
    localStorage.setItem('musicDB', JSON.stringify(songs));
    return { success: true };
  },

  // Search songs
  async searchSongs(query: string): Promise<Music[]> {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs = stored ? JSON.parse(stored) : musicDB;

    if (!query) return songs;

    return songs.filter(
      (song: Music) =>
        song.nombre.toLowerCase().includes(query.toLowerCase()) ||
        song.artista.toLowerCase().includes(query.toLowerCase()) ||
        //song.album.toLowerCase().includes(query.toLowerCase()) ||
        song.categorias.some((g) => g.toLowerCase().includes(query.toLowerCase()))
    );
  },
};



















// Mock API service con operaciones CRUD
export const albumService = {
  // GET todos los álbumes
  async getAllAlbums(): Promise<Album[]> {
    await delay(700);
    const stored = localStorage.getItem('albumDB');
    if (stored) {
      return JSON.parse(stored) as Album[];
    }
    return [...albumDB];
  },

  // GET álbum por ID
  async getAlbumById(id: number): Promise<Album> {
    await delay(200);
    const stored = localStorage.getItem('albumDB');
    const albums = stored ? JSON.parse(stored) : albumDB;
    const album = albums.find((a: Album) => a.id === id);
    if (!album) {
      throw new Error('Álbum no encontrado');
    }
    return album;
  },

  // GET álbumes por artista
  async getAlbumsByArtist(artista: string): Promise<Album[]> {
    await delay(200);
    const stored = localStorage.getItem('albumDB');
    const albums = stored ? JSON.parse(stored) : albumDB;

    if (!artista) {
      throw new Error('Parámetro artista es requerido');
    }

    return albums.filter((album: Album) =>
      album.artists.toLowerCase().includes(artista.toLowerCase())
    );
  },



  // POST - Crear nuevo álbum
  async createAlbum(albumData: Album): Promise<Album> {
    await delay(400);
    const stored = localStorage.getItem('albumDB');
    const albums = stored ? JSON.parse(stored) : [...albumDB];

    const newAlbum = {
      ...albumData,
      id: getNextAlbumId(),
      image:
        albumData.image ||
        'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    };

    albums.push(newAlbum);
    localStorage.setItem('albumDB', JSON.stringify(albums));
    return newAlbum;
  },

  // PUT - Actualizar álbum existente
  async updateAlbum(id: string, albumData: Album): Promise<Album> {
    await delay(400);
    const stored = localStorage.getItem('albumDB');
    const albums = stored ? JSON.parse(stored) : [...albumDB];

    const index = albums.findIndex((a: Album) => a.id === parseInt(id));
    if (index === -1) {
      throw new Error('Álbum no encontrado');
    }

    albums[index] = { ...albums[index], ...albumData };
    localStorage.setItem('albumDB', JSON.stringify(albums));
    return albums[index];
  },

  // DELETE álbum
  async deleteAlbum(id: number): Promise<{ success: boolean }> {
    await delay(300);
    const stored = localStorage.getItem('albumDB');
    const albums = stored ? JSON.parse(stored) : [...albumDB];

    const index = albums.findIndex((a: Album) => a.id === id);
    if (index === -1) {
      throw new Error('Álbum no encontrado');
    }

    albums.splice(index, 1);
    localStorage.setItem('albumDB', JSON.stringify(albums));
    return { success: true };
  },

  // Buscar álbumes
  async searchAlbums(query: string): Promise<Album[]> {
    await delay(200);
    const stored = localStorage.getItem('albumDB');
    const albums = stored ? JSON.parse(stored) : albumDB;

    if (!query) return albums;

    return albums.filter(
      (album: Album) =>
        album.title?.toLowerCase().includes(query.toLowerCase()) ||
        album.artists.toLowerCase().includes(query.toLowerCase())
    );
  },
};