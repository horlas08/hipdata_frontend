import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { User } from '@/@types/auth'

export type UserState = User

const initialState: UserState = {
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    has_pin: false,
    user_type: false,  // default 0
    mobile: null,
    balance: '0',
    betting_balance: '0',
    referral_balance: '0',
    image: null,
    status: true,      // default true
    ev: false,         // default false
    email: '',
    email_verified_at: null,
    created_at: '',
    updated_at: '',
    remember_token: null
};



const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {

            state.id = action.payload?.id
            state.first_name = action.payload?.first_name
            state.last_name = action.payload?.last_name
            state.username = action.payload?.username
            state.user_type = action.payload?.user_type
            state.has_pin = action.payload?.has_pin
            state.mobile = action.payload?.mobile
            state.balance = action.payload?.balance
            state.betting_balance = action.payload?.betting_balance
            state.referral_balance = action.payload?.referral_balance
            state.image = action.payload?.image
            state.status = action.payload?.status
            state.ev = action.payload?.ev
            state.email = action.payload?.email
            state.email_verified_at = action.payload?.email_verified_at
            state.created_at = action.payload?.created_at
            state.updated_at = action.payload?.updated_at
            state.remember_token = action.payload?.remember_token
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
