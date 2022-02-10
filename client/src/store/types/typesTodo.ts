export enum TodoActionTypes {
  ADD_TODO_LOADING = 'ADD_TODO_LOADING',
  ADD_TODO_ERROR = 'ADD_TODO_ERROR',
  ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS',
  GET_ALL_TODO_SUCCESS = 'GET_ALL_TODO_SUCCESS',
  EDIT_STATUS_COMPLETED = 'EDIT_STATUS_COMPLETED',
  DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
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

interface GetAllTodoAction {
  type: TodoActionTypes.GET_ALL_TODO_SUCCESS;
  payload: any[];
}

interface EditStatusCompletedSuccess {
  type: TodoActionTypes.EDIT_STATUS_COMPLETED;
  payload: number;
}

interface DeleteTodoSuccess {
  type: TodoActionTypes.DELETE_TODO_SUCCESS;
  payload: number;
}
export type TodoAction = TodoLoadingAction | TodoSuccessAction
  | TodoErrorAction | GetAllTodoAction | EditStatusCompletedSuccess | DeleteTodoSuccess
