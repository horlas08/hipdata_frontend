import { ErrorType } from '@/@types/common'

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

// export type NetworkType = {
//     value: string
//     label: string
//     logo: string
// }
export type NetworkProviderType ={
    id: number
    name: string
    alias: string
    type: NetworkType[]
}

export type NetworkType ={
    id: number
    name: string
    alias: string
    plans: DataPlan[]
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


export type AvailableNetworkResponse = NetworkProviderType[]
 | ErrorType
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




export interface CableResponse {
    status: boolean
    message: string
}
export type DataPlan = {
  id: number;
  name: string;
  alias: string;
  network_type_id: number;
  status: number;
  data_type_id: number;
  api_provider_id: number;
  amount: number;
  agent_amount: number;
}
export type BuyDataScheme = {
    plan_type: string
    plan_id: number
    phone_number: string
    network_id:  number
}

interface CableVariation {
    variation_code: string
    name: string
    variation_amount: string
    fixedPrice: string
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
