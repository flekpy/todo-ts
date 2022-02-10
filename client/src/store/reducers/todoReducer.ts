import { TodoActionTypes, ITodoState, TodoAction } from '../types/typesTodo';

const initialState: ITodoState = {
  loading: false,
  error: null,
  todos: [],
  selectedTags: [],
};

export default function todoReducer(state = initialState, action: TodoAction): ITodoState {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO_LOADING: {
      return { ...state, loading: true };
    }

    case TodoActionTypes.ADD_TODO_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }

    case TodoActionTypes.ADD_TODO_SUCCESS: {
      return {
        ...state, loading: false, error: null, todos: [...state.todos, action.payload],
      };
    }

    case TodoActionTypes.GET_ALL_TODO_SUCCESS: {
      return {
        ...state, loading: false, error: null, todos: [...state.todos, ...action.payload],
      };
    }

    case TodoActionTypes.EDIT_STATUS_COMPLETED: {
      return {
        ...state,
        loading: false,
        error: null,
        todos: state.todos.map((todo) => {
          if (todo.id === Number(action.payload)) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };
    }

    case TodoActionTypes.DELETE_TODO_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    }

    default:
      return state;
  }
}
