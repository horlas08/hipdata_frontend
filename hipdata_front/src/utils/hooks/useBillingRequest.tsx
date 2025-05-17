import {
    apiBuyAirtime,
    apiBuyCable, apiBuyData,
    apiBuyDisco,
    apiGetAvailableCable,
    apiGetAvailableDisco,
    apiGetAvailableDiscoType,
    apiGetAvailableNetwork,
    apiGetCableVariation
} from '@/services/BillingService'

import { useNavigate } from 'react-router-dom'
import { setUser, signOutSuccess, useAppDispatch } from '@/store'
import { emptyUser } from '@/constants/app.constant'
import { BuyAirtimeScheme } from '@/views/User/Airtime/Airtime'
import {
    AvailableCableResponse,
    AvailableDiscoResponse,
    AvailableDiscoTypeResponse,
    AvailableNetworkResponse, BuyDataScheme,
    CableVariationResponse,
   NetworkProviderType
} from '@/@types/billing'
import { ErrorType } from '@/@types/common'
import { CableFormType } from '@/views/User/Cable/Cable'
import { DiscoFormType } from '@/views/User/Electricity/Electricity'
import { useCallback } from 'react'

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
                status: false,
                message: errors?.response?.data?.message || errors.toString(),
            }as ErrorType
        }
    }
    const DataRequest = async (values: BuyDataScheme) => {
        try {
            const resp = await apiBuyData(values)

            if (resp.status == 200) {
                return  resp.data;
            } else {
                throw Error(resp?.data?.message)
            }

            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: false,
                message: errors?.response?.data?.message || errors.toString(),
            } as ErrorType
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
                status: false,
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
                status: false,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }
    const DataAvailableNetwork =  useCallback
    (async () => {

            try {
                const resp = await apiGetAvailableNetwork()

                if (resp.status == 200) {
                    console.log(resp.data)
                    return resp.data
                } else {
                    throw Error('error')
                }
                // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            } catch (errors: any) {
                return {
                    status: false,
                    message: errors?.response?.data?.message || errors.toString(),
                } as ErrorType
            }

    }, []);

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
                status: false,
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
                status: false,
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
                status: false,
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
                status: false,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    return {
        AirtimeRequest,
        DataAvailableNetwork,
        GetAllDisco,
        BuyDiscoRequest,
        GetCablePlans,
        GetAllCable,
        DataRequest,
        GetDiscoType,
        BuyCableRequest,
    }
}

export default useBillingRequest
