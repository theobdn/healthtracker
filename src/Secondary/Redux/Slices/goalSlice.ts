import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Goal } from '../../../Corelogic/Models/Goal';

interface GoalState{
    actual_weight?: number;
    goal_weight?: number;
    start_weight?: number;
}

const initialState: GoalState = {
    actual_weight: 0,
    goal_weight: 0,
    start_weight: 0
};

const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        setGoal(state, action: PayloadAction<Goal | null>){
            state.actual_weight = action.payload?.actual_weight;
            state.goal_weight = action.payload?.goal_weight;
            state.start_weight = action.payload?.start_weight;
        }
    }
});

export const {setGoal} = goalSlice.actions;
export default goalSlice.reducer;