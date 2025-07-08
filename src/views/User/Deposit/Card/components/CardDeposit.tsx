import { useState } from 'react'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
    Alert,
    Button,
    FormContainer,
    FormItem,
    Input,
    Select,
} from '@/components/ui'
import { SingleValue } from 'react-select'
import { useAppSelector } from '@/store'
import { ActionLink } from '@/components/shared'
import Card from '@/components/ui/Card'
import { HiCreditCard, HiLockClosed } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'

const initialValues = {
    amount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
}

const cardDepositValidateScheme = Yup.object().shape({
    amount: Yup.number().required('Amount is required').min(100, 'Minimum amount is ₦100'),
    cardNumber: Yup.string().required('Card number is required').matches(/^\d{16}$/, 'Card number must be 16 digits'),
    expiryDate: Yup.string().required('Expiry date is required').matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Format: MM/YY'),
    cvv: Yup.string().required('CVV is required').matches(/^\d{3,4}$/, 'CVV must be 3-4 digits'),
    cardHolderName: Yup.string().required('Card holder name is required'),
})

type CardDepositProps = {
    data?: any
}

const CardDeposit = ({ data }: CardDepositProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const user = useAppSelector((state) => state.auth.user)

    const handleSubmit = async (values: typeof initialValues) => {
        setLoading(true)
        try {
            // TODO: Implement card deposit API call
            console.log('Card deposit values:', values)
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
        } catch (error) {
            console.error('Card deposit error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
                        <HiCreditCard className="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-semibold">ATM Card Deposit</h4>
                        <p className="text-gray-500 dark:text-gray-400">Securely deposit funds using your ATM card</p>
                    </div>
                </div>

                <Formik
                    validationSchema={cardDepositValidateScheme}
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

                                    <FormItem
                                        label="Card Number"
                                        invalid={errors.cardNumber && touched.cardNumber}
                                        errorMessage={errors.cardNumber}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="cc-number"
                                            name="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormItem
                                            label="Expiry Date"
                                            invalid={errors.expiryDate && touched.expiryDate}
                                            errorMessage={errors.expiryDate}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="cc-exp"
                                                name="expiryDate"
                                                placeholder="MM/YY"
                                                component={Input}
                                            />
                                        </FormItem>

                                        <FormItem
                                            label="CVV"
                                            invalid={errors.cvv && touched.cvv}
                                            errorMessage={errors.cvv}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="cc-csc"
                                                name="cvv"
                                                placeholder="123"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>

                                    <FormItem
                                        label="Card Holder Name"
                                        invalid={errors.cardHolderName && touched.cardHolderName}
                                        errorMessage={errors.cardHolderName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="cc-name"
                                            name="cardHolderName"
                                            placeholder="John Doe"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                        <HiLockClosed className="text-amber-600 dark:text-amber-400" />
                                        <p className="text-sm text-amber-700 dark:text-amber-300">
                                            Your payment information is encrypted and secure
                                        </p>
                                    </div>

                                    <Button
                                        block
                                        loading={loading}
                                        variant="solid"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {loading ? 'Processing...' : 'Deposit Funds'}
                                    </Button>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
            </Card>
        </div>
    )
}

export default CardDeposit 