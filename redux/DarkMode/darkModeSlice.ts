import {createSlice} from '@reduxjs/toolkit';
import {initialDarkModeState} from "./initialDarkModeState";

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: initialDarkModeState,
    reducers: {
        setDarkMode: (state, action) => {
            state.mode = action.payload;
        }
    },
});

export const {setDarkMode} = darkModeSlice.actions;
export default darkModeSlice.reducer;