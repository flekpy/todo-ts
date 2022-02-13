import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import styles from './loginAndReg.module.scss';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { loginUser } from '../../../store/actions/userAction';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = useTypedSelector((state) => state.user.userData?.id);

  useEffect(() => {
    if (userID !== null) {
      navigate(`/users/${userID}`);
    }
  }, [userID]);

  const initStateInputs = {
    email: '',
    password: '',
  };
  const [loginState, setLoginState] = useState(initStateInputs);

  const changeInputLogin: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setLoginState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const userLogin = async (event: any) => {
    event.preventDefault();
    if (!validator.isEmail(loginState.email)) {
      alert('Укажите электронную почту');
    } else if (!validator.isStrongPassword(
      loginState.password,
      {
        minSymbols: 0, minLength: 1, minLowercase: 0, minUppercase: 0, minNumbers: 1,
      },
    )) {
      alert('Пароль должен состоять из единицы и цифры, не менее 3 символов');
    } else {
      dispatch(loginUser(loginState));
    }
  };

  return (
    <form onSubmit={userLogin} className={styles.formAuth}>
      <input
        onChange={changeInputLogin}
        className={styles.inputFormAuth}
        type="text"
        placeholder="email"
        name="email"
      />
      <input
        onChange={changeInputLogin}
        className={styles.inputFormAuth}
        placeholder="пароль"
        name="password"
        type="password"
      />
      <button className={styles.btnFormAuth} type="submit">войти</button>
    </form>
  );
};
