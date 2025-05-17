import { Loading } from '@/components/shared'
import { Badge, Card, Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import useThemeClass from '@/utils/hooks/useThemeClass'
import {
    apiWithdrawalLogs,
    WithdrawalLogsResponse,
} from '@/services/SiteService'

type WithdrawalOrderColumnPros = {
    row: WithdrawalLogsResponse
}
const Log = () => {
    const [data, setData] = useState<WithdrawalLogsResponse[]>([])

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        apiWithdrawalLogs().then((res) => {
            setData(res.data)
            setLoading(false)
        })
    }, [])
    const OrderColumn = ({ row }: WithdrawalOrderColumnPros) => {
        const { textTheme } = useThemeClass()

        return (
            <span
                className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
                // onClick={onView}
            >
                #{row.trx}
            </span>
        )
    }

    const columnHelper = createColumnHelper<WithdrawalLogsResponse>()
    const orderStatusColor: Record<
        number,
        {
            label: string
            dotClass: string
            textClass: string
        }
    > = {
        1: {
            label: 'Paid',
            dotClass: 'bg-emerald-500',
            textClass: 'text-emerald-500',
        },
        0: {
            label: 'Pending',
            dotClass: 'bg-amber-500',
            textClass: 'text-amber-500',
        },
        2: {
            label: 'Failed',
            dotClass: 'bg-red-500',
            textClass: 'text-red-500',
        },
    }
    const columns = [
        columnHelper.accessor('trx', {
            header: 'Transaction',
            cell: (props) => <OrderColumn row={props.row.original} />,
        }),

        columnHelper.accessor('wallet', {
            header: 'Wallet Type',
            cell: (props) => {
                const { wallet } = props.row.original
                return <span>{wallet}</span>
            },
        }),
        columnHelper.accessor('amount', {
            header: 'Amount',
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

        columnHelper.accessor('date', {
            header: 'Date',
            cell: (props) => {
                const row = props.row.original
                return <span>{dayjs.unix(row.date).format('DD/MM/YYYY')}</span>
            },
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <Loading loading={loading}>
            <Card className={''}>
                <div className="flex items-center justify-between mb-6">
                    <h4>Withdrawal Logs</h4>
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
export default Log
