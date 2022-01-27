export enum UserActionTypes {
  REGISTER_USER_LOADING = 'REGISTER_USER_LOADING',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
}

export interface IUserState {
  loading: boolean,
  error: null | string
  userData: any[]
}

interface RegUserLoadingAction {
  type: UserActionTypes.REGISTER_USER_LOADING;
}
interface RegUserSuccessAction {
  type: UserActionTypes.REGISTER_USER_SUCCESS;
  payload: any[]
}
interface RegUserErrorAction {
  type: UserActionTypes.REGISTER_USER_ERROR;
  payload: string;
}

export type UserAction = RegUserLoadingAction | RegUserSuccessAction | RegUserErrorAction
