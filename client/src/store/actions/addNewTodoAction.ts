import axios from 'axios';
import { Dispatch } from 'redux';
import { TodoAction, TodoActionTypes } from '../types/typesTodo';

export const addNewTodo = (todoData: object) => async (dispatch: Dispatch<TodoAction>) => {
  try {
    dispatch({ type: TodoActionTypes.ADD_TODO_LOADING });
    const { data } = await axios.post('http://localhost:5000/api/new/todos', todoData);
    console.log(data, 'todo Action');
    dispatch({ type: TodoActionTypes.ADD_TODO_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: TodoActionTypes.ADD_TODO_ERROR, payload: 'Ошибка сервера' });
  }
};
