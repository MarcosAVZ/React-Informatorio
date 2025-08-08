import styles from './rectangleAlbumCard.module.css';
import type { Album } from '../../../models/album'; // Adjust the import path as necessary



function RectangleAlbumCard({ image, title, onClick }: Album) {
    return (
        <div className={styles.card} onClick={onClick}>
            <img src={image} alt={title} className={styles.image} />
            <h2 className={styles.title}>{title}</h2>
        </div>
    );
}

export default RectangleAlbumCard;