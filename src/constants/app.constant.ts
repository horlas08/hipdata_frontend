import { string } from 'yup'
import { User } from '@/@types/auth'

export const APP_NAME = 'Hipdata'
export const PERSIST_STORE_NAME = 'hipdata'
export const REDIRECT_URL_KEY = 'redirectUrl'

export const emptyUser: User = {
    balance: '',
    created_at: '',
    email: '',
    ev: 0,
    firstname: '',
    id: 0,
    image: undefined,
    lastname: '',
    mobile: '',
    status: 0,
    updated_at: '',
    user_type: 0,
    username: '',
    email_verified_at: undefined,
}
