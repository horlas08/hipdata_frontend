import { CSSProperties, ReactNode } from 'react'

export type Prettier<T> = {
    [P in keyof T]: T[P]
} & {}
export interface CommonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}

export type ErrorType = {
    status:  boolean
    message: string
}

export interface CommonError extends Omit<ErrorType, 'status'> {
    status: boolean
}
