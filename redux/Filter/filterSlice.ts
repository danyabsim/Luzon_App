import {createSlice} from "@reduxjs/toolkit";
import {initialFilterState} from "./initialFilterState";

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        setUsernames: (state, action) => {
            state.usernames = action.payload;
        }
    },
});

export const {setUsernames} = filterSlice.actions;
export default filterSlice.reducer;