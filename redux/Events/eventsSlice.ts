import {createSlice} from '@reduxjs/toolkit';
import {initialEventsState} from "./initialEventsState";

const settingsSlice = createSlice({
    name: 'events',
    initialState: initialEventsState,
    reducers: {
        setReduxSelected: (state, action) => {
            state.selected = action.payload;
        },
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        setFilteredOption: (state, action) => {
            state.filteredOption = action.payload;
        }
    },
});

export const {setReduxSelected, setEvents, setFilteredOption} = settingsSlice.actions;
export default settingsSlice.reducer;