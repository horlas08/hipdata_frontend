import { CurrentPlanState, UserState } from '@/store/slices/auth'

export type SignInCredential = {
    email: string
    password: string
    _token?: string
}

export interface User {
    id: number
    firstname: string
    lastname: string
    username: string
    user_type: number
    email: string
    mobile: string
    balance: string
    image: any
    status: number
    ev: number
    email_verified_at: any
    created_at: string
    updated_at: string
}

export type SignInResponse = {
    message?: string
    user: User
}
export type PinConfirmationResponse = {
    message: string
    match: false
}
export type apiChangePasswordType = {
    message?: string
}

export interface UserCheck extends UserState {
    username: string
    verified: boolean
    current_level: CurrentPlanState
}

export type SignUpResponse = SignInResponse
export type CountryValidate = {
    label: string
    value: string | number
}
export type SignUpCredential = {
    username: string
    email: string
    password: string
    password_confirmation: string
    firstname: string
    lastname: string
    mobile: string
}
export type PinConfirmationCredential = {
    pin: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
