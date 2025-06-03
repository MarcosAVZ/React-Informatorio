import styles from './rectangleAlbumCard.module.css';


type CardAlbumMusicProps = {
    image: string;
    title: string;
}


function RectangleAlbumCard({ image, title }: CardAlbumMusicProps) {
    return (
        <div className={styles.card}>
            <img src={image} alt={title} className={styles.image} />
            <h2 className={styles.title}>{title}</h2>
        </div>
    );
}

export default RectangleAlbumCard;