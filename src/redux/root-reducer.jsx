import { combineReducers } from "redux";

import userReducer from './user/user.reduce';

export default combineReducers({
    user: userReducer
});