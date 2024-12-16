import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
    UserCheck,
    apiChangePasswordType,
} from '@/@types/auth'
import BaseService from './BaseService'
import { PasswordFormModel } from '@/views/User/Settings/components/Password'
import appConfig from '@/configs/app.config'

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
export async function apiUser() {
    return ApiService.fetchData<UserCheck>({
        url: `${appConfig.apiWeb}/user`,
        method: 'get',
    })
}
export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/user',
        method: 'get`',
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
        url: 'http://localhost:8000/user/password',
        method: 'put',
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
