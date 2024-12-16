import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export interface SessionState {
    signedIn: boolean
    token?: string | null
}

const initialState: SessionState = {
    signedIn: false,
    // user?: null,
}

const sessionSlice = createSlice({
    name: `${SLICE_BASE_NAME}/session`,
    initialState,
    reducers: {
        // action: PayloadAction<string>
        signInSuccess(state) {
            state.signedIn = true
            // state.user = action.payload
        },
        signOutSuccess(state) {
            state.signedIn = false
            // state.user = null
        },
    },
})

export const { signInSuccess, signOutSuccess } = sessionSlice.actions
export default sessionSlice.reducer
