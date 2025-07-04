import AppTableWithIndex from '@/components/AppTableWithIndex'
import { useEffect, useState } from 'react'
import { TransactionResponse } from '@/@types/billing'
import { ColumnDef } from '@tanstack/react-table'

export default function Transaction() {
    const [transactionData, setTransactionData] = useState<TransactionResponse[]>()

    const columnDef: ColumnDef<TransactionResponse>[] = [
        {
            id: 'id',
            header: 'ID',
            accessorKey: 'id',
        },
        {
            id: 'amount',
            header: 'Amount',
            accessorKey: 'amount',
        }
    ]

    useEffect(() => {

    }, [])
    return (
        <div>
            <div className={''}>
                <h2>Transaction Logs</h2>
            </div>
            <AppTableWithIndex loading={true} columns={[]} data={[]}/>
        </div>
    )
}
