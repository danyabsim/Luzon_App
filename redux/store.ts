import {combineReducers, configureStore} from '@reduxjs/toolkit';
import eventsReducer from './Events/eventsSlice';
import userReducer from './User/userSlice';

const rootReducer = combineReducers({
    events: eventsReducer,
    user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;