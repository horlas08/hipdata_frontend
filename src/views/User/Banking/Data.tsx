import {
    Button,
    FormContainer,
    FormItem,
    Input,
    Notification,
    Select,
    toast,
} from '@/components/ui'
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useBankingRequest from './Hooks/useBankingRequest'
import { SingleValue } from 'react-select'
import { BankingWalletResponse } from '@/services/SiteService'
import {
    apiGetDataVariation,
    DataVariationResponse,
} from '@/services/BankingService'

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
        .min(1, 'amount cant less than 1$'),

    network: Yup.string()
        .oneOf(
            ['mtn-data', 'glo-data', 'etisalat-data', 'airtel-data'],
            'Invalid Nework Select'
        )
        .required('Please Select Network'),
    wallet: Yup.string()
        .oneOf([
            'referral_wallet',
            'referral_level_wallet',
            'betting_wallet',
            'activities_wallet',
        ])
        .required('Please Select A Wallet'),
    plan: Yup.string().required().oneOf(['']),
})
type NetworkType = {
    value: string
    label: string
}
const disableSubmit = false

const Airtime = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [networks, setNetworks] = useState<NetworkType[]>([])
    const [wallets, setWallets] = useState<BankingWalletResponse[]>([])
    const [plans, setPlans] = useState<BankingWalletResponse[]>([])
    const [wallet, setWallet] = useState(false)
    const [plan, setPlan] = useState<DataVariationResponse[]>([])
    const [planAmount, setPlanAmount] = useState(null)

    const [message, setMessage] = useTimeOutMessage()
    const { AirtimeRequest } = useBankingRequest()

    useEffect(() => {
        setNetworks([
            {
                value: 'mtn-data',
                label: 'Mtn',
            },
            {
                value: 'glo-data',
                label: 'Glo',
            },
            {
                value: 'airtel-data',
                label: 'Airtel',
            },
            {
                value: 'etisalat-data',
                label: '9Mobile',
            },
        ])
        setWallets([])
        setPlans([])
        // apiBankingWallet().then((res) => {
        //     setWallets(res.data)
        // })
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

    function changeNetwork(network: string) {
        apiGetDataVariation(network).then((res) => {
            if (res.status != 200) {
                toast.push(
                    <Notification type="danger" duration={10000}>
                        <p>
                            {res?.data.message ||
                                'Server Busy Try Again later in 5min'}
                        </p>
                    </Notification>,
                    {
                        placement: 'top-end',
                    }
                )
            } else {
                setPlan(res.data)
            }
        })
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h4>Buy Data</h4>
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
                                                isLoading={loading}
                                                value={networks.filter(
                                                    (option: NetworkType) =>
                                                        option.value ===
                                                        values.network
                                                )}
                                                // onFocus={onPlanFocus}
                                                onChange={(
                                                    option: SingleValue<NetworkType>
                                                ) => {
                                                    changeNetwork(option!.value)

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

                            <div className="flex w-full gap-2">
                                {plan && (
                                    <FormItem
                                        className="w-full"
                                        label="Amount"
                                        invalid={
                                            errors.amount && touched.amount
                                        }
                                        errorMessage={errors.amount}
                                    >
                                        <Field
                                            min={0}
                                            type="number"
                                            autoComplete="off"
                                            name="amount"
                                            disabled={true}
                                            placeholder="Enter Amount In Dollar"
                                            component={Input}
                                        />
                                    </FormItem>
                                )}
                                {wallet && (
                                    <FormItem
                                        label="Wallet"
                                        className="w-full"
                                        invalid={
                                            errors.wallet && touched.wallet
                                        }
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
                                                    options={wallets}
                                                    isLoading={loading}
                                                    value={networks.filter(
                                                        (option: NetworkType) =>
                                                            option.value ===
                                                            values.network
                                                    )}
                                                    // onFocus={onPlanFocus}
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
                                )}
                            </div>

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
