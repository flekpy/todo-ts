import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import userReducer from './userReducer';

const reducersSpec = {
  user: userReducer,
  todo: todoReducer,
};

const rootReducer = combineReducers(reducersSpec);
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
