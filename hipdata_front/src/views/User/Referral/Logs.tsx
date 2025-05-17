import { Badge, Button, Card, Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import Tr from '@/components/ui/Table/Tr'
import { apiReferralLogs, WithdrawalLogsResponse } from '@/services/SiteService'
import useThemeClass from '@/utils/hooks/useThemeClass'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import { Loading } from '@/components/shared'

export type Logs = {
    id: string
    date: number
    username: string
    user_plan: number
    amount: number
    level: string
    status: number
    // totalAmount: number
}
export type OrderColumnPros = {
    row: Logs
}

const orderStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'Paid',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Pending',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: { label: 'Failed', dotClass: 'bg-red-500', textClass: 'text-red-500' },
}

const OrderColumn = ({ row }: OrderColumnPros) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    // const onView = useCallback(() => {
    //   navigate(`/app/sales/order-details/${row.id}`)
    // }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            // onClick={onView}
        >
            #{row.username}
        </span>
    )
}

const columnHelper = createColumnHelper<Logs>()

const columns = [
    columnHelper.accessor('username', {
        header: 'Username',
        cell: (props) => <OrderColumn row={props.row.original} />,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (props) => {
            const { status } = props.row.original
            return (
                <div className="flex items-center">
                    <Badge className={orderStatusColor[status].dotClass} />
                    <span
                        className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
                    >
                        {orderStatusColor[status].label}
                    </span>
                </div>
            )
        },
    }),

    columnHelper.accessor('user_plan', {
        header: 'User Plan',
        cell: (props) => {
            const { user_plan } = props.row.original
            return <span>{user_plan}</span>
        },
    }),
    columnHelper.accessor('level', {
        header: 'Level',
    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (props) => {
            const { amount } = props.row.original
            return (
                <NumericFormat
                    displayType="text"
                    value={(Math.round(amount * 100) / 100).toFixed(2)}
                    prefix={'$'}
                    thousandSeparator={true}
                />
            )
        },
    }),
    columnHelper.accessor('date', {
        header: 'Date',
        cell: (props) => {
            const row = props.row.original
            return <span>{dayjs.unix(row.date).format('DD/MM/YYYY')}</span>
        },
    }),
]

export default function Logs() {
    const [data, setData] = useState<Logs[]>([])
    const [loading, SetLoading] = useState(true)

    useEffect(() => {
        apiReferralLogs().then((res) => {
            setData(res.data)
            SetLoading(false)
        })
    }, [])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <Loading loading={loading}>
            <Card className={''}>
                <div className="flex items-center justify-between mb-6">
                    <h4>Referral Logs</h4>
                    {/* <Button size="sm">View Orders</Button> */}
                </div>
                <Table>
                    <THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        ))}
                    </THead>
                    <TBody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })}
                    </TBody>
                </Table>
            </Card>
        </Loading>
    )
}
