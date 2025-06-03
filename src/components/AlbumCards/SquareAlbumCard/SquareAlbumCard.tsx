import styles from './SquareAlbumCard.module.css'; // Assuming you have a CSS file for styles

type CardAlbunMusicProps = {
    image: string;
    title?: string;
    artists: string;
    radio?: boolean;
}


function CardAlbumMusic({ image, title, artists, radio = false }: CardAlbunMusicProps) {
    return (
        <div className={styles.card}>
            <img src={image} alt={title} className={`${styles.imagen} ${radio ? styles.radio : ''}`}/>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.artist}>{artists}</p>
        </div>
    );
}

export default CardAlbumMusic;