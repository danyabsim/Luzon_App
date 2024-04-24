import {combineReducers, configureStore} from '@reduxjs/toolkit';
import eventsReducer from './Events/eventsSlice';

const rootReducer = combineReducers({
    events: eventsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;