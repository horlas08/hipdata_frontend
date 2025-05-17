import Card from '@/components/ui/Card'
import { NumericFormat } from 'react-number-format'
import GrowShrinkTag from '@/components/shared/GrowShrinkTag'
import { useAppSelector } from '../../../store'
import dayjs from 'dayjs'

type StatisticCardProps = {
    data?: {
        value: number
        growShrink: number
    }
    label: string
    valuePrefix?: string
    // date: number
}

export type StatisticProps = {
    balance: {
        value: number
        growShrink: number
    },totalSpend: {
        value: number
        growShrink: number
    },
    totalReferrals: {
        value: number
        growShrink: number
    }
}

const StatisticCard = ({
    data = { value: 0, growShrink: 0 },
    label,
    valuePrefix,
}: StatisticCardProps) => {
    return (
        <Card className={'border-2 !border-blue-700 '}>
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">
                        <NumericFormat
                            thousandSeparator
                            className={''}
                            displayType="text"
                            value={data.value}
                            prefix={valuePrefix}
                        />
                    </h3>
                </div>
                <GrowShrinkTag value={data.growShrink} suffix="%" />
            </div>
        </Card>
    )
}

const Statistic = ( data : StatisticProps) => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <StatisticCard
                data={data?.balance}
                valuePrefix="₦"
                label="Balance"

                // date={startDate}
            />

            <StatisticCard
                data={data?.totalSpend}
                valuePrefix="₦"
                label="Total Spend"
                // date={startDate}
            />
            <StatisticCard
                data={data?.totalReferrals}
                valuePrefix=""
                label="Total Referral"
                // date={startDate}
            />
        </div>
    )
}

export default Statistic
