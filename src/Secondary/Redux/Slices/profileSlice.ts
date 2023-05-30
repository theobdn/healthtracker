import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Profile} from "../../../Corelogic/Models/Profile";

interface ProfileState {
    user: Profile | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    user: null,
    isLoading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Profile | null>) => {
            state.user = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;