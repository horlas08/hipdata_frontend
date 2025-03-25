import React, { useState } from 'react'
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

const initialValues = {
    amount: '',
    accountNumber: '2147534556',
    accountName: 'Qozeem',
    bankName: 'Uba',
    wallet: '',
}
type WalletModel = {
    input: string
    select: string
}
type WalletType = {
    value: string
    label: string
}
const withdrawalValidateScheme = Yup.object().shape({
    amount: Yup.number().required().min(1),
    accountNumber: Yup.number().required().min(10).max(10),
    accountName: Yup.string().required('Update Account In Profile Page'),
    bankName: Yup.string().required('Update Account In Profile Page'),
    wallet: Yup.string().oneOf([
        'referral_wallet',
        'referral_level_wallet',
        'betting_wallet',
        'activities_wallet',
    ]),
})
const Index = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [wallets, setWallets] = useState<WalletType[]>([])
    const user = useAppSelector((state) => state.auth.user)
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h4>Buy Data</h4>
            </div>
            <Formik
                validationSchema={withdrawalValidateScheme}
                initialValues={initialValues}
                onSubmit={() => {
                    //
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                {user.has_account ? (
                                    <>
                                        <div className="">
                                            <FormItem
                                                className="w-full"
                                                label="Account Number"
                                                invalid={
                                                    errors.accountNumber &&
                                                    touched.accountNumber
                                                }
                                                errorMessage={
                                                    errors.accountNumber
                                                }
                                            >
                                                <Field
                                                    type="number"
                                                    autoComplete="off"
                                                    disabled={true}
                                                    placeholder="E.g 3055677899"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="">
                                            <FormItem
                                                className="w-full"
                                                label="Account Name"
                                                invalid={
                                                    errors.accountName &&
                                                    touched.accountName
                                                }
                                                errorMessage={
                                                    errors.accountName
                                                }
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="accountName"
                                                    disabled={true}
                                                    placeholder="E.g 3055677899"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="">
                                            <FormItem
                                                className="w-full"
                                                label="Bank Name"
                                                invalid={
                                                    errors.bankName &&
                                                    touched.bankName
                                                }
                                                errorMessage={errors.bankName}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="bankName"
                                                    disabled={true}
                                                    placeholder="E.g 3055677899"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                    </>
                                ) : (
                                    <Alert showIcon={true}>
                                        Kindly Update Your Withdrawal Detail
                                        From Profile{' '}
                                        <ActionLink
                                            to={'/user/settings/profile'}
                                        >
                                            By Click Here
                                        </ActionLink>
                                    </Alert>
                                )}

                                <div className="">
                                    <FormItem
                                        className="w-full"
                                        label="Amount"
                                        invalid={
                                            errors.amount && touched.amount
                                        }
                                        errorMessage={errors.amount}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="amount"
                                            placeholder="Amount"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="">
                                    <FormItem
                                        className="w-full"
                                        label="Withdraw From"
                                        invalid={
                                            errors.wallet && touched.wallet
                                        }
                                        errorMessage={errors.wallet}
                                    >
                                        <Field name="wallet">
                                            {({
                                                field,
                                                form,
                                            }: FieldProps<WalletModel>) => (
                                                <Select
                                                    field={field}
                                                    form={form}
                                                    options={wallets}
                                                    isLoading={loading}
                                                    value={wallets.filter(
                                                        (option: WalletType) =>
                                                            option.value ===
                                                            values.wallet
                                                    )}
                                                    // onFocus={onPlanFocus}
                                                    onChange={(
                                                        option: SingleValue<WalletType>
                                                    ) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            option?.value
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                </div>
                                <Button
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                >
                                    {isSubmitting
                                        ? 'Please Wait...'
                                        : 'Withdraw Now'}
                                </Button>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
export default Index
