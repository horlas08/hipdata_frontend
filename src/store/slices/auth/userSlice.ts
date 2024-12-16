import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { User } from '@/@types/auth'

export type UserState = User

const initialState: UserState = {
    balance: '',
    created_at: '',
    email: '',
    ev: 0,
    firstname: '',
    id: 0,
    image: '',
    lastname: '',
    mobile: '',
    status: 0,
    updated_at: '',
    user_type: 0,
    username: '',

    email_verified_at: '',
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.firstname = action.payload?.firstname
            state.lastname = action.payload?.lastname
            state.username = action.payload?.username
            state.email = action.payload?.email
            state.mobile = action.payload?.mobile
            state.balance = action.payload?.balance
            state.user_type = action.payload?.user_type
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
