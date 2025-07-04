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
    AvailableDiscoTypeResponse,
    NetworkType,
} from '@/@types/billing'
import { isErrorType } from '@/utils/helpeer'
import isEmpty from 'lodash/isEmpty'
import PinConfirmation from '@/components/shared/PinConfirmation'

export type EducationFormType = {
    disco_name: string
    amount: string
    meter_number: string
    meter_type: string
    phone: string
    customer_name: string
    // wallet: string
}
const initialValue: EducationFormType = {
    phone: '',
    amount: '',
    disco_name: '',
    customer_name: '',
    meter_number: '',
    meter_type: '',
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

const dataValidationScheme: ObjectSchema<EducationFormType> =
    Yup.object().shape({
        phone: Yup.string()
            .required('Phone Number is Required')
            .matches(phoneRegExp, 'Phone number is not valid')
            // .min(11, 'too short')
            .max(11, 'too long'),

        amount: Yup.string().required('Amount not set'),
        disco_name: Yup.string().required('Please select Cable Type'),

        customer_name: Yup.string().required('Invalid meter_number Number'),

        meter_type: Yup.string().required(),
        meter_number: Yup.string().required(
            'Please Enter Smart card number / meter_number number'
        ),
    })

const disableSubmit = false
const { Control } = components

const Education = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [networksIsLoading, setNetworksIsLoading] = useState<boolean>(false)
    const [meter_typeIsLoading, setmeter_typeIsLoading] =
        useState<boolean>(false)

    const [networks, setNetworks] = useState<NetworkType[]>([])
    const [meterType, setMeterType] = useState<NetworkPlanType[]>([])
    const [customerName, setCustomerName] = useState<string>('')
    const [wallet, setWallet] = useState(false)
    const [meterTypes, setMeterTypes] = useState<
        AvailableDiscoTypeResponse['data']
    >([])
    const [openPinModal, setOpenPinModal] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const { BuyDiscoRequest, GetDiscoType, GetCablePlans, GetAllDisco } =
        useBillingRequest()

    useEffect(() => {
        setNetworksIsLoading(true)
        // GetAllDisco()
        //     .then((value) => {
        //         console.log(value)
        //         if (!isErrorType(value)) {
        //             setNetworks(value?.data)
        //         } else setNetworks([])
        //     })
        //     .finally(() => {
        //         setNetworksIsLoading(false)
        //     })

        setCustomerName('')
    }, [])

    function handleChangeNetwork(
        network: string,
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean | undefined
        ) => Promise<void | FormikErrors<EducationFormType>>
    ) {
        setMeterType([])
        // setFieldValue('meter_typeType', null)
        // setFieldValue('meter_type', null)
        setMeterTypes([])
    }

    const onMeterTypeFocus = async () => {
        if (isEmpty(meterTypes)) {
            setmeter_typeIsLoading(true)
            const res = await GetDiscoType()
            if (!isErrorType(res)) {
                console.log(res['data'])
                setMeterTypes(res['data'])
            }
            setmeter_typeIsLoading(false)
        }
    }

    const handlePinOk = async (_values: EducationFormType) => {
        // const { amount, disco_name, phone } = _values

        await BuyDiscoRequest({ ..._values }).then((res) => {
            if (res?.status === 'failed') {
                setMessage(res.message)
                toast.push(
                    <Notification type="danger" duration={10000}>
                        <p>{res?.message || 'Purchase Not Successful'}</p>
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
                <h4>Buy Education Pin</h4>
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
                                    label="E-Pin Type"
                                    invalid={
                                        errors.disco_name && touched.disco_name
                                    }
                                    errorMessage={errors.disco_name}
                                >
                                    <Field name="disco_name">
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
                                                        values.disco_name
                                                )}
                                                // onFocus={onmeter_typeFocus}
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
                                    label="Quantity"
                                    invalid={
                                        errors.customer_name &&
                                        touched.customer_name
                                    }
                                    errorMessage={errors.meter_type}
                                >
                                    <Field name="amount" component={Input} />
                                </FormItem>
                            </div>

                            <div className={''}>
                                <FormItem
                                    className="w-full"
                                    label="Amount"
                                    invalid={
                                        errors.meter_type && touched.meter_type
                                    }
                                    errorMessage={errors.meter_type}
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

export default Education
