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
            if (updatedEvents[state.selected]) {
                const indexToRemove = updatedEvents[state.selected].findIndex(event => event.name === action.payload);
                if (indexToRemove !== -1) {
                    updatedEvents[state.selected].splice(indexToRemove, 1);
                    if (updatedEvents[state.selected].length === 0) updatedEvents[state.selected] = null;
                }
            }
            state.events = updatedEvents;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        }
    },
});

export const {addNewEvent, removeEvent, setSelected} = settingsSlice.actions;
export default settingsSlice.reducer;