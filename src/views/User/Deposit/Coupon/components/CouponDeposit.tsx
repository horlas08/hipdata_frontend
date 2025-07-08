import { useState } from 'react'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
    Alert,
    Button,
    FormContainer,
    FormItem,
    Input,
} from '@/components/ui'
import Card from '@/components/ui/Card'
import { HiTicket, HiCheckCircle } from 'react-icons/hi'
import useBillingRequest from '@/utils/hooks/useBillingRequest'
import { isErrorType } from '@/utils/helpeer'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

const initialValues = {
    couponCode: '',
}

const couponValidateScheme = Yup.object().shape({
    couponCode: Yup.string().required('Coupon code is required').min(6, 'Coupon code must be at least 6 characters'),
})

type CouponDepositProps = {
    data?: any
}

const CouponDeposit = ({ data }: CouponDepositProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [couponDetails, setCouponDetails] = useState<any>(null)
    const { ValidateCoupon, RedeemCoupon } = useBillingRequest()

    const handleSubmit = async (values: typeof initialValues) => {
        setLoading(true)
        try {
            const response = await ValidateCoupon(values.couponCode)

            if (!isErrorType(response)) {
                setCouponDetails({
                    code: values.couponCode,
                    value: response.value || response.amount,
                    type: response.type || 'fixed',
                    valid: true,
                    ...response
                })

                toast.push(
                    <Notification title="Coupon validated successfully" type="success" />,
                    { placement: 'top-center' }
                )
            } else {
                toast.push(
                    <Notification title={response.message} type="danger" />,
                    { placement: 'top-center' }
                )
            }
        } catch (error) {
            console.error('Coupon validation error:', error)
            toast.push(
                <Notification title="Failed to validate coupon" type="danger" />,
                { placement: 'top-center' }
            )
        } finally {
            setLoading(false)
        }
    }

    const handleRedeem = async () => {
        if (!couponDetails) return

        setLoading(true)
        try {
            const response = await RedeemCoupon(couponDetails.code)

            if (!isErrorType(response)) {
                toast.push(
                    <Notification title="Coupon redeemed successfully" type="success" />,
                    { placement: 'top-center' }
                )

                // Reset form and details
                setCouponDetails(null)
            } else {
                toast.push(
                    <Notification title={response.message} type="danger" />,
                    { placement: 'top-center' }
                )
            }
        } catch (error) {
            console.error('Coupon redemption error:', error)
            toast.push(
                <Notification title="Failed to redeem coupon" type="danger" />,
                { placement: 'top-center' }
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/20">
                        <HiTicket className="text-2xl text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h4 className="font-semibold">Coupon Code</h4>
                        <p className="text-gray-500 dark:text-gray-400">Redeem your coupon code for instant credit</p>
                    </div>
                </div>

                {!couponDetails ? (
                    <Formik
                        validationSchema={couponValidateScheme}
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ values, touched, errors, isSubmitting }) => {
                            return (
                                <Form>
                                    <FormContainer>
                                        <FormItem
                                            label="Coupon Code"
                                            invalid={errors.couponCode && touched.couponCode}
                                            errorMessage={errors.couponCode}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="couponCode"
                                                placeholder="Enter your coupon code"
                                                component={Input}
                                            />
                                        </FormItem>

                                        <Button
                                            block
                                            loading={loading}
                                            variant="solid"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            {loading ? 'Validating...' : 'Validate Coupon'}
                                        </Button>
                                    </FormContainer>
                                </Form>
                            )
                        }}
                    </Formik>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center gap-2 mb-2">
                                <HiCheckCircle className="text-green-600 dark:text-green-400" />
                                <span className="font-semibold text-green-800 dark:text-green-200">
                                    Valid Coupon!
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Code:</span>
                                    <span className="font-mono font-semibold">{couponDetails.code}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Value:</span>
                                    <span className="font-semibold">₦{couponDetails.value.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                                    <span className="capitalize">{couponDetails.type}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                block
                                loading={loading}
                                variant="solid"
                                onClick={handleRedeem}
                                disabled={loading}
                            >
                                {loading ? 'Redeeming...' : 'Redeem Coupon'}
                            </Button>
                            <Button
                                variant="default"
                                onClick={() => setCouponDetails(null)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}

export default CouponDeposit 