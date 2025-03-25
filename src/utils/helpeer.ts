import { ErrorType } from '@/@types/common'

export function isErrorType<T>(value: T | ErrorType): value is ErrorType {
    return (<ErrorType>value).status !== undefined
}
