import {
    Button,
    FormContainer,
    FormItem,
    Input,
    Notification,
    Select,
    toast,
} from '@/components/ui'
import { csrfToken } from '@/services/AuthService'
import { apiBuyAirtime } from '@/services/BankingService'
import {
    Field,
    FieldProps,
    Form,
    Formik,
    FormikHelpers,
    FormikValues,
} from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'

import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useBankingRequest from './Hooks/useBankingRequest'
import { SingleValue } from 'react-select'
import { apiBankingWallet, BankingWalletResponse } from '@/services/SiteService'

const initialValue = {
    phone: '',
    amount: '' as unknown as number,
    network: '',
    wallet: '',
}
type FormModel = {
    input: string
    select: string
}
export type BuyAirtimeScheme = {
    phone: string
    amount: number
    network: string
    wallet: string
}
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const airtimeValidationScheme = Yup.object().shape({
    phone: Yup.string()
        .required('Phone Number is Required')
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(11, 'too short')
        .max(11, 'too long'),
    amount: Yup.number()
        .required('Amount Is Required')
        .min(5, 'amount cant less than 1$'),

    network: Yup.string()
        .oneOf(['mtn', 'glo', '9mobile', 'airtel'], 'Invalid Nework Select')
        .required('Please Select Network'),
    wallet: Yup.string()
        .oneOf([
            'referral_wallet',
            'referral_level_wallet',
            'betting_wallet',
            'activities_wallet',
        ])
        .required('Please Select A Wallet'),
})
type NetworkType = {
    value: string
    label: string
}
const disableSubmit = false

const Airtime = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [networks, setNetworks] = useState<NetworkType[]>([])
    const [wallet, setWallets] = useState<BankingWalletResponse[]>([])
    const [countries, setCountries] = useState<NetworkType[]>([])
    const [message, setMessage] = useTimeOutMessage()
    const { AirtimeRequest } = useBankingRequest()
    function walletFocus() {
        if (!wallet) {
            apiBankingWallet().then((res) => {
                setWallets(res.data)
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        setNetworks([
            {
                value: 'mtn',
                label: 'Mtn',
            },
            {
                value: 'glo',
                label: 'Glo',
            },
            {
                value: 'airtel',
                label: 'Airtel',
            },
            {
                value: '9mobile',
                label: '9Mobile',
            },
        ])
    }, [])

    const BuyAirtime = async (
        _values: BuyAirtimeScheme,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { amount, phone, network, wallet } = _values
        await AirtimeRequest({ amount, phone, network, wallet }).then((res) => {
            if (res?.status === 'failed') {
                setMessage(res.message)
                toast.push(
                    <Notification type="danger" duration={10000}>
                        <p>{res?.message || 'Recharge Not Successful'}</p>
                    </Notification>,
                    {
                        placement: 'top-end',
                    }
                )
            } else {
                toast.push(
                    <Notification type="success" duration={10000}>
                        <p>{res?.message || 'Recharge Successful'}</p>
                    </Notification>,
                    {
                        placement: 'top-end',
                    }
                )
            }
        })
        setSubmitting(true)

        setSubmitting(false)
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h4>Buy Airtime</h4>
            </div>
            <Formik
                initialValues={initialValue}
                validationSchema={airtimeValidationScheme}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        BuyAirtime(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                    //pass
                    // function (, formikHelpers: FormikHelpers<FormikValues>): void | Promise<any> {
                    //     throw new Error('Function not implemented.')
                    // }
                }}
            >
                {({ values, errors, touched, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="flex gap-2">
                                <FormItem
                                    className="w-full"
                                    label="Phone Number"
                                    invalid={errors.phone && touched.phone}
                                    errorMessage={errors.phone}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="phone"
                                        placeholder="E.g 09055677899"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    className="w-full"
                                    label="Amount"
                                    invalid={errors.amount && touched.amount}
                                    errorMessage={errors.amount}
                                >
                                    <Field
                                        min={0}
                                        type="number"
                                        autoComplete="off"
                                        name="amount"
                                        placeholder="Enter Amount In Dollar"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>

                            <FormItem
                                label="Network"
                                invalid={errors.network && touched.network}
                                errorMessage={errors.network}
                            >
                                <Field name="network">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={networks}
                                            value={networks.filter(
                                                (option: NetworkType) =>
                                                    option.value ===
                                                    values.network
                                            )}
                                            onChange={(
                                                option: SingleValue<NetworkType>
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

                            <FormItem
                                label="Wallet"
                                invalid={errors.wallet && touched.wallet}
                                errorMessage={errors.wallet}
                            >
                                <Field name="wallet">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={wallet}
                                            isLoading={loading}
                                            value={wallet.filter(
                                                (option: NetworkType) =>
                                                    option.value ===
                                                    values.wallet
                                            )}
                                            onFocus={() => walletFocus()}
                                            onChange={(
                                                option: SingleValue<NetworkType>
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

                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Please Wait...' : 'Buy Now'}
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Airtime
