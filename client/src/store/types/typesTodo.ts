export enum TodoActionTypes {
  ADD_TODO_LOADING = 'ADD_TODO_LOADING',
  ADD_TODO_ERROR = 'ADD_TODO_ERROR',
  ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS',
}

export interface ITodoState {
  loading: boolean,
  error: null | string
  todos: any[]
  selectedTags: number[],
}

interface TodoLoadingAction {
  type: TodoActionTypes.ADD_TODO_LOADING;
}
interface TodoSuccessAction {
  type: TodoActionTypes.ADD_TODO_SUCCESS;
  payload: any[]
}
interface TodoErrorAction {
  type: TodoActionTypes.ADD_TODO_ERROR;
  payload: string;
}

export type TodoAction = TodoLoadingAction | TodoSuccessAction | TodoErrorAction
