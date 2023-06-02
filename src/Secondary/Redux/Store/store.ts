import {combineReducers, configureStore} from '@reduxjs/toolkit';
import profileSlice from '../Slices/profileSlice';
import goalSlice from '../Slices/goalSlice';

const rootReducer = combineReducers({
    profile: profileSlice,
    goal: goalSlice
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export default store;