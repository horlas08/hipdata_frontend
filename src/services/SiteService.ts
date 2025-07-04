import { ListItemData } from '@/views/User/Referral/ListItem'
import ApiService from './ApiService'
import { planResponse } from './PlanService'
import { Logs } from '@/views/User/Referral/Logs'
import { mixed } from 'yup'

interface CountryResonse extends planResponse {
    id: string | number
}
export type BankingWalletResponse = {
    value: string
    label: string
}
export type SelectKeyValue = {
    value: string
    label: string
}
interface ReferralLogsResponse extends Logs {
    id: string
}
export type WithdrawalLogsResponse = {
    id: string
    date: number
    trx: string
    amount: number
    wallet: string
    status: number
}

export async function apiLevel() {
    return ApiService.fetchData<ListItemData[]>({
        url: '/user/levels',
        method: 'get',
    })
}
export async function apiReferralLogs() {
    return ApiService.fetchData<ReferralLogsResponse[]>({
        url: 'user/referral/logs',
        method: 'get',
    })
}
export async function apiWithdrawalLogs() {
    return ApiService.fetchData<WithdrawalLogsResponse[]>({
        url: 'user/withdraw/logs',
        method: 'get',
    })
}
export async function apiCountry() {
    return ApiService.fetchData<CountryResonse[]>({
        url: '/supported/country',
        method: 'get',
    })
}
export async function apiBankingWallet() {
    return ApiService.fetchData<BankingWalletResponse[]>({
        url: 'user/banking/wallet',
        method: 'get',
    })
}
