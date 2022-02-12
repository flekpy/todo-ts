import axios from 'axios';
import { Dispatch } from 'redux';
import { UserAction, UserActionTypes } from '../types/typesUser';

export const regUser = (userData: object) => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.REGISTER_USER_LOADING });
    const headers = {
      'Content-Type': 'application/json',
    };
    const { data } = await axios.post('http://localhost:5000/api/users/registration', userData, { headers, withCredentials: true });
    if (data.message === 'Регистрация прошла успешно') {
      dispatch({ type: UserActionTypes.REGISTER_USER_SUCCESS, payload: data.user });
    } else if (data.message !== 'Регистрация прошла успешно') {
      dispatch({ type: UserActionTypes.REGISTER_USER_ERROR, payload: 'Ошибка при регистрации' });
    }
  } catch (error) {
    dispatch({ type: UserActionTypes.REGISTER_USER_ERROR, payload: 'Ошибка при регистрации' });
  }
};

export const loginUser = (userData: object) => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.REGISTER_USER_LOADING });
    const headers = {
      'Content-Type': 'application/json',
    };
    const { data } = await axios.post('http://localhost:5000/api/users/login', userData, { headers, withCredentials: true });
    if (data.message === 'Авторизация прошла успешно') {
      dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: data.user });
    } else if (data.message !== 'Авторизация прошла успешно') {
      dispatch({ type: UserActionTypes.REGISTER_USER_ERROR, payload: 'Ошибка при авторизации' });
    }
  } catch (error) {
    dispatch({ type: UserActionTypes.REGISTER_USER_ERROR, payload: 'Ошибка при регистрации' });
  }
};

export const logoutUser = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.REGISTER_USER_LOADING });
    const headers = {
      'Content-Type': 'application/json',
    };
    const data = await axios.get('http://localhost:5000/api/users/logout', { headers, withCredentials: true });

    if (data.status === 200) {
      dispatch({ type: UserActionTypes.LOGOUT_USER_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: UserActionTypes.REGISTER_USER_ERROR, payload: 'Ошибка при выходе из системы' });
  }
};

export const authUser = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.REGISTER_USER_LOADING });
    const headers = {
      'Content-Type': 'application/json',
    };
    const { data } = await axios.get('http://localhost:5000/api/users/me', { headers, withCredentials: true });
    if (data.user) {
      dispatch({ type: UserActionTypes.AUTH_USER_SUCCESS, payload: data.user });
    } else {
      dispatch({ type: UserActionTypes.REGISTER_USER_ERROR, payload: 'Пользователь не авторизован' });
    }
  } catch (error) {
    dispatch({ type: UserActionTypes.REGISTER_USER_ERROR, payload: 'Пользователь не авторизован' });
  }
};
