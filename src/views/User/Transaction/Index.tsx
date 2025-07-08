import AppTableWithIndex from '@/components/AppTableWithIndex'
import { useEffect, useState } from 'react'
import { TransactionResponse } from '@/@types/billing'
import { ColumnDef } from '@tanstack/react-table'
import useBillingRequest from '@/utils/hooks/useBillingRequest'
import { isErrorType } from '@/utils/helpeer'
import { Badge } from '@/components/ui'

export default function Transaction() {
    const [transactionData, setTransactionData] = useState<TransactionResponse[]>([])
    const [loading, setLoading] = useState(true)
    const { GetTransaction } = useBillingRequest()

    const columnDef: ColumnDef<TransactionResponse>[] = [
        {
            id: 'details',
            header: 'details',
            accessorKey: 'details',
        },
        {
            id: 'amount',
            header: 'Amount',
            accessorKey: 'amount',
        },
        {
            id: 'Balance',
            header: 'Balance',
            accessorKey: 'post_balance',
        },
        {
            id: 'Remark',
            header: 'Remark',
            accessorKey: 'remark',
        },
        {
            id: 'status',
            header: 'status',
            cell: ({ row }) => {
                if (row.getValue('status') == 'success') {
                    return <Badge className={'bg-yellow-50'}>
                        Pending
                    </Badge>
                } else {
                    return <Badge className={'bg-yellow-50'}>
                        Pending
                    </Badge>
                }
            }
        }
    ]

    useEffect(() => {
        setLoading(true)
        GetTransaction().then((res) => {
            if (!isErrorType(res)) {
                setTransactionData(Array.isArray(res) ? res : [res])
            } else {
                setTransactionData([])
            }

        }).finally(() => {
            setLoading(false)
        })
        setLoading(false)
    }, [])
    return (
        <div>
            <div className={''}>
                <h2>Transaction Logs</h2>
            </div>
            <AppTableWithIndex loading={loading} columns={columnDef} data={transactionData} />
        </div>
    )
}
