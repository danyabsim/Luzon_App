import {createSlice} from '@reduxjs/toolkit';
import {initialEventsState} from "./initialEventsState";
import {setUser} from "../User/userSlice";
import {initialUserState} from "../User/initialUserState";

const settingsSlice = createSlice({
    name: 'events',
    initialState: initialEventsState,
    reducers: {
        setReduxSelected: (state, action) => {
            state.selected = action.payload;
        },
        setEvents: (state, action) => {
            state.events = action.payload;
        }
    },
});

export const {setReduxSelected, setEvents} = settingsSlice.actions;
export default settingsSlice.reducer;