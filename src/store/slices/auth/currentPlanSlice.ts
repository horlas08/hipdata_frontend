import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";

export type CurrentPlanState = {
    name: string
    hint: string
    totalReferral: number
    completed: boolean
    completedReferral: number
    progression: number
}

const initialState: CurrentPlanState = {
    name: "",
    hint: "",
    totalReferral: 0,
    completed: false,
    completedReferral: 0,
    progression: 0
}

const currentPlanSlice  = createSlice(
   {
    name: `${SLICE_BASE_NAME}/currentPlan`,
    initialState,
    reducers: {
        setCurrentPlan(state, action: PayloadAction<CurrentPlanState>){
            state.completed = action.payload.completed
            state.completedReferral = action.payload.completedReferral
            state.hint = action.payload.hint
            state.progression = action.payload.progression
            state.totalReferral = action.payload.totalReferral
            state.name = action.payload.name
        }
    }
   } 
)

export const { setCurrentPlan } = currentPlanSlice.actions

export default currentPlanSlice.reducer