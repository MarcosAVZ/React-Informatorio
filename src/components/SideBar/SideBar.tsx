import React, { useState } from 'react';
import styles from './SideBar.module.css';

interface Playlist {
  titulo: string;
  descripcion?: string;
  imagen?: string;
}

const SideBar = () => {
  const [showForm, setShowForm] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [titlePlaylist, setTitlePlaylist] = useState('');
  const [imagenPlayList, setImagen] = useState('');
  const [descripcionPlayList, setDescripcion] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const img = new window.Image();
    img.onload = () => {
      setPlaylists([
      ...playlists,
      {
        titulo: titlePlaylist,
        imagen: imagenPlayList || "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
        descripcion: descripcionPlayList,
      },
      ]);
    };
    img.onerror = () => {
      setPlaylists([
      ...playlists,
      {
        titulo: titlePlaylist,
        imagen: "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
        descripcion: descripcionPlayList,
      },
      ]);
    };
    img.src = imagenPlayList || "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";
    setTitlePlaylist('');
    setImagen('');
    setDescripcion('');
    setShowForm(false);
  };

  return (
    <div className={styles.sidebar}>
      <button className={styles.addPlayListButton} onClick={() => setShowForm(true)}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" ></path> </g></svg>
      </button>
      {showForm && (
        <div className={styles.formContainer}>
          <form className={styles.formulario} onSubmit={handleSubmit}>
              <h1 className={styles.fotmularioTitle}>Crea Tu PlayList</h1>
            
                <div className={styles.preview}>
                  <img
                    className={styles.playlistImagen}
                    src={imagenPlayList || "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"}
                    alt={titlePlaylist || "Imagen por defecto"}
                    onError={(e) => {
                      e.currentTarget.src = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";
                    }}
                  />
                  <div className={styles.playlistInfo}>
                    {!titlePlaylist && <h1 className={styles.playlistTitle} >PlayList</h1>}
                    {titlePlaylist && <h1 className={styles.playlistTitle} >{titlePlaylist}</h1>}
                    {descripcionPlayList && <p className={styles.playlistDescripcion}>{descripcionPlayList}</p>}
                  </div>
                </div>
          <div className={styles.formCamposContainer}>
            <div className={styles.formCampo}>
              <label htmlFor="playlistTitle">Título</label>
              <input
                className={styles.inputTitle}
                type="text"
                id="playlistTitle"
                value={titlePlaylist}
                maxLength={28}
                onChange={(e) => setTitlePlaylist(e.target.value)}
                placeholder='PlayList'
              />
            </div>
            <div className={styles.formCampo}>
              <label htmlFor="playlistImage">URL De La Imagen</label>
              <input
                className={styles.inputImagen}
                type="text"
                id="playlistImage"
                value={imagenPlayList}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="URL de la imagen"
              />
            </div>
            <div className={styles.formCampo}>
              <label htmlFor="playlistDescription">Descripción</label>
              <textarea
                className={styles.textArea}
                rows={4}
                id="playlistDescription"
                value={descripcionPlayList}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción"
                maxLength={250}
              />
            </div>
            <button className={styles.BtnAddPlaylist} type="submit">Crear playlist</button>
            <button className={styles.BtnClose} type="button" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
            
          </form>
            
        </div>
      )}
      <ul className={styles.playlists}>
        {playlists.map((playlist, index) => (
            <li key={index} className={styles.playlistItem}>
              <div className={styles.playlistImageWrapper} style={{ position: 'relative', display: 'inline-block' }}>
                {playlist.imagen && (
                <img
                  className={styles.playlistImagenMini}
                  src={playlist.imagen}
                  alt="Playlist"
                  title=""
                  onMouseEnter={e => {
                  const prev = e.currentTarget.parentElement?.querySelector(`.${styles.recuadroInfo}`);
                  if (prev) prev.remove();
                  const recuadroInfo = document.createElement('div');
                  recuadroInfo.className = styles.recuadroInfo;
                    recuadroInfo.innerHTML = `
                      <h2 class="${styles.recuadroStyleTitle}">${playlist.titulo.slice(0,15)}${playlist.titulo.length > 15 ? '...' : ''}</h2>
                      ${playlist.descripcion ? `<div class="${styles.recuadroStyleDescripcion}">${playlist.descripcion.slice(0, 40)}${playlist.descripcion.length > 40 ? '...' : ''}</div>` : ''}
                    `;
                  e.currentTarget.parentElement?.appendChild(recuadroInfo);
                  }}
                  onMouseLeave={e => {
                  const recuadroInfo = e.currentTarget.parentElement?.querySelector(`.${styles.recuadroInfo}`);
                  if (recuadroInfo) recuadroInfo.remove();
                  }}
                />
                )}
              </div>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;