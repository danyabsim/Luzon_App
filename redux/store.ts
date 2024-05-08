import {combineReducers, configureStore} from '@reduxjs/toolkit';
import eventsReducer from './Events/eventsSlice';
import userReducer from './User/userSlice';
import filterReducer from './Filter/filterSlice';

const rootReducer = combineReducers({
    events: eventsReducer,
    user: userReducer,
    filter: filterReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;