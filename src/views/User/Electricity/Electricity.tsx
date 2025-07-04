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
import { Field, FieldProps, Form, Formik, FormikErrors, FormikState } from 'formik'
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
    AvailableDiscoResponse,
    AvailableDiscoTypeResponse,
    DiscoType,
    NetworkType
} from '@/@types/billing'
import { isErrorType } from '@/utils/helpeer'
import isEmpty from 'lodash/isEmpty'
import PinConfirmation from '@/components/shared/PinConfirmation'
import { AnimatePresence, motion } from 'framer-motion'
import { apiVerifyCableName, apiVerifyMeterName } from '@/services/BillingService'
import { Loading } from '@/components/shared'

export type DiscoFormType = {
    disco_name: string
    amount: number
    meter_number: string
    meter_type: string
    phone: string
    customer_name: string
    // wallet: string
}
const initialValue: DiscoFormType = {
    phone: '',
    amount: 0,
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

const dataValidationScheme: ObjectSchema<DiscoFormType> = Yup.object().shape({
    phone: Yup.string()
        .required('Phone Number is Required')
        .matches(phoneRegExp, 'Phone number is not valid')
        // .min(11, 'too short')
        .max(11, 'too long'),

    amount: Yup.number().required('Amount not set').min(500, 'amount cant less than 500'),
    disco_name: Yup.string().required('Please select Cable Type'),

    customer_name: Yup.string().required(''),

    meter_type: Yup.string().required(),
    meter_number: Yup.string().required(
        'Please Enter Smart card number'
    ),
})

const disableSubmit = false
const { Control } = components
const metaTypes = [
    { name: 'prepaid', id: 1,},
    { name: 'postpaid', id: 2,
    }]

const enterStyle = { opacity: 1, marginTop: 3, bottom: -21 }
const exitStyle = { opacity: 0, marginTop: -10 }
const initialStyle = exitStyle

const Electricity = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [networksIsLoading, setNetworksIsLoading] = useState<boolean>(false)
    const [customerNameIsLoading, setCustomerNameIsLoading] = useState<boolean>(false)
    const [networks, setNetworks] = useState<AvailableDiscoResponse>([])
    const [meterType, setMeterType] = useState<(typeof metaTypes)>(metaTypes)
    const [customerName, setCustomerName] = useState<string>('')

    const [openPinModal, setOpenPinModal] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const { BuyDiscoRequest, GetDiscoType, GetCablePlans, GetAllDisco } =
        useBillingRequest()

    useEffect(() => {
        if (isEmpty(networks)) {
            setNetworksIsLoading(true)
            GetAllDisco()
                .then((value) => {
                    console.log(value)
                    if (!isErrorType(value)) {
                        setNetworks(value)
                    } else setNetworks([])
                })
                .finally(() => {
                    setNetworksIsLoading(false)
                })

            setCustomerName('')
        }

    }, [])




    function handleChangeNetwork(
        network: string,
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean | undefined
        ) => Promise<void | FormikErrors<DiscoFormType>>
    ) {

        setFieldValue('meter_typeType', null)
        setFieldValue('meter_type', null)
    }

    const onMeterFocus = async () => {
        if (isEmpty(networks)) {
            setNetworksIsLoading(true)
            const res = await GetAllDisco()
            if (!isErrorType(res)) {
                console.log(res)
                setNetworks(res)
            }
            setNetworksIsLoading(false)
        }
    }

    const handlePinOk = async (_values: DiscoFormType, resetForm: (nextState?: (Partial<FormikState<DiscoFormType>> | undefined)) => void) => {
        // const { amount, disco_name, phone } = _values
        setLoading(true)
       const res =  await BuyDiscoRequest({ ..._values })

        if (isErrorType(res)) {
            setLoading(false)
            toast.push(
                <Notification type="danger" duration={10000}>
                    <p>{res?.message || 'Recharge Not Successful'}</p>
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        }
        else {
            resetForm()
            setLoading(false)
            toast.push(
                <Notification type="success" closable  duration={0} >
                    <p>{res?.message || ' Topup Successful'}</p>
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        }
    }
    const handleSubmit = async () => {
        setOpenPinModal(true)
    }

    const CustomSelectOption:
        | React.ComponentType<
              OptionProps<AvailableDiscoResponse[number], false, GroupBase<AvailableDiscoResponse[number]>>
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
                    <Avatar shape="circle" size={20} src={`/img/electricity/${data.name.toLowerCase().replace(' electric', '')}.png`} />
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </div>
                {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
            </div>
        )
    }

    const CustomControl:
        | React.ComponentType<
              ControlProps<AvailableDiscoResponse[number], false, GroupBase<AvailableDiscoResponse[number]>>
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
                        src={`/img/electricity/${selected.name.toLowerCase().replace("electric", '').trim()}.png`}
                    />
                )}
                {children}
            </Control>
        )
    }

    const verifyMeterName = async (iuc: string, cableName: string, meter_type: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<DiscoFormType>>) => {
        const res = await apiVerifyMeterName( iuc,cableName, meter_type)
        if (res.status == 200) {
            setCustomerName(res.data.name)
            await setFieldValue('customer_name', res.data.name)
        }
        else {
            setCustomerName('')
            await setFieldValue('customer_name', '')
            toast.push(
                <Notification type="danger" duration={10000}>
                    <p>{res.data.message || 'Invalid Meter number'}</p>
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        }
    }
    return (
        <Loading loading={loading}>
            <div className="flex items-center justify-between mb-6">
                <h4>Buy Electricity</h4>
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
                      resetForm,
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
                                    label="Disco Name"
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
                                                getOptionValue={(option) =>
                                                    option.alias
                                                }
                                                getOptionLabel={(option) =>
                                                    option.name
                                                }
                                                components={{
                                                    Option: CustomSelectOption,
                                                    Control: CustomControl,
                                                }}
                                                isLoading={networksIsLoading}
                                                value={networks.filter(
                                                    (option: AvailableDiscoResponse[number]) =>
                                                        option.alias ===
                                                        values.disco_name
                                                )}
                                                onFocus={onMeterFocus}
                                                onChange={(
                                                    option: SingleValue<AvailableDiscoResponse[number]>
                                                ) => {
                                                    console.log(option)
                                                    handleChangeNetwork(
                                                        option?.alias as string,
                                                        setFieldValue
                                                    )

                                                    form.setFieldValue(
                                                        field.name,
                                                        option?.alias
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
                                    label="Meter Type"
                                    invalid={
                                        errors.meter_type && touched.meter_type
                                    }
                                    errorMessage={errors.meter_type}
                                >
                                    <Field name="meter_type">
                                        {({
                                            field,
                                            form,
                                        }: FieldProps<FormModel>) => (
                                            <Select
                                                field={field}
                                                form={form}
                                                isDisabled={!!errors.disco_name}
                                                options={meterType}
                                                getOptionValue={option => option.name}
                                                getOptionLabel={option => option.name.toUpperCase()}
                                                value={meterType.filter(
                                                    (option) =>
                                                        option.name ===
                                                        values.meter_type
                                                )}

                                                onChange={async (
                                                    option: SingleValue<typeof  meterType[number]>
                                                ) => {



                                                    await form.setFieldValue(
                                                        field.name,
                                                        option!.name
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
                                    label="Meter number"
                                    invalid={
                                        errors.meter_number &&
                                        touched.meter_number
                                    }
                                    errorMessage={errors.meter_number}
                                >
                                    <InputGroup>
                                        <Field
                                        name="meter_number"
                                        component={Input}
                                        onChange={(event: any) => {
                                            if(!isEmpty(values.customer_name)) {
                                                 setFieldValue('customer_name', '')
                                            }
                                             setFieldValue(
                                                'meter_number',
                                                event.target.value as string
                                            )
                                        }}
                                    />
                                        <Button type={'button'} loading={customerNameIsLoading} disabled={!!errors.meter_number || !!errors.meter_type}
                                                onClick={async ()=> {
                                                    setCustomerNameIsLoading(true)
                                                    await verifyMeterName(values.meter_number, values.disco_name, values.meter_type, setFieldValue)
                                                    setCustomerNameIsLoading(false)
                                                }}
                                        >Validate</Button>
                                    </InputGroup>

                                </FormItem>
                            </div>


                                <div className={''}>
                                    <FormItem
                                        className="w-full"
                                        label="Customer Name"
                                        invalid={
                                            errors.customer_name &&
                                            touched.customer_name
                                        }

                                        errorMessage={errors.customer_name}
                                    >
                                        <Field
                                            name="customer_name"
                                            disabled={true}
                                            component={Input}
                                        />
                                        {customerNameIsLoading && (
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    className="form-explain"
                                                    initial={initialStyle}
                                                    animate={enterStyle}
                                                    exit={exitStyle}
                                                    transition={{ duration: 0.15, type: 'tween' }}
                                                >
                                                    {'validating...'}
                                                </motion.div>
                                            </AnimatePresence>
                                        )}
                                    </FormItem>
                                </div>


                            <div className={''}>
                                <FormItem
                                    className="w-full"
                                    label="Amount"
                                    invalid={
                                        errors.amount && touched.amount
                                    }
                                    errorMessage={errors.amount}
                                >
                                    <Field
                                        name="amount"

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
                                        await handlePinOk(values, resetForm)
                                        setSubmitting(false)
                                    }}
                                />
                            )}
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </Loading>
    )
}

export default Electricity
