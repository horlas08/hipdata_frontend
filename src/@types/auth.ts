import { CurrentPlanState, UserState } from '@/store/slices/auth'

export type SignInCredential = {
    email: string
    password: string
    _token?: string
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    has_pin: boolean;
    user_type: boolean;
    mobile: string;
    balance: string;  // Using string for decimal to avoid floating-point precision issues
    betting_balance: string;
    referral_balance: string;
    image: string | null;
    status: boolean;  // 0: banned, 1: active
    ev: boolean;     // 0: email unverified, 1: email verified
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    remember_token: string | null;
}


export type SignInResponse = {
    message?: string
    user: User
}
export type PinConfirmationResponse = {
    message: string
    status: boolean
}

export type apiChangePinType = {
    status: number
}
export type apiChangePasswordType = {
    message?: string
}

export interface UserCheck extends Omit<SignInResponse, 'message'>{

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
