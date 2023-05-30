import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterReducer from '../Slices/counterSlice';
import profileSlice from '../Slices/profileSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    profile: profileSlice
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export default store;