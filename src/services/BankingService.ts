import { ListItemData } from '@/views/User/Referral/ListItem'
import ApiService from './ApiService'
import { planResponse } from './PlanService'
import { Logs } from '@/views/User/Referral/Logs'
import { BuyAirtimeScheme } from '@/views/User/Banking/Airtime'

interface AirtimeResponse {
    message: string
}
export interface AirtimeNetworkProvider {
    id: string
    alias: string
    name: string
}
interface DataResponse extends AirtimeResponse {
    amount: string | number
}
export interface DataVariationResponse {
    variation_code: string
    name: string
    variation_amount: string
    fixedPrice: string
}
type AirtimeData = {
    amount: number
    phone: number
    network: string
}
export async function apiBuyAirtime(data: BuyAirtimeScheme) {
    return ApiService.fetchData<AirtimeResponse>({
        url: '/user/airtime',
        method: 'post',
        data,
    })
}
export async function apiGetAirtimeNetwork() {
    return ApiService.fetchData<AirtimeNetworkProvider[]>({
        url: '/user/airtime',
        method: 'get',
    })
}
export async function apiGetDataVariation(network: string) {
    return ApiService.fetchData<DataVariationResponse[]>({
        url: `/buy/data/variation/${network}`,
        method: 'get',
    })
}
export async function apiBuyData() {
    return ApiService.fetchData<DataResponse>({
        url: '/user/buy/data',
        method: 'post',
    })
}
