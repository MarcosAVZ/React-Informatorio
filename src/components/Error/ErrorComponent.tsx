import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import styles from './Error.module.css';

interface ErrorProps {
  mensaje: string;
}

const ErrorComponents = ({ mensaje }: ErrorProps) => {
  return (
    <>
    <SideBar />
    <NavBar />
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className={styles.errorText}>{mensaje}</div>
    </div>
    </>
  );
};

export default ErrorComponents;