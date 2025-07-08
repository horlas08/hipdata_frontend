import { ErrorType, Prettier } from '@/@types/common'

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

export interface CablePlan {
    id: number;
    name: string;
    variation_code: string;
    variation_amount: number;

}

 interface CableProvider {
    id: number;
    name: string;
    alias: string;
    status: number;
    plans: CablePlan[];
}


export type AvailableCableResponse = Prettier<CableProvider[]>;


export interface Disco {
    id: number;
    name: string;
    alias: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
export interface Education {
    id: number;
    name: string;
    alias: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export type AvailableDiscoResponse = Prettier<Disco[]>
export type AvailableEducationResponse = Prettier<Education[]>
export type AvailableDiscoTypeResponse = {
    data: DiscoType[]
    message: string
}

export type TransactionResponse = {
    amount: string; // using string to represent high-precision decimals
    charge: string;
    post_balance: string;
    trx_type?: string | null;
    status: number;
    message?: string;
    trx?: string | null;
    details?: string | null;
    remark?: string | null;
    created_at?: string | null; // ISO date-time string
}



export interface CableResponse {
    status: boolean
    message: string
}
export interface CableVerifyResponse extends CableResponse{
   name: string
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
