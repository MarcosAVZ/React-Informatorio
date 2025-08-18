import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import styles from './loading.module.css';

const Loading = () => {
    console.log("Cargando...");
    return (
        <>      
        <SideBar />
        <NavBar />
        <div className={styles.loadingContainer}>
            <div className={styles.loadingIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
        <div className={styles.loadingText}>Cargando...</div>
        </div>
        </>
    );
};

export default Loading;