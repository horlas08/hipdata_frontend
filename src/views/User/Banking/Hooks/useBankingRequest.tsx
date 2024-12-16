import { csrfToken } from '@/services/AuthService'
import { apiBuyAirtime } from '@/services/BankingService'
import { BuyAirtimeScheme } from '../Airtime'
import { useNavigate } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import { setUser, signOutSuccess, useAppDispatch } from '@/store'
import { emptyUser } from '../../../../constants/app.constant'

const useBankingRequest = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const AirtimeRequest = async (values: BuyAirtimeScheme) => {
        try {
            await csrfToken().then(async () => {
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
            })

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
    }
}

export default useBankingRequest
