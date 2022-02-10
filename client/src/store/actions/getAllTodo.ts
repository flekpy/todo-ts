import axios from 'axios';
import { Dispatch } from 'redux';
import { TodoAction, TodoActionTypes } from '../types/typesTodo';

export const getAllTodo = (userId: number) => async (dispatch: Dispatch<TodoAction>) => {
  try {
    dispatch({ type: TodoActionTypes.ADD_TODO_LOADING });
    const { data } = await axios.get(`http://localhost:5000/api/todos/${userId}`);
    dispatch({ type: TodoActionTypes.GET_ALL_TODO_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: TodoActionTypes.ADD_TODO_ERROR, payload: 'Ошибка сервера' });
  }
};
