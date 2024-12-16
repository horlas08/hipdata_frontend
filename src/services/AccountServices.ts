import ApiService from './ApiService'
import { ProfileFormModel, userChangeProfileResponse } from '@/@types/user'

export async function apiGetAccountSettingData<T>() {
    return ApiService.fetchData<T>({
        url: '/account/setting',
        method: 'get',
    })
}
export async function apiUpdateUserProfile(data: ProfileFormModel) {
    const formData: FormData = new FormData()
    if (typeof data.avatar != 'string') {
        formData.set('avatar', data.avatar as Blob)
    }
    formData.append('username', data.first_name)
    formData.append('first_name', data.first_name)
    formData.set('last_name', data.last_name)
    formData.append('_method', 'put')
    formData.forEach((f) => {
        console.log(f)
    })
    return ApiService.fetchData<userChangeProfileResponse>({
        url: 'http://localhost:8000/user/profile-information',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    })
}

export async function apiGetAccountSettingIntegrationData<T>() {
    return ApiService.fetchData<T>({
        url: '/account/setting/integration',
        method: 'get',
    })
}

export async function apiGetAccountSettingBillingData<T>() {
    return ApiService.fetchData<T>({
        url: '/account/setting/billing',
        method: 'get',
    })
}

export async function apiGetAccountInvoiceData<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/account/invoice',
        method: 'get',
        params,
    })
}

export async function apiGetAccountLogData<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/account/log',
        method: 'post',
        data,
    })
}

export async function apiGetAccountFormData<T>() {
    return ApiService.fetchData<T>({
        url: '/account/form',
        method: 'get',
    })
}
