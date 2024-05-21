import {createSlice} from '@reduxjs/toolkit';
import {initialThemeState} from "./initialThemeState";

const themeSlice = createSlice({
    name: 'darkMode',
    initialState: initialThemeState,
    reducers: {
        setDarkMode: (state, action) => {
            state.mode = action.payload;
        }
    },
});

export const {setDarkMode} = themeSlice.actions;
export default themeSlice.reducer;