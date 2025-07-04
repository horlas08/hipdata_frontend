import {
    apiConfirmPinRequest,
    apiSignIn,
    apiSignOut,
    apiSignUp,
    apiUser,
    csrfToken,
} from '@/services/AuthService'
import {
    setCurrentPlan,
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppDispatch,
    useAppSelector,
} from '@/store'
import appConfig from '@/configs/app.config'
import { useNavigate } from 'react-router-dom'
import {
    PinConfirmationCredential,
    PinConfirmationResponse,
    SignInCredential,
    SignUpCredential,
} from '@/@types/auth'
import { useEffect } from 'react'
import useQuery from './useQuery'
import { emptyUser } from '../../constants/app.constant'
import { ErrorType } from '@/@types/common'

// import {Notification as Notify} from '@/components/ui/Notification'

// import toast from '@/toast/toast'

type Status = 'success' | 'failed'

const useAuth = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const query = useQuery()

    const { signedIn } = useAppSelector((state) => state.auth.session)
    const { user } = useAppSelector((state) => state.auth)
    // const user = localStorage.getItem('user')
    useEffect(() => {
        // const token: string | undefined = document.cookie
        //     .split('; ')
        //     .find((row) => row.startsWith('XSRF-TOKEN'))
        //     ?.split('=')[1]
        //
        // if (!token) {
        //     localStorage.clear()
        //     handleSignOut()
        // }
        const authUser = user.username
        // if (authUser == '' || authUser == undefined || !authUser) {
        //     checkUser()
        // }
    }, [])



    const signIn = async (
        values: SignInCredential
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            await csrfToken().then(async () => {
                const resp = await apiSignIn(values)
                console.log(resp)
                if (resp?.status !== 200) {
                    throw Error(resp?.data?.message)
                }
                dispatch(signInSuccess())
                dispatch(setUser(resp.data.user))
                return {
                    status: 'success',
                    message: resp?.data?.message || 'Login Succesful',
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

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)

            if (resp?.status == 201) {
                return {
                    status: 'success',
                    message: resp?.data?.message,
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
    const confirmPin = async (
        values: PinConfirmationCredential
    ): Promise<PinConfirmationResponse | ErrorType> => {
        try {
            const resp = await apiConfirmPinRequest(values)

            if (resp?.status == 200) {
                return resp.data
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

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(setUser(emptyUser))
    }

    const signOut = async () => {
        const data = await apiSignOut()
        console.log(data)
        if (data.status == 204) {
            localStorage.clear()

            handleSignOut()
            navigate(appConfig.unAuthenticatedEntryPath)
        }
    }

    return {
        authenticated: user && signedIn,
        signIn,
        signUp,
        confirmPin,
        signOut,
    }
}

export default useAuth
