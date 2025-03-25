import {
    apiBuyAirtime,
    apiBuyCable,
    apiBuyDisco,
    apiDataPlans,
    apiDataType,
    apiGetAvailableCable,
    apiGetAvailableDisco,
    apiGetAvailableDiscoType,
    apiGetAvailableNetwork,
    apiGetCableVariation,
} from '@/services/BillingService'

import { useNavigate } from 'react-router-dom'
import { setUser, signOutSuccess, useAppDispatch } from '@/store'
import { emptyUser } from '@/constants/app.constant'
import { BuyAirtimeScheme } from '@/views/User/Airtime/Airtime'
import {
    AvailableCableResponse,
    AvailableDiscoResponse,
    AvailableDiscoTypeResponse,
    AvailableNetworkResponse,
    CableVariationResponse,
    DataPlanTypeResponse,
    DataVariationResponse,
} from '@/@types/billing'
import { ErrorType } from '@/@types/common'
import { CableFormType } from '@/views/User/Cable/Cable'
import { DiscoFormType } from '@/views/User/Electricity/Electricity'

const useBillingRequest = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const AirtimeRequest = async (values: BuyAirtimeScheme) => {
        try {
            const resp = await apiBuyAirtime(values)

            if (resp?.status == 201) {
                localStorage.clear()
                dispatch(signOutSuccess())
                dispatch(setUser(emptyUser))
            } else if (resp.status == 200) {
                return {
                    status: 'success',
                    message: 'Airtime Purchase Successful',
                }
            } else {
                throw Error(resp?.data?.message)
            }

            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }
    const BuyCableRequest = async (values: CableFormType) => {
        try {
            const resp = await apiBuyCable(values)

            if (resp?.status == 201) {
                localStorage.clear()
                dispatch(signOutSuccess())
                dispatch(setUser(emptyUser))
            } else if (resp.status == 200) {
                return {
                    status: 'success',
                    message: 'Airtime Purchase Successful',
                }
            } else {
                throw Error(resp?.data?.message)
            }

            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }
    const BuyDiscoRequest = async (values: DiscoFormType) => {
        try {
            const resp = await apiBuyDisco(values)

            if (resp?.status == 201) {
                localStorage.clear()
                dispatch(signOutSuccess())
                dispatch(setUser(emptyUser))
            } else if (resp.status == 200) {
                return {
                    status: 'success',
                    message: 'Airtime Purchase Successful',
                }
            } else {
                throw Error(resp?.data?.message)
            }

            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }
    const DataAvailableNetwork: () => Promise<
        AvailableNetworkResponse | ErrorType
    > = async () => {
        try {
            const resp = await apiGetAvailableNetwork()

            if (resp.status == 200) {
                console.log(resp.data)
                return resp.data
            } else {
                throw Error(resp?.data?.message)
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const GetAllCable: () => Promise<
        AvailableCableResponse | ErrorType
    > = async () => {
        try {
            const resp = await apiGetAvailableCable()

            if (resp.status == 200) {
                console.log(resp.data)
                return resp.data
            } else {
                throw Error(resp?.data?.message)
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const GetAllDisco: () => Promise<
        AvailableDiscoResponse | ErrorType
    > = async () => {
        try {
            const resp = await apiGetAvailableDisco()

            if (resp.status == 200) {
                console.log(resp.data)
                return resp.data
            } else {
                throw Error(resp?.data?.message)
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const GetDataType: (value: {
        network: string
    }) => Promise<DataPlanTypeResponse | ErrorType> = async (value) => {
        try {
            const resp = await apiDataType(value)

            if (resp.status == 200) {
                console.log(resp.data)
                return resp.data
            } else {
                throw Error(resp?.data?.message)
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }
    const GetDataPlans: (value: {
        network: string
        networkType: string
    }) => Promise<DataVariationResponse | ErrorType> = async (value) => {
        try {
            const resp = await apiDataPlans(value)

            if (resp.status == 200) {
                console.log(resp.data)
                return resp.data
            } else {
                throw Error(resp?.data?.message)
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }
    const GetCablePlans: (value: {
        cable: string
    }) => Promise<CableVariationResponse | ErrorType> = async (value) => {
        try {
            const resp = await apiGetCableVariation(value)

            if (resp.status == 200) {
                console.log(resp.data)
                return resp.data
            } else {
                throw Error(resp?.data?.message)
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const GetDiscoType: () => Promise<
        AvailableDiscoTypeResponse | ErrorType
    > = async () => {
        try {
            const resp = await apiGetAvailableDiscoType()

            if (resp.status == 200) {
                console.log(resp.data)
                return resp.data
            } else {
                throw Error(resp?.data?.message)
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    return {
        AirtimeRequest,
        GetDataPlans,
        DataAvailableNetwork,
        GetDataType,
        GetAllDisco,
        BuyDiscoRequest,
        GetCablePlans,
        GetAllCable,
        GetDiscoType,
        BuyCableRequest,
    }
}

export default useBillingRequest
