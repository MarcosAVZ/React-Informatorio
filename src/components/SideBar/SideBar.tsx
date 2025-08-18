import { useState, useEffect } from 'react';
import styles from './SideBar.module.css';
import { albumService } from '../../data/service';
import { useNavigate } from 'react-router';
import type { Album } from '../../models/album';
import ErrorComponents from '../Error/ErrorComponent';

const SideBar = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const data = await albumService.getAllAlbums();
        setAlbums(data);
      } catch (error) {
        console.error("Error al cargar los álbumes:", error);
        setError(true)
      } finally {
        setLoading(false);
    }
    };
    loadAlbums();
  }, []);


  if (loading) {
    return <div className={styles.loading}>
            <div className={styles.loadingIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
    </div>;
  }
  
  if (errors) {
    return <ErrorComponents mensaje="Error al cargar los álbumes" />;
  }

  return (
    <div className={styles.sidebar}>
      <button className={styles.addPlayListButton} onClick={() => navigate('/AgregarAlbum')}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
          <g id="SVGRepo_iconCarrier"> 
            <path d="M4 12H20M12 4V20" ></path> 
          </g>
        </svg>
      </button>

      <ul className={styles.playlists}>
        {albums.slice().reverse().map((album, index) => (
          <li key={index} className={styles.playlistItem}>
            <div className={styles.playlistImageWrapper} style={{ position: 'relative', display: 'inline-block' }}>
              {album.image && (
                <img
                  className={styles.playlistImagenMini}
                  src={album.image}
                  alt={album.title}
                  title=""

                  onClick={() => {
                    if (album.title === "Tus Me Gusta") {
                      navigate(`/likeSong`);
                    } else {
                      navigate(`/album/${album.id}`);
                    }
                  }}
                  onMouseEnter={e => {
                    const prev = document.querySelector(`.${styles.recuadroInfo}`);
                    if (prev) prev.remove();
                    const recuadroInfo = document.createElement('div');
                    recuadroInfo.className = styles.recuadroInfo;
                    recuadroInfo.innerHTML = `
                        <h2 class="${styles.recuadroStyleTitle}">${album.title ? album.title.slice(0,14) + (album.title.length > 14 ? '...' : '') : album.creadoPor.slice(0,14) + (album.creadoPor.length > 14 ? '...' : '')}</h2>
                    `;
                    document.body.appendChild(recuadroInfo);
                    const rect = e.currentTarget.getBoundingClientRect();
                    recuadroInfo.style.top = `${rect.top + rect.height / 2 - recuadroInfo.offsetHeight / 2}px`;
                    recuadroInfo.style.left = `${rect.right + 10}px`;
                  }}
                  onMouseLeave={ () => {
                    const recuadroInfo = document.querySelector(`.${styles.recuadroInfo}`);
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