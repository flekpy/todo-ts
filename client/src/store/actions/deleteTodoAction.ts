import axios from 'axios';
import { Dispatch } from 'redux';
import { TodoAction, TodoActionTypes } from '../types/typesTodo';

export const deleteTodo = (todoId: number) => async (dispatch: Dispatch<TodoAction>) => {
  try {
    dispatch({ type: TodoActionTypes.ADD_TODO_LOADING });
    const { data } = await axios.delete(`http://localhost:5000/api/todos/${todoId}`);
    dispatch({ type: TodoActionTypes.DELETE_TODO_SUCCESS, payload: Number(data) });
  } catch (error) {
    dispatch({ type: TodoActionTypes.ADD_TODO_ERROR, payload: 'Ошибка сервера' });
  }
};
