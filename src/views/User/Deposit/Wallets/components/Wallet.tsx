import { useState } from 'react'
import classNames from 'classnames'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Input from '@/components/ui/Input'
import Tooltip from '@/components/ui/Tooltip'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Skeleton from '@/components/ui/Skeleton'
import Loading from '@/components/shared/Loading'
import GrowShrinkTag from '@/components/shared/GrowShrinkTag'

import useThemeClass from '@/utils/hooks/useThemeClass'
import { HiOutlineDuplicate, HiOutlinePlus } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import { useAppDispatch } from '@/store'

type Wallet = {
    bankName: string
    charges: number
    accountName: string
    accountNumber: string
    icon: string
}

const WalletCard = ({ data = {} }: { data: Partial<Wallet> }) => {
    const { textTheme } = useThemeClass()

    const handleCopyClick = (address = '') => {
        navigator.clipboard.writeText(address).finally(() => {
            toast.push(
                <Notification title="Copied" closable type="success" duration={0} />,
                {
                    placement: 'top-center',
                }
            )
        })

    }

    return (
        <Card>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar
                        className="bg-transparent"
                        src={data.icon}
                        shape="circle"
                    />
                    <h6 className="font-bold">{data.bankName}</h6>
                </div>
                <div className="text-right rtl:text-left">
                    <h6 className="mb-2">
                        Deposit Fees
                    </h6>
                    <GrowShrinkTag value={data.charges} suffix="%" />
                </div>
            </div>
            <div className="my-4">
                <h5 className="font-bold">
                    {data.accountName}
                </h5>
            </div>
            <Input
                readOnly
                value={data.accountNumber}
                suffix={
                    <Tooltip title="Copy">
                        <HiOutlineDuplicate
                            className={classNames(
                                'cursor-pointer text-xl',
                                `hover:${textTheme}`
                            )}
                            onClick={() => handleCopyClick(data.accountNumber)}
                        />
                    </Tooltip>
                }
            />
        </Card>
    )
}

const Wallet = () => {
    const dispatch = useAppDispatch()

    const data: Wallet[] = [
        {
            bankName: 'Palmpay',
            charges: 10,
            accountNumber: '9014985680',
            accountName: 'Qozeem Monsurudeen Akorede',
            icon: '/img/banks/palmpay.png',

        }
    ]

    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div className="grid lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            {!loading && (
                <>
                    {data.map((wallet) => (
                        <WalletCard key={wallet.accountNumber} data={wallet} />
                    ))}
                    <Card
                        clickable
                        className="border-dashed border-2 hover:border-indigo-600 hover:dark:border-gray-300 bg-transparent"
                    >
                        <div className="flex flex-col justify-center items-center py-5">
                            <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-600">
                                <HiOutlinePlus className="text-4xl text-gray-300" />
                            </div>
                            <p className="mt-5 font-semibold">Add Wallet</p>
                        </div>
                    </Card>
                </>
            )}
            {data.length === 0 &&
                loading &&
                [...Array(4).keys()].map((elm) => (
                    <Card key={elm}>
                        <Loading
                            loading={loading}
                            customLoader={
                                <>
                                    <div className="flex items-center gap-4">
                                        <Skeleton variant="circle" />
                                        <Skeleton width={100} />
                                    </div>
                                    <Skeleton className="mt-6" width={150} />
                                    <Skeleton className="mt-6" />
                                </>
                            }
                        />
                    </Card>
                ))}
        </div>
    )
}

export default Wallet
