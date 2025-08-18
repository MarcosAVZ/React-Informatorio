import styles from './pageError.module.css';

function PageError() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Página no encontrada</h2>
                <p className={styles.description}>Lo sentimos, la página que estás buscando no existe.</p>
                <button className={styles.button} onClick={() => window.history.back()}>Volver atrás</button>
            </div>
        </div>
    );
    }

export default PageError;