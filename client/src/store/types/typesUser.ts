export enum UserActionTypes {
  REGISTER_USER_LOADING = 'REGISTER_USER_LOADING',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS',
  AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS',
}

export interface IUserState {
  loading: boolean,
  error: null | string
  userData: {
    id: number | null
    email: string
    name: string
  }
}

interface RegUserLoadingAction {
  type: UserActionTypes.REGISTER_USER_LOADING;
}

interface RegUserSuccessAction {
  type: UserActionTypes.REGISTER_USER_SUCCESS;
  payload: {
    id: number | null
    email: string
    name: string
  }
}

interface RegUserErrorAction {
  type: UserActionTypes.REGISTER_USER_ERROR;
  payload: string;
}

interface LoginUserSuccessAction {
  type: UserActionTypes.LOGIN_USER_SUCCESS;
  payload: {
    id: number | null
    email: string
    name: string
  }
}

interface LogoutUserSuccessAction {
  type: UserActionTypes.LOGOUT_USER_SUCCESS;
}

interface AuthUserSuccessAction {
  type: UserActionTypes.AUTH_USER_SUCCESS;
  payload: {
    id: number | null
    email: string
    name: string
  }
}

export type UserAction = RegUserLoadingAction
 | RegUserSuccessAction | RegUserErrorAction | LoginUserSuccessAction | LogoutUserSuccessAction |
  AuthUserSuccessAction
