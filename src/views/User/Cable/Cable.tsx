import {
    Avatar,
    Button,
    FormContainer,
    FormItem,
    Input,
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

export type CableFormType = {
    cable_name: string
    amount: string
    iuc: string
    plan: string
    phone: string
    customer_name: string
    // wallet: string
}
const initialValue: CableFormType = {
    phone: '',
    amount: '',
    cable_name: '',
    customer_name: '',
    iuc: '',
    plan: '',
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

const dataValidationScheme: ObjectSchema<CableFormType> = Yup.object().shape({
    phone: Yup.string()
        .required('Phone Number is Required')
        .matches(phoneRegExp, 'Phone number is not valid')
        // .min(11, 'too short')
        .max(11, 'too long'),

    amount: Yup.string().required('Amount not set'),
    cable_name: Yup.string().required('Please select Cable Type'),

    customer_name: Yup.string().required('Invalid IUC Number'),

    plan: Yup.string().required(),
    iuc: Yup.string().required('Please Enter Smart card number / IUC number'),
})

const disableSubmit = false
const { Control } = components

const Cable = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [networksIsLoading, setNetworksIsLoading] = useState<boolean>(false)
    const [planIsLoading, setPlanIsLoading] = useState<boolean>(false)
    const [planTypeIsLoading, setPlanTypeIsLoading] = useState<boolean>(false)
    const [networks, setNetworks] = useState<NetworkType[]>([])
    const [planType, setPlanType] = useState<NetworkPlanType[]>([])
    const [customerName, setCustomerName] = useState<string>('')
    const [wallet, setWallet] = useState(false)
    const [plans, setPlans] = useState<DataVariationResponse['data']>([])
    const [openPinModal, setOpenPinModal] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const { BuyCableRequest, GetDataType, GetCablePlans, GetAllCable } =
        useBillingRequest()

    useEffect(() => {
        setNetworksIsLoading(true)
        GetAllCable()
            .then((value) => {
                console.log(value)
                if (!isErrorType(value)) {
                    setNetworks(value?.data)
                } else setNetworks([])
            })
            .finally(() => {
                setNetworksIsLoading(false)
            })

        setCustomerName('')
    }, [])

    function handleChangeNetwork(
        network: string,
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean | undefined
        ) => Promise<void | FormikErrors<CableFormType>>
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
    const onPlanFocus = async (cable: string) => {
        if (isEmpty(plans)) {
            setPlanIsLoading(true)
            const res = await GetCablePlans({ cable })
            if (!isErrorType(res)) {
                console.log(res['data'])
                setPlans(res['data'])
            }
            setPlanIsLoading(false)
        }
    }

    const handlePinOk = async (_values: CableFormType) => {
        // const { amount, cable_name, phone } = _values

        await BuyCableRequest({ ..._values }).then((res) => {
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
    const handleSubmit = async () => {
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
                <h4>Buy Cable</h4>
            </div>
            <Formik
                initialValues={initialValue}
                validationSchema={dataValidationScheme}
                validateOnMount={true}
                onSubmit={async (values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        await handleSubmit()
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
                    isValid,
                    touched,
                    setFieldValue,
                    setSubmitting,
                    isSubmitting,
                }) => (
                    <Form>
                        <FormContainer>
                            <div>
                                <FormItem
                                    className="w-full"
                                    label="Cable Name"
                                    invalid={
                                        errors.cable_name && touched.cable_name
                                    }
                                    errorMessage={errors.cable_name}
                                >
                                    <Field name="cable_name">
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
                                                    Control: CustomControl,
                                                }}
                                                isLoading={networksIsLoading}
                                                value={networks.filter(
                                                    (option: NetworkType) =>
                                                        option.value ===
                                                        values.cable_name
                                                )}
                                                // onFocus={onPlanFocus}
                                                onChange={(
                                                    option: SingleValue<NetworkType>
                                                ) => {
                                                    console.log(option)
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

                            <div className={''}>
                                <FormItem
                                    className="w-full"
                                    label="Cable Plan"
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
                                                isDisabled={!!errors.cable_name}
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
                                                    onPlanFocus(values.plan)
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
                                                    await setFieldValue(
                                                        'customer_name',
                                                        'qozeem monsuu'
                                                    )
                                                    setCustomerName(
                                                        'qozeem monsuu'
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
                            </div>

                            <div>
                                <FormItem
                                    className="w-full"
                                    label="Smart card number / IUC number"
                                    invalid={errors.iuc && touched.iuc}
                                    errorMessage={errors.iuc}
                                >
                                    <Field
                                        name="iuc"
                                        component={Input}
                                        onChange={(event: any) => {
                                            setFieldValue(
                                                'iuc',
                                                event.target.value as string
                                            )
                                        }}
                                    />
                                </FormItem>
                            </div>

                            {customerName && (
                                <div className={''}>
                                    <FormItem
                                        className="w-full"
                                        label="Customer Name"
                                        invalid={
                                            errors.customer_name &&
                                            touched.customer_name
                                        }
                                        errorMessage={errors.plan}
                                    >
                                        <Field
                                            name="amount"
                                            disabled={true}
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                            )}

                            <div className={''}>
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
                            </div>

                            <div className={''}>
                                <FormItem
                                    className="w-full"
                                    label="Customer Phone Number"
                                    invalid={errors.phone && touched.phone}
                                    errorMessage={errors.phone}
                                >
                                    <Field name="phone" component={Input} />
                                </FormItem>
                            </div>

                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Please Wait...' : 'Buy Now'}
                            </Button>
                            {isValid && (
                                <PinConfirmation
                                    dialogIsOpen={openPinModal}
                                    setIsOpen={setOpenPinModal}
                                    onPinOk={async () => {
                                        setSubmitting(true)
                                        await handlePinOk(values)
                                        setSubmitting(false)
                                    }}
                                />
                            )}
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Cable
