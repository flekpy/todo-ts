import axios from 'axios';
import { Dispatch } from 'redux';
import { UserAction, UserActionTypes } from '../types/typesUser';

export const regUser = (userData: object) => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.REGISTER_USER_LOADING });
    const newUserData = await axios.post('http://localhost:5000/api/reg/users', userData);
    dispatch({ type: UserActionTypes.REGISTER_USER_SUCCESS, payload: newUserData.data });
    console.log(newUserData, 'ответ бэка');
  } catch (error) {
    dispatch({ type: UserActionTypes.REGISTER_USER_ERROR, payload: 'Ошибка при регистрации' });
  }
};
