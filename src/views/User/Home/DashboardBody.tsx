import Loading from '@/components/shared/Loading'
import Statistic, { StatisticProps } from './Statistic'
import { Input, toast, Tooltip } from '@/components/ui'
import { HiOutlineDuplicate } from 'react-icons/hi'
import classNames from 'classnames'
import useThemeClass from '@/utils/hooks/useThemeClass'
import Notification from '@/components/ui/Notification'
import { useAppSelector } from '@/store'

export type Wallet = {
    ref_link: string
}

const DashboardBody = ({ data = {} }: { data: Partial<Wallet> }) => {
    const { textTheme } = useThemeClass()
    const user = useAppSelector((state) => state.auth.user)
    console.log(user)
    const statsData: StatisticProps = {
        balance: {
            value: Number.parseFloat(user.balance),
            growShrink: 1,
        },
        totalSpend: {
            value: Number.parseFloat(user.balance),
            growShrink: 1,
        },
        totalReferrals: {
            value: Number.parseFloat(user.balance),
            growShrink: 1,
        },
    }
    // const loading = useAppSelector((state) => state.salesDashboard.data.loading)

    // useEffect(() => {
    //     fetchData()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // const fetchData = () => {
    //     dispatch(getSalesDashboardData())
    // }
    const handleCopyClick = (address = '') => {
        navigator.clipboard.writeText(address)
        toast.push(
            <Notification title="Copied" type="success" duration={1000} />,
            {
                placement: 'top-center',
            }
        )
    }

    return (
        <Loading loading={false}>
            <Statistic
                balance={statsData.balance}
                totalReferrals={statsData.totalReferrals}
                totalSpend={statsData.totalSpend}
            />
            <h3>Referral Link</h3>
            <Input
                readOnly
                value={data.ref_link}
                suffix={
                    <Tooltip title="Copy">
                        <HiOutlineDuplicate
                            className={classNames(
                                'cursor-pointer text-xl',
                                `hover:${textTheme}`
                            )}
                            onClick={() => handleCopyClick(data.ref_link)}
                        />
                    </Tooltip>
                }
            />
        </Loading>
    )
}

export default DashboardBody
