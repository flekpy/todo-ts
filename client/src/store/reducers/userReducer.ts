import { UserActionTypes, IUserState, UserAction } from '../types/typesUser';

const initialState: IUserState = {
  loading: false,
  error: null,
  userData: {
    id: null,
    email: '',
    name: '',
  },
};

export default function userReducer(state = initialState, action: UserAction): IUserState {
  switch (action.type) {
    case UserActionTypes.REGISTER_USER_LOADING: {
      return { ...state, loading: true };
    }

    case UserActionTypes.REGISTER_USER_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }

    case UserActionTypes.REGISTER_USER_SUCCESS:
    case UserActionTypes.LOGIN_USER_SUCCESS:
    case UserActionTypes.AUTH_USER_SUCCESS: {
      return {
        ...state, loading: false, error: null, userData: action.payload,
      };
    }

    case UserActionTypes.LOGOUT_USER_SUCCESS: {
      return {
        ...state, loading: false, error: null, userData: { id: null, email: '', name: '' },
      }; }

    default:
      return state;
  }
}
