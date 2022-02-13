import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { regUser } from '../../../store/actions/userAction';
import styles from './loginAndReg.module.scss';
import { useTypedSelector } from '../../../hooks/useTypeSelector';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = useTypedSelector((state) => state.user.userData.id);

  useEffect(() => {
    if (userID !== null) {
      navigate(`/users/${userID}`);
    }
  }, [userID]);

  const initStateInputs = {
    name: '',
    email: '',
    password: '',
  };
  const [register, setRegister] = useState(initStateInputs);

  const changeInputRegister: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setRegister((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const newUser = async (event: any) => {
    event.preventDefault();
    if (!validator.isEmail(register.email)) {
      alert('Укажите электронную почту');
    } else if (!validator.isStrongPassword(
      register.password,
      {
        minSymbols: 0, minLength: 1, minLowercase: 0, minUppercase: 0, minNumbers: 1,
      },
    )) {
      alert('Пароль должен состоять из единицы и цифры, не менее 3 символов');
    } else {
      dispatch(regUser(register));
    }
  };

  return (
    <form onSubmit={newUser} className={styles.formAuth}>
      <input
        className={styles.inputFormAuth}
        type="text"
        placeholder="имя"
        name="name"
        onChange={changeInputRegister}
      />
      <input
        className={styles.inputFormAuth}
        type="text"
        placeholder="email"
        name="email"
        onChange={changeInputRegister}
      />
      <input
        className={styles.inputFormAuth}
        placeholder="пароль"
        name="password"
        type="password"
        onChange={changeInputRegister}
      />
      <button className={styles.btnFormAuth} type="submit">зарегистрироваться</button>
    </form>
  );
};
