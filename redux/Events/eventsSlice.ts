import {createSlice} from '@reduxjs/toolkit';
import {initialEventsState} from "./initialEventsState";

const settingsSlice = createSlice({
    name: 'events',
    initialState: initialEventsState,
    reducers: {
        addNewEvent: (state, action) => {
            const newEvent = {name: action.payload, height: 10, day: state.selected};
            const updatedEvents = {...state.events};
            if (updatedEvents[state.selected]) updatedEvents[state.selected].push(newEvent);
            else updatedEvents[state.selected] = [newEvent];
            state.events = updatedEvents;
        },
        removeEvent: (state, action) => {
            const updatedEvents = {...state.events};
            const indexToRemove = updatedEvents[action.payload.day].findIndex(event => event.name === action.payload.name);
            if (indexToRemove !== -1) {
                updatedEvents[action.payload.day].splice(indexToRemove, 1);
                if (updatedEvents[action.payload.day].length === 0) updatedEvents[action.payload.day] = null;
            }
            state.events = updatedEvents;
        },
        setReduxSelected: (state, action) => {
            state.selected = action.payload;
        },
        setEvents: (state, action) => {
            state.events = action.payload;
        }
    },
});

export const {addNewEvent, removeEvent, setReduxSelected, setEvents} = settingsSlice.actions;
export default settingsSlice.reducer;