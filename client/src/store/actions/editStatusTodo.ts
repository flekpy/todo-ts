import axios from 'axios';
import { Dispatch } from 'redux';
import { TodoAction, TodoActionTypes } from '../types/typesTodo';

export const editStatusCompleted = (payload: any) => async (dispatch: Dispatch<TodoAction>) => {
  console.log(payload, 'payload');
  try {
    const { data } = await axios.put(`http://localhost:5000/api/todos/${payload.id}`, { completed: payload.completed });
    console.log(data, 'ответ бэка на обновление туду');
    dispatch({ type: TodoActionTypes.EDIT_STATUS_COMPLETED, payload: data });
  } catch (error) {
    console.log(error);
  }
};
