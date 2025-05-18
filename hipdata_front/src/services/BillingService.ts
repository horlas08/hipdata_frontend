import ApiService from './ApiService'

import {
    AirtimeNetworkProvider,
    AirtimeResponse,
    AvailableCableResponse,
    AvailableDiscoResponse,
    AvailableDiscoTypeResponse,
    AvailableNetworkResponse, BuyDataScheme,
    CableResponse,
    CableVariationResponse, CableVerifyResponse, DataResponse

} from '@/@types/billing'
import { BuyAirtimeScheme } from '@/views/User/Airtime/Airtime'
import { CableFormType } from '@/views/User/Cable/Cable'
import { DiscoFormType } from '@/views/User/Electricity/Electricity'

export async function apiBuyAirtime(data: BuyAirtimeScheme) {
    return ApiService.fetchData<AirtimeResponse>({
        url: '/user/airtime',
        method: 'post',
        data,
    })
}
export async function apiBuyData(data: BuyDataScheme) {
    return ApiService.fetchData<DataResponse>({
        url: '/user/data/buy',
        method: 'post',
        data,
    })
}

export async function apiBuyCable(data: CableFormType) {
    return ApiService.fetchData<CableResponse>({
        url: '/bill/cable',
        method: 'post',
        data,
    })
}

export async function apiBuyDisco(data: DiscoFormType) {
    return ApiService.fetchData<CableResponse>({
        url: '/bill/cable',
        method: 'post',
        data,
    })
}

export async function apiGetAvailableNetwork() {
    return ApiService.fetchData<AvailableNetworkResponse>({
        url: '/user/data/network',
        method: 'get',
    })
}

export async function apiGetAvailableCable() {
    return ApiService.fetchData<AvailableCableResponse>({
        url: '/user/cable',
        method: 'get',
    })
}
export async function apiVerifyCableName(cable_number: string) {
    return ApiService.fetchData<CableVerifyResponse>({
        url: '/user/cable/verify',
        method: 'post',
        data: {
            iuc_number: cable_number,
        }
    })
}

export async function apiGetAvailableDisco() {
    return ApiService.fetchData<AvailableDiscoResponse>({
        url: '/disco/plans',
        method: 'get',
    })
}

export async function apiGetAvailableDiscoType() {
    return ApiService.fetchData<AvailableDiscoTypeResponse>({
        url: '/disco/type',
        method: 'get',
    })
}

export async function apiGetAirtimeNetwork() {
    return ApiService.fetchData<AirtimeNetworkProvider[]>({
        url: '/user/airtime',
        method: 'get',
    })
}

export async function apiGetCableVariation({ cable }: { cable: string }) {
    return ApiService.fetchData<CableVariationResponse>({
        url: `/cable/plans`,
        data: {
            network: cable,
        },
        method: 'get',
    })
}

//
// export async function apiBuyData() {
//     return ApiService.fetchData<DataResponse>({
//         url: '/user/buy/data',
//         method: 'post',
//     })
// }
