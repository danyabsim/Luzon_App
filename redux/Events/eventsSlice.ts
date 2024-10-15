import {createSlice} from '@reduxjs/toolkit';
import {initialEventsState} from "./initialEventsState";

const eventsSlice = createSlice({
    name: 'events',
    initialState: initialEventsState,
    reducers: {
        setReduxSelected: (state, action) => {
            state.selected = action.payload;
        },
        setEvents: (state, action) => {
            state.events = action.payload;
            state.lastUpdated = new Date().toISOString();
        },
        setFilteredOption: (state, action) => {
            state.filteredOption = action.payload;
        },
        setUsernames: (state, action) => {
            state.usernames = action.payload;
        }
    },
});

export const {setReduxSelected, setEvents, setFilteredOption, setUsernames} = eventsSlice.actions;
export default eventsSlice.reducer;