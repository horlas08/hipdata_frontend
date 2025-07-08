import {
    Button,
    FormContainer,
    FormItem,
    Input,
    Notification,
    Select,
    toast,
} from '@/components/ui'
import { apiGetAirtimeNetwork } from '@/services/BillingService'
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { SingleValue } from 'react-select'
import { SelectKeyValue } from '@/services/SiteService'
import { useNetworkDetect } from '@/utils/hooks/useNetworkDetect'
import { HttpStatusCode } from 'axios'
import isEmpty from 'lodash/isEmpty'
import useBillingRequest from '@/utils/hooks/useBillingRequest'
import { AirtimeNetworkProvider } from '@/@types/billing'

const initialValue = {
    phone: '09110545505',
    amount: '100' as unknown as number,
    network: 'airtel',
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
    wallet?: string
}

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const airtimeValidationScheme = Yup.object().shape({
    phone: Yup.string()
        .required('Phone Number is Required')
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'too short')
        .max(14, 'too long'),
    amount: Yup.number()
        .required('Amount Is Required')
        .min(100, 'amount cant less than 100Naira'),

    network: Yup.string()
        .oneOf(
            ['mtn', 'glo', '9mobile', 'airtel', '1'],
            'Invalid Nework Select'
        )
        .required('Please Select Network'),
    wallet: Yup.string()
        .oneOf(
            ['referral_wallet', 'betting_wallet', 'funding_wallet'],
            'Invalid Wallet Please select From The List'
        )
        .required('Please Select A Wallet'),
})

const disableSubmit = false

const Airtime = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [networks, setNetworks] = useState<AirtimeNetworkProvider[]>([])
    const [wallet, setWallets] = useState<SelectKeyValue[]>([])
    const [message, setMessage] = useTimeOutMessage()
    const { AirtimeRequest } = useBillingRequest()
    const { phone, setPhone, error, getNetworkName } = useNetworkDetect()

    async function handleGetNetwork() {
        setLoading(true)
        const response = await apiGetAirtimeNetwork()
        if (response.status == HttpStatusCode.Ok) {
            setNetworks(response.data)
            console.log(response.data)
        }
        setLoading(false)
    }

    function walletFocus() {
        setWallets([
            {
                label: 'Funding wallet',
                value: 'funding_wallet',
            },
        ])
        if (!wallet) {
            setLoading(true)

            // apiBankingWallet().then((res) => {
            //
            // })
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isEmpty(networks)) {
            ;(async () => await handleGetNetwork())()
        }
    }, [networks])

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
                {({
                    values,
                    setFieldValue,
                    setFieldError,
                    setFieldTouched,
                    errors,
                    touched,
                    isSubmitting,
                }) => (
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
                                        onChange={(event: any) => {
                                            setPhone(
                                                event.target.value as string
                                            )
                                            setFieldValue(
                                                'phone',
                                                event.target.value as string
                                            )
                                            if (error) {
                                                setFieldError('phone', error)
                                                setFieldTouched('phone', true)
                                            }

                                            if (getNetworkName() != null) {
                                                setFieldValue(
                                                    'network',
                                                    getNetworkName()?.toLowerCase()
                                                )
                                            } else {
                                                setFieldValue('network', '')
                                            }
                                        }}
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
                                        placeholder="Enter Amount"
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
                                            value={networks?.filter(
                                                (
                                                    option: AirtimeNetworkProvider
                                                ) =>
                                                    option.alias ===
                                                    values.network
                                            )}
                                            isLoading={loading}
                                            onFocus={async (event) => {
                                                if (isEmpty(networks)) {
                                                    await handleGetNetwork()
                                                }
                                            }}
                                            getOptionLabel={(option) => {
                                                return option.name.toUpperCase()
                                            }}
                                            getOptionValue={(option) => {
                                                return option.alias
                                            }}
                                            onChange={(
                                                option: SingleValue<AirtimeNetworkProvider>
                                            ) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.alias
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
                                            value={wallet.filter(
                                                (option: SelectKeyValue) =>
                                                    option.value ===
                                                    values.wallet
                                            )}
                                            onFocus={() => walletFocus()}
                                            onChange={(
                                                option: SingleValue<SelectKeyValue>
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
