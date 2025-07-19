import { useParams } from "react-router-dom";
import { musicList } from "../../models/music";

import { categorias } from '../../models/categoria'
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

import styles from "./category.module.css";

import { useNavigate } from "react-router-dom";

function Category() {
  const { id } = useParams();
  const categoriaSeleccionada = categorias[Number(id) - 1];

  const navigate = useNavigate();

  const cancionesFiltradas = musicList.filter(song =>
    song.categorias?.includes(categoriaSeleccionada.nombre)
  );

  return (
    <div className={styles.categoryPage}>
      <NavBar />
      <SideBar />
      <div className={styles.content}>
        <h1 className={styles.title}>{categoriaSeleccionada.nombre}</h1>
        {cancionesFiltradas.length === 0 ? (
          <p className={styles.empty}>No hay canciones en esta categoría.</p>
        ) : (
          <ul className={styles.songList}>
            {cancionesFiltradas.map(song => (
              <li key={song.id} className={styles.songItem}>
                <img src={song.imagen} alt={song.nombre} className={styles.songImg} />
                <div className={styles.songInfo}>
                  <span           
                      className={styles.songName}
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => navigate(`/music/${song.id}`)}
                  >{song.nombre}</span>
                  <span className={styles.songArtist}>{song.artista}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Category;