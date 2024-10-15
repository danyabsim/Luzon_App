import {combineReducers, configureStore} from '@reduxjs/toolkit';
import eventsReducer from './Events/eventsSlice';
import userReducer from './User/userSlice';
import darkModerReducer from './Theme/themeSlice';

const rootReducer = combineReducers({
    events: eventsReducer,
    user: userReducer,
    theme: darkModerReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;