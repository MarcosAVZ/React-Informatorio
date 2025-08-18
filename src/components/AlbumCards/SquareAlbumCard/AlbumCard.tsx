import styles from './SquareAlbumCard.module.css'; // Assuming you have a CSS file for styles
import type { Album } from '../../../models/album'; // Adjust the import path as necessary

function CardAlbumMusic({ image, title, creadoPor, radio = false, onClick }: Album) {
    return (
        <div className={styles.card} onClick={onClick}>
            <img src={image} alt={title} className={`${styles.imagen} ${radio ? styles.radio : ''}`}/>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.artist}>{creadoPor}</p>
        </div>
    );
}

export default CardAlbumMusic;