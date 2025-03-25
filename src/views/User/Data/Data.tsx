import {
    Avatar,
    Button,
    FormContainer,
    FormItem,
    Input,
    InputGroup,
    Notification,
    Select,
    toast,
} from '@/components/ui'
import { Field, FieldProps, Form, Formik, FormikErrors } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { ObjectSchema } from 'yup'

import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useBillingRequest from '@/utils/hooks/useBillingRequest'

import {
    components,
    ControlProps,
    GroupBase,
    OptionProps,
    SingleValue,
} from 'react-select'
import { BankingWalletResponse } from '@/services/SiteService'

import { HiCheck } from 'react-icons/hi'
import { useNetworkDetect } from '@/utils/hooks/useNetworkDetect'
import {
    DataVariationResponse,
    NetworkPlanType,
    NetworkType,
} from '@/@types/billing'
import { isErrorType } from '@/utils/helpeer'
import isEmpty from 'lodash/isEmpty'
import PinConfirmation from '@/components/shared/PinConfirmation'

type DataFormType = {
    phone: string
    amount: number
    planType: string
    plan: string
    network: string
    // wallet: string
}
const initialValue: DataFormType = {
    phone: '',
    amount: '' as unknown as number,
    planType: '',
    plan: '',
    network: '',
    // wallet: '',
}
type FormModel = {
    input: string
    select: string
}
export type BuyAirtimeScheme = {
    phone: string
    amount: number
    network: string
    // wallet: string
}
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const dataValidationScheme: ObjectSchema<DataFormType> = Yup.object().shape({
    phone: Yup.string()
        .required('Phone Number is Required')
        .matches(phoneRegExp, 'Phone number is not valid')
        // .min(11, 'too short')
        .max(11, 'too long'),

    amount: Yup.number()
        .required('Amount Is Required')
        .min(100, 'amount cant less than 100'),

    network: Yup.string()
        .oneOf(
            [
                'mtn-data',
                'glo-data',
                'etisalat-data',
                'airtel-data',
                'mtn',
                'glo',
                'airtel',
                '9mobile',
            ],
            'Invalid Nework Select'
        )
        .required('Please Select Network'),
    // wallet: Yup.string()
    //     .oneOf([
    //         'referral_wallet',
    //         'referral_level_wallet',
    //         'betting_wallet',
    //         'activities_wallet',
    //     ])
    //     .required('Please Select A Wallet'),
    plan: Yup.string().required(),
    planType: Yup.string().required('Please select plan type'),
})

const disableSubmit = false
const { Control } = components

const Data = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [networksIsLoading, setNetworksIsLoading] = useState<boolean>(false)
    const [planIsLoading, setPlanIsLoading] = useState<boolean>(false)
    const [planTypeIsLoading, setPlanTypeIsLoading] = useState<boolean>(false)
    const [networks, setNetworks] = useState<NetworkType[]>([])
    const [planType, setPlanType] = useState<NetworkPlanType[]>([])
    const [wallets, setWallets] = useState<BankingWalletResponse[]>([])
    const [wallet, setWallet] = useState(false)
    const [plans, setPlans] = useState<DataVariationResponse['data']>([])
    const [openPinModal, setOpenPinModal] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const { AirtimeRequest, GetDataType, GetDataPlans, DataAvailableNetwork } =
        useBillingRequest()

    useEffect(() => {
        setNetworksIsLoading(true)
        DataAvailableNetwork()
            .then((value) => {
                console.log(value)
                if (!isErrorType(value)) {
                    setNetworks(value?.data)
                } else setNetworks([])
            })
            .finally(() => {
                setNetworksIsLoading(false)
            })

        setWallets([])
    }, [])

    function handleChangeNetwork(
        network: string,
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean | undefined
        ) => Promise<void | FormikErrors<DataFormType>>
    ) {
        setPlanType([])
        setFieldValue('planType', null)
        setFieldValue('plan', null)
        setPlans([])
    }

    const onPlanTypeFocus = async (network: string) => {
        if (isEmpty(planType)) {
            setPlanTypeIsLoading(true)
            const res = await GetDataType({ network })
            if (!isErrorType(res)) {
                console.log(res['data'])
                setPlanType(res['data'])
            }
            setPlanTypeIsLoading(false)
        }
    }
    const onPlanFocus = async (network: string, networkType: string) => {
        if (isEmpty(plans)) {
            setPlanIsLoading(true)
            const res = await GetDataPlans({ network, networkType })
            if (!isErrorType(res)) {
                console.log(res['data'])
                setPlans(res['data'])
            }
            setPlanIsLoading(false)
        }
    }

    const handlePinOk = async (_values: DataFormType) => {
        const { amount, phone, network } = _values

        await AirtimeRequest({ amount, phone, network }).then((res) => {
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
    }
    const handleSubmit = async (values: BuyAirtimeScheme) => {
        setOpenPinModal(true)
    }

    const CustomSelectOption:
        | React.ComponentType<
              OptionProps<NetworkType, false, GroupBase<NetworkType>>
          >
        | undefined = ({ innerProps, label, data, isSelected }) => {
        return (
            <div
                className={`flex items-center justify-between p-2 ${
                    isSelected
                        ? 'bg-gray-100 dark:bg-gray-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                {...innerProps}
            >
                <div className="flex items-center">
                    <Avatar shape="circle" size={20} src={data.logo} />
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </div>
                {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
            </div>
        )
    }
    const { phone, setPhone, error, getNetworkName } = useNetworkDetect()

    const CustomControl:
        | React.ComponentType<
              ControlProps<NetworkType, false, GroupBase<NetworkType>>
          >
        | undefined = ({ children, ...props }) => {
        const selected = props.getValue()[0]
        return (
            <Control {...props}>
                {selected && (
                    <Avatar
                        className="ltr:ml-4 rtl:mr-4"
                        shape="circle"
                        size={18}
                        src={selected.logo}
                    />
                )}
                {children}
            </Control>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h4>Buy Data</h4>
            </div>
            <Formik
                initialValues={initialValue}
                validationSchema={dataValidationScheme}
                validateOnMount={true}
                onSubmit={async (values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        await handleSubmit(values)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({
                    values,
                    errors,
                    initialErrors,
                    setFieldError,
                    setFieldTouched,
                    touched,
                    setFieldValue,
                    setSubmitting,
                    isSubmitting,
                }) => (
                    <Form>
                        <FormContainer>
                            <div className="md:flex block gap-2">
                                <FormItem
                                    className="w-full"
                                    label="Phone Number"
                                    invalid={errors.phone && touched.phone}
                                    errorMessage={errors.phone}
                                >
                                    <InputGroup className="">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="phone"
                                            placeholder="E.g 09055677899"
                                            onChange={(event: any) => {
                                                setPhone(
                                                    event.target.value as string
                                                )
                                                setFieldValue(
                                                    'phone',
                                                    event.target.value as string
                                                )
                                                if (error) {
                                                    setFieldError(
                                                        'phone',
                                                        error
                                                    )
                                                    setFieldTouched(
                                                        'phone',
                                                        true
                                                    )
                                                }

                                                if (getNetworkName() != null) {
                                                    setFieldValue(
                                                        'network',
                                                        getNetworkName()?.toLowerCase()
                                                    )
                                                    handleChangeNetwork(
                                                        getNetworkName()?.toLowerCase() as string,
                                                        setFieldValue
                                                    )
                                                } else {
                                                    setFieldValue('network', '')
                                                }
                                            }}
                                            component={Input}
                                        />
                                        <div
                                            style={{ minWidth: 100 }}
                                            className={'h-11'}
                                        >
                                            <FormItem
                                                className="w-full"
                                                // label="Select Plan"
                                                invalid={
                                                    errors.network &&
                                                    touched.network
                                                }
                                                // errorMessage={errors.network}
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
                                                            components={{
                                                                Option: CustomSelectOption,
                                                                Control:
                                                                    CustomControl,
                                                            }}
                                                            isLoading={
                                                                networksIsLoading
                                                            }
                                                            value={networks.filter(
                                                                (
                                                                    option: NetworkType
                                                                ) =>
                                                                    option.value ===
                                                                    values.network
                                                            )}
                                                            // onFocus={onPlanFocus}
                                                            onChange={(
                                                                option: SingleValue<NetworkType>
                                                            ) => {
                                                                console.log(
                                                                    option
                                                                )
                                                                handleChangeNetwork(
                                                                    option?.value as string,
                                                                    setFieldValue
                                                                )

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
                                    </InputGroup>
                                </FormItem>

                                <FormItem
                                    className="w-full"
                                    label="Select Plan Type"
                                    invalid={
                                        errors.planType && touched.planType
                                    }
                                    errorMessage={errors.planType}
                                >
                                    <Field name="planType">
                                        {({
                                            field,
                                            form,
                                        }: FieldProps<FormModel>) => (
                                            <Select
                                                field={field}
                                                form={form}
                                                isDisabled={!!errors.network}
                                                options={planType}
                                                isLoading={planTypeIsLoading}
                                                value={planType.filter(
                                                    (option: NetworkPlanType) =>
                                                        option.value ===
                                                        values.planType
                                                )}
                                                onFocus={() =>
                                                    onPlanTypeFocus(
                                                        values.network
                                                    )
                                                }
                                                onChange={(
                                                    option: SingleValue<NetworkPlanType>
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
                            <FormItem
                                className="w-full"
                                label="Select Plan"
                                invalid={errors.plan && touched.plan}
                                errorMessage={errors.plan}
                            >
                                <Field name="plan">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            isDisabled={!!errors.planType}
                                            options={plans}
                                            getOptionValue={(option) =>
                                                option.variation_code
                                            }
                                            getOptionLabel={(option) =>
                                                option.name
                                            }
                                            isLoading={planIsLoading}
                                            value={plans.filter(
                                                (
                                                    option: DataVariationResponse['data'][0]
                                                ) =>
                                                    option.variation_code ===
                                                    values.plan
                                            )}
                                            onFocus={() =>
                                                onPlanFocus(
                                                    values.network,
                                                    values.planType
                                                )
                                            }
                                            onChange={async (
                                                option: SingleValue<
                                                    DataVariationResponse['data'][0]
                                                >
                                            ) => {
                                                await setFieldValue(
                                                    'amount',
                                                    option?.variation_amount
                                                )
                                                await form.setFieldValue(
                                                    field.name,
                                                    option?.variation_code
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                className="w-full"
                                label="Amount"
                                invalid={errors.plan && touched.plan}
                                errorMessage={errors.plan}
                            >
                                <Field
                                    name="amount"
                                    disabled={true}
                                    component={Input}
                                />
                            </FormItem>

                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Please Wait...' : 'Buy Now'}
                            </Button>
                            <PinConfirmation
                                dialogIsOpen={openPinModal}
                                setIsOpen={setOpenPinModal}
                                onPinOk={async () => {
                                    setSubmitting(true)
                                    await handlePinOk(values)
                                    setSubmitting(false)
                                }}
                            />
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Data
