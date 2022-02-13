import React, { useState } from 'react';
import styles from './auth.module.scss';
import { LoginForm } from './tabsAuth/LoginForm';
import { RegisterForm } from './tabsAuth/RegisterForm';

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');

  const handleLogin: React.MouseEventHandler<HTMLElement> = (e): void => {
    setActiveTab('login');
  };

  const handleRegister: React.MouseEventHandler<HTMLElement> = (e) => {
    setActiveTab('register');
  };

  return (
    <div className={styles.authDivContainer}>
      <h1 className={styles.authTitle}>
        <span className={styles.t}>t</span>
        <span className={styles.o}>o</span>
        <span className={styles.d}>d</span>
        <span className={styles.do}>o</span>
      </h1>

      <div className={styles.divFormContainer}>
        <ul className={styles.ulAuth}>
          <li
            onClick={handleLogin}
            className={activeTab === 'login' ? `${styles.activeLi} ${styles.loginAuth}` : `${styles.loginAuth}`}
          >
            Войти
          </li>
          <li
            onClick={handleRegister}
            className={activeTab === 'register' ? `${styles.activeLi}` : ''}
          >
            Зарегистрироваться
          </li>
        </ul>
        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Auth;
