import React from "react";
import styles from "./LastListenedAlbums.module.css";

type LastListenedAlbumsProps = {
    children: React.ReactNode;
};


function LastListenedAlbums({ children }: LastListenedAlbumsProps) {
    return (
        <div className={styles.listenedAlbums}>
                {children} 
        </div>
    );
}

export default LastListenedAlbums;