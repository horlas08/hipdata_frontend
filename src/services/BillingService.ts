import ApiService from './ApiService'

import {
    AirtimeNetworkProvider,
    AirtimeResponse,
    AvailableCableResponse,
    AvailableDiscoResponse,
    AvailableDiscoTypeResponse,
    AvailableNetworkResponse, BuyDataScheme,
    CableResponse,
    CableVariationResponse, CableVerifyResponse, DataResponse, TransactionResponse

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
        url: '/user/cable',
        method: 'post',
        data,
    })
}

export async function apiBuyDisco(data: DiscoFormType) {
    return ApiService.fetchData<CableResponse>({
        url: '/user/electricity',
        method: 'post',
        data: {
            plan_id: data.disco_name,
            meter_name: data.customer_name,
            ...data
        },
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
export async function apiVerifyCableName(cable_number: string, network: string) {
    return ApiService.fetchData<CableVerifyResponse>({
        url: '/user/cable/verify',
        method: 'post',
        data: {
            iuc_number: cable_number,
            network
        }
    })
}
export async function apiVerifyMeterName(cable_number: string, network: string, meter_type: string) {
    return ApiService.fetchData<CableVerifyResponse>({
        url: '/user/electricity/verify',
        method: 'post',
        data: {
            iuc_number: cable_number,
            network,
            meter_type
        }
    })
}

export async function apiGetAvailableDisco() {
    return ApiService.fetchData<AvailableDiscoResponse>({
        url: '/user/electricity',
        method: 'get',
    })
}

export async function apiGetAvailableDiscoType() {
    return ApiService.fetchData<AvailableDiscoTypeResponse>({
        url: '/disco/type',
        method: 'get',
    })
} export async function apiGetTransaction() {
    return ApiService.fetchData<TransactionResponse>({
        url: '/user/transaction',
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

export async function apiInitializeCheckout(data: { amount: number; gateway: string }) {
    return ApiService.fetchData<any>({
        url: '/user/deposit/checkout',
        method: 'post',
        data,
    })
}

export async function apiValidateCoupon(couponCode: string) {
    return ApiService.fetchData<any>({
        url: '/user/deposit/coupon/validate',
        method: 'post',
        data: { coupon_code: couponCode },
    })
}

export async function apiRedeemCoupon(couponCode: string) {
    return ApiService.fetchData<any>({
        url: '/user/deposit/coupon/redeem',
        method: 'post',
        data: { coupon_code: couponCode },
    })
}

//
// export async function apiBuyData() {
//     return ApiService.fetchData<DataResponse>({
//         url: '/user/buy/data',
//         method: 'post',
//     })
// }
