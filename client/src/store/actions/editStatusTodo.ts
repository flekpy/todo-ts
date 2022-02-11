import axios from 'axios';
import { Dispatch } from 'redux';
import { TodoAction, TodoActionTypes } from '../types/typesTodo';

export const editStatusCompleted = (payload: any) => async (dispatch: Dispatch<TodoAction>) => {
  try {
    const { data } = await axios.put(`http://localhost:5000/api/todos/${payload.id}`, { completed: payload.completed });
    dispatch({ type: TodoActionTypes.EDIT_STATUS_COMPLETED, payload: data });
  } catch (error) {
    dispatch({ type: TodoActionTypes.ADD_TODO_ERROR, payload: 'Ошибка сервера' });
  }
};

export const editTodoThunk = (payload: any) => async (dispatch: Dispatch<TodoAction>) => {
  try {
    dispatch({ type: TodoActionTypes.ADD_TODO_LOADING });
    const { data } = await axios.put(`http://localhost:5000/api/todos/edit/${payload.id}`, payload);
    dispatch({ type: TodoActionTypes.EDIT_TODO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TodoActionTypes.ADD_TODO_ERROR, payload: 'Ошибка сервера' });
  }
};
