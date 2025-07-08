import { useState } from 'react'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
    Button,
    FormContainer,
    FormItem,
    Input,
    Dialog,
} from '@/components/ui'
import Card from '@/components/ui/Card'
import { HiCreditCard, HiShoppingCart, HiGlobe } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import useBillingRequest from '@/utils/hooks/useBillingRequest'
import { isErrorType } from '@/utils/helpeer'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

const initialValues = {
    amount: '',
}

const checkoutValidateScheme = Yup.object().shape({
    amount: Yup.number().required('Amount is required').min(100, 'Minimum amount is ₦100'),
})

type PaymentGateway = 'paystack' | 'flutterwave' | 'moniepoint'

interface PaymentGatewayOption {
    id: PaymentGateway
    name: string
    description: string
    icon: React.ReactNode
    color: string
}

const paymentGateways: PaymentGatewayOption[] = [
    {
        id: 'paystack',
        name: 'Paystack',
        description: 'Pay with card, bank transfer, or USSD',
        icon: <HiCreditCard className="text-2xl" />,
        color: 'bg-green-500 hover:bg-green-600'
    },
    {
        id: 'flutterwave',
        name: 'Flutterwave',
        description: 'Pay with card, bank transfer, or mobile money',
        icon: <HiGlobe className="text-2xl" />,
        color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
        id: 'moniepoint',
        name: 'Moniepoint',
        description: 'Pay with Moniepoint wallet or card',
        icon: <HiShoppingCart className="text-2xl" />,
        color: 'bg-purple-500 hover:bg-purple-600'
    }
]

const CheckoutDeposit = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [showGatewayModal, setShowGatewayModal] = useState<boolean>(false)
    const [selectedAmount, setSelectedAmount] = useState<number>(0)
    const { InitializeCheckout } = useBillingRequest()

    const handleSubmit = async (values: typeof initialValues) => {
        setSelectedAmount(values.amount)
        setShowGatewayModal(true)
    }

    const handleGatewaySelect = async (gateway: PaymentGateway) => {
        setLoading(true)
        try {
            const response = await InitializeCheckout({
                amount: selectedAmount,
                gateway: gateway
            })

            if (!isErrorType(response)) {
                // Handle successful checkout initialization
                if (response.redirect_url) {
                    window.location.href = response.redirect_url
                } else if (response.checkout_url) {
                    window.open(response.checkout_url, '_blank')
                }

                toast.push(
                    <Notification title="Checkout initialized" type="success" />,
                    { placement: 'top-center' }
                )
            } else {
                toast.push(
                    <Notification title={response.message} type="danger" />,
                    { placement: 'top-center' }
                )
            }
        } catch (error) {
            console.error('Checkout error:', error)
            toast.push(
                <Notification title="Failed to initialize checkout" type="danger" />,
                { placement: 'top-center' }
            )
        } finally {
            setLoading(false)
            setShowGatewayModal(false)
        }
    }

    return (
        <>
            <div className="max-w-2xl mx-auto">
                <Card>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/20">
                            <HiShoppingCart className="text-2xl text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Quick Checkout</h4>
                            <p className="text-gray-500 dark:text-gray-400">Choose your preferred payment method</p>
                        </div>
                    </div>

                    <Formik
                        validationSchema={checkoutValidateScheme}
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ values, touched, errors, isSubmitting }) => {
                            return (
                                <Form>
                                    <FormContainer>
                                        <FormItem
                                            label="Amount (₦)"
                                            invalid={errors.amount && touched.amount}
                                            errorMessage={errors.amount}
                                        >
                                            <Field name="amount">
                                                {({ field, form }: FieldProps) => {
                                                    return (
                                                        <NumericFormat
                                                            customInput={Input}
                                                            type="text"
                                                            autoComplete="off"
                                                            placeholder="Enter amount"
                                                            onValueChange={(val) => {
                                                                form.setFieldValue(field.name, val.floatValue)
                                                            }}
                                                            thousandSeparator={true}
                                                            prefix="₦"
                                                        />
                                                    )
                                                }}
                                            </Field>
                                        </FormItem>

                                        <Button
                                            block
                                            variant="solid"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Continue to Payment
                                        </Button>
                                    </FormContainer>
                                </Form>
                            )
                        }}
                    </Formik>
                </Card>
            </div>

            {/* Payment Gateway Selection Modal */}
            <Dialog
                isOpen={showGatewayModal}
                onClose={() => setShowGatewayModal(false)}
                onRequestClose={() => setShowGatewayModal(false)}
            >
                <div className="p-6">
                    <h4 className="mb-4 text-lg font-semibold">Select Payment Method</h4>
                    <p className="mb-6 text-gray-600 dark:text-gray-400">
                        Amount: ₦{selectedAmount.toLocaleString()}
                    </p>

                    <div className="space-y-3">
                        {paymentGateways.map((gateway) => (
                            <button
                                key={gateway.id}
                                onClick={() => handleGatewaySelect(gateway.id)}
                                disabled={loading}
                                className={`w-full p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 flex items-center gap-4 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
                            >
                                <div className={`p-2 rounded-lg text-white ${gateway.color}`}>
                                    {gateway.icon}
                                </div>
                                <div className="flex-1 text-left">
                                    <h5 className="font-semibold">{gateway.name}</h5>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {gateway.description}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button
                            block
                            variant="default"
                            onClick={() => setShowGatewayModal(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default CheckoutDeposit 