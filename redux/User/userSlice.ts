import {createSlice} from '@reduxjs/toolkit';
import {initialUserState} from "./initialUserState";

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;