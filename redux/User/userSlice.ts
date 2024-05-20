import {createSlice} from '@reduxjs/toolkit';
import {initialUserState} from "./initialUserState";

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        }
    }
});

export const {setUser, setIsAdmin, setImage} = userSlice.actions;
export default userSlice.reducer;