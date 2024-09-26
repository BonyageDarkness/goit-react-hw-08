import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Регистрация</h1>
            <RegistrationForm />
        </div>
    );
};

export default RegistrationPage;
