import BankTransfer from './Wallets'
import CardDeposit from './Card'
import CouponDeposit from './Coupon'
import CheckoutDeposit from './Checkout'
import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../../components/shared/Container'
import AdaptableCard from '../../../components/shared/AdaptableCard'
import Tabs from '../../../components/ui/Tabs'
import { statusColor } from '@/views/User/Deposit/Wallets/constants'

type FundingType = 'bank_transfer' | 'card' | 'coupon' | 'checkout' | (& {})
const fundingOption: Record<
    string,
    {
        label: string
        path: string
    }
> = {
    bank_transfer: { label: 'Bank Transfer', path: 'banks' },
    coupon: { label: 'Coupon', path: 'coupon' },
    card: { label: 'Atm Card', path: 'card' },
    checkout: { label: 'Checkout', path: 'checkout' },
}
const Deposit = () => {
    const [currentTab, setCurrentTab] = useState<FundingType>('bank_transfer')
    const navigate = useNavigate()

    const onTabChange = (val: FundingType) => {
        setCurrentTab(val)
        // navigate(`/deposit`)
    }
    const { TabNav, TabList } = Tabs
    return (
        <Container>
            <AdaptableCard>
                <Tabs value={currentTab as string} onChange={(val: FundingType) => onTabChange(val)}>
                    <TabList>
                        {Object.keys(fundingOption).map((key) => (
                            <TabNav key={key} value={key}>
                                {fundingOption[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <div className="px-4 py-6">
                    <Suspense fallback={<></>}>
                        {currentTab === 'bank_transfer' && (
                            <BankTransfer />
                        )}
                        {currentTab === 'card' && (
                            <CardDeposit />
                        )}
                        {currentTab === 'coupon' && (
                            <CouponDeposit />
                        )}
                        {currentTab === 'checkout' && (
                            <CheckoutDeposit />
                        )}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default Deposit
