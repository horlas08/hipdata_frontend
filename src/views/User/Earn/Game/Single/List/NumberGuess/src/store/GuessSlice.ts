import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    userName: string
    balance: number
    generatedValue: number
    speed: number
    animShow: boolean
    usersRanking: any
}

const initialState: CounterState = {
    userName: 'q',
    balance: 1000,
    generatedValue: 0,
    speed: 0,
    animShow: false,
    usersRanking: [],
}
export const SLICE_NAME = 'NumberGuess'

export const GuessSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
        },

        generateVal: (state, action: PayloadAction<number>) => {
            state.animShow = true
            state.generatedValue = action.payload
        },

        speedStateVal: (state, action: PayloadAction<number>) => {
            state.speed = action.payload
        },

        animStateVal: (state, action: PayloadAction<boolean>) => {
            state.animShow = action.payload
        },

        updateBalanceVal: (state, action: PayloadAction<number>) => {
            state.balance = action.payload
        },

        setUsersRanking: (state, action: PayloadAction<any>) => {
            state.usersRanking = action.payload
        },
    },
})

export const {
    setUserName,
    generateVal,
    speedStateVal,
    animStateVal,
    updateBalanceVal,
    setUsersRanking,
} = GuessSlice.actions

export default GuessSlice.reducer
