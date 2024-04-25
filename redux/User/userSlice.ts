import {createSlice} from '@reduxjs/toolkit';
import {initialUserState} from "./initialUserState";

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.pass = action.payload.pass;
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;