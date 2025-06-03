import styles from './listenAlbumToMusic.module.css'; 




type ListenAlbumToMusic = {
    title: string;
    topTitle?: string;
    children: React.ReactNode;
};

function ListenAlbumToMusic({ title, topTitle, children }: ListenAlbumToMusic) {
    return (
        <div className={styles.listenAlbumToMusic}>
            {topTitle && <h3 className={styles.topTitle}>{topTitle}</h3>}
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.albumList}>
                {children}
            </div>  
        </div>
    );
}

export default ListenAlbumToMusic;