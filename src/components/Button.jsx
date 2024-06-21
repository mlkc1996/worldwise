import styles from './Button.module.css';

function Button({ children, onClick, type }) {

    const hasOnClick = typeof onClick === "function";


    return (
        <button onClick={hasOnClick ? onClick : () => { }}
            className={`${styles.btn} ${styles[type]}`}
        >
            {children}
        </button>
    );
}

export default Button;
