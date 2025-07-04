import ApiService from './ApiService'
import {
    apiChangePasswordType,
    ForgotPassword,
    PinConfirmationCredential,
    PinConfirmationResponse,
    ResetPassword,
    SignInCredential,
    SignInResponse,
    SignUpCredential,
    UserCheck,
} from '@/@types/auth'
import BaseService from './BaseService'
import { PasswordFormModel } from '@/views/User/Settings/components/Password'
import { PinFormModel } from '@/views/User/Settings/components/Pin'
import appConfig from '@/configs/app.config'
import { Prettier } from '@/@types/common'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: `/login`,
        method: 'post',
        data,
    })
}

export async function tokenApi() {
    return BaseService.get('/token')
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: '/auth/register',
        method: 'post',
        data,
    })
}

export async function apiConfirmPinRequest(data: PinConfirmationCredential) {
    return ApiService.fetchData<PinConfirmationResponse>({
        url: '/user/pin-confirmation',
        method: 'post',
        data,
    })
}

export async function apiUser() {
    return ApiService.fetchData<Prettier<UserCheck>>({
        url: `${appConfig.apiWeb}/user`,
        method: 'get',
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: `${appConfig.apiWeb}/logout`,
        method: 'post',
    })
}

export async function csrfToken() {
    return ApiService.fetchData({
        url: `${appConfig.apiWeb}/sanctum/csrf-cookie/`,
        method: 'get',
    })
    // return BaseService.get("")
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiChangePassword(data: PasswordFormModel) {
    const datas = {
        current_password: data.password,
        password: data.newPassword,
        password_confirmation: data.confirmNewPassword,
    }
    return ApiService.fetchData<apiChangePasswordType>({
        url: '/user/change-password',
        method: 'post',
        data: datas,
    })
}

export async function apiResetPassword(data: ResetPassword) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}

export async function apiChangePin(data: PinFormModel) {
    // Only include current_pin if it's provided (for update scenario)
    const datas: Record<string, string> = {
        pin: data.newPin,
        pin_confirmation: data.confirmNewPin,
    }
    
    // Add current_pin only if it exists in the input data
    if (data.currentPin) {
        datas.current_pin = data.currentPin
    }
    
    return ApiService.fetchData<apiChangePasswordType>({
        url: '/user/change-pin',
        method: 'post',
        data: datas,
    })
}
