import { CommonError, ErrorType } from '@/@types/common'
import { object } from 'yup'

export function isErrorType<T>(value: T | ErrorType): value is ErrorType {
    return !(<ErrorType>value).status && (<ErrorType>value).status !== undefined
}

