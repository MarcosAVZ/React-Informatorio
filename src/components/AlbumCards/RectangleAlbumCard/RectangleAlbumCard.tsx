import styles from './rectangleAlbumCard.module.css';


type CardAlbumMusicProps = {
    image: string;
    title: string;
    onClick?: () => void;
}


function RectangleAlbumCard({ image, title, onClick }: CardAlbumMusicProps) {
    return (
        <div className={styles.card} onClick={onClick}>
            <img src={image} alt={title} className={styles.image} />
            <h2 className={styles.title}>{title}</h2>
        </div>
    );
}

export default RectangleAlbumCard;