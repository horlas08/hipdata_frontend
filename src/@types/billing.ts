export interface AirtimeResponse {
    message: string
}

export interface AirtimeNetworkProvider {
    id: string
    alias: string
    name: string
}

export interface DataResponse extends AirtimeResponse {
    amount: string | number
}

export type NetworkType = {
    value: string
    label: string
    logo: string
}
export type CableType = {
    value: string
    label: string
    logo: string
}

export type DiscoInfo = {
    value: string
    label: string
    logo: string
}
export type DiscoType = {
    value: string
    label: string
    logo: string
}

export type AvailableNetworkResponse = {
    data: NetworkType[]
    message: string
}
export type AvailableCableResponse = {
    data: CableType[]
    message: string
}

export type AvailableDiscoResponse = {
    data: DiscoInfo[]
    message: string
}
export type AvailableDiscoTypeResponse = {
    data: DiscoType[]
    message: string
}
export type NetworkPlanType = {
    value: string
    label: string
}

export type DataPlanTypeResponse = {
    data: NetworkPlanType[]
    message: string
}

export interface CableResponse {
    status: boolean
    message: string
}

interface DataVariation {
    variation_code: string
    name: string
    variation_amount: string
    fixedPrice: string
}

interface CableVariation {
    variation_code: string
    name: string
    variation_amount: string
    fixedPrice: string
}

export interface DataVariationResponse {
    data: DataVariation[]
    message: string
}

export interface CableVariationResponse {
    data: CableVariation[]
    message: string
}

type AirtimeData = {
    amount: number
    phone: number
    network: string
}
