import { TodoActionTypes, ITodoState, TodoAction } from '../types/typesTodo';

const initialState: ITodoState = {
  loading: false,
  error: null,
  todos: [],
};

export default function todoReducer(state = initialState, action: TodoAction): ITodoState {
  console.log(action, 'action todoReducer');

  switch (action.type) {
    case TodoActionTypes.ADD_TODO_LOADING: {
      return { ...state, loading: true };
    }

    case TodoActionTypes.ADD_TODO_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }

    case TodoActionTypes.ADD_TODO_SUCCESS: {
      return {
        ...state, loading: false, error: null, todos: action.payload,
      };
    }

    default:
      return state;
  }
}
