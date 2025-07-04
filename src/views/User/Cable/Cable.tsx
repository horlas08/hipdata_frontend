import {
    Avatar,
    Button,
    FormContainer,
    FormItem,
    Input, InputGroup,
    Notification,
    Select,
    toast
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
    AvailableCableResponse, CablePlan
} from '@/@types/billing'
import { isErrorType } from '@/utils/helpeer'
import isEmpty from 'lodash/isEmpty'
import PinConfirmation from '@/components/shared/PinConfirmation'
import { apiVerifyCableName } from '@/services/BillingService'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppSelector } from '@/store'
import { Loading } from '@/components/shared'

export type CableFormType = {
    cable_name: string
    amount: string
    iuc: string
    plan: string
    phone: string
    customer_name: string
    // wallet: string
}

type FormModel = {
    input: string
    select: string
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
    const [customerNameIsLoading, setCustomerNameIsLoading] = useState<boolean>(false)
    const [networks, setNetworks] = useState<AvailableCableResponse>([])
    const [customerName, setCustomerName] = useState<string>('')
    const user = useAppSelector(state => state.auth.user)
    const [plans, setPlans] = useState<CablePlan[]>([])
    const [openPinModal, setOpenPinModal] = useState(false)
    const initialValue: CableFormType = {
        phone: user.mobile,
        amount: '',
        cable_name: '',
        customer_name: '',
        iuc: '',
        plan: '',
        // wallet: '',
    }

    const { BuyCableRequest, GetAllCable } =
        useBillingRequest()

    useEffect(() => {
        if(isEmpty(networks)){
            setNetworksIsLoading(true)
            GetAllCable()
                .then((value) => {
                    console.log(value)
                    if (!isErrorType(value)) {
                        setNetworks(value)
                    } else setNetworks([])
                })
                .finally(() => {
                    setNetworksIsLoading(false)
                })
        }


        setCustomerName('')
    }, [])

    async function onPlanNameFocus() {
        if(isEmpty(networks)){
            setNetworksIsLoading(true)
            GetAllCable()
                .then((value) => {
                    console.log(value)
                    if (!isErrorType(value)) {
                        setNetworks(value)
                    } else setNetworks([])
                })
                .finally(() => {
                    setNetworksIsLoading(false)
                })
        }
    }


    const handlePinOk = async (_values: CableFormType, resetForm:  (nextState?: Partial<FormikState<CableFormType>>) => void) => {
        // const { amount, cable_name, phone } = _values
        setLoading(true)
        await BuyCableRequest({ ..._values })
            .then((res) => {
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
                    <Notification type="success" duration={10000}>
                        <p>{res?.message || 'Cable Tv Topup Successful'}</p>
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

    const enterStyle = { opacity: 1, marginTop: 3, bottom: -21 }
    const exitStyle = { opacity: 0, marginTop: -10 }
    const initialStyle = exitStyle

    const CustomSelectOption:
        | React.ComponentType<
              OptionProps<AvailableCableResponse[number], false, GroupBase<AvailableCableResponse[number]>>
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
                    <Avatar shape="circle" size={20} src={`/img/cable/${data.alias}.png`} />
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </div>
                {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
            </div>
        )
    }

    const CustomControl:
        | React.ComponentType<
              ControlProps<AvailableCableResponse[number], false, GroupBase<AvailableCableResponse[number]>>
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
                        src={`/img/cable/${selected.alias}.png`}
                    />
                )}
                {children}
            </Control>
        )
    }

    async function verifyCableName(cable_number: string, network: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<CableFormType>>) {
        const res = await apiVerifyCableName(cable_number, network)
        if (res.status == 200) {
            setCustomerName(res.data.name)
            await setFieldValue('customer_name', res.data.name)
        }
        else {
            setCustomerName('')
            await setFieldValue('customer_name', '')
            toast.push(
                <Notification type="danger" duration={10000}>
                    <p>{res.data.message || 'Invalid IUC number'}</p>
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
                    getFieldMeta,
                    getFieldHelpers,
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
                                                getOptionLabel={option => option.name}
                                                getOptionValue={option => option.alias}
                                                isLoading={networksIsLoading}
                                                value={networks.filter(
                                                    (option: AvailableCableResponse[number]) =>
                                                        option.alias ===
                                                        values.cable_name
                                                )}
                                                onFocus={onPlanNameFocus}
                                                onChange={async (
                                                    option: SingleValue<AvailableCableResponse[number]>
                                                ) => {
                                                    console.log(option)
                                                    await setFieldValue('plan', null)
                                                    setPlans(option!.plans)
                                                    await setFieldValue(
                                                        field.name,
                                                        option!.alias
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
                                                        option: CablePlan
                                                    ) =>
                                                        option.variation_code ===
                                                        values.plan
                                                )}

                                                onChange={async (
                                                    option: SingleValue<
                                                        CablePlan
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
                            </div>

                            <div>
                                <FormItem
                                    className="w-full"
                                    label="Smart card number / IUC number"

                                    invalid={errors.iuc && touched.iuc}
                                    errorMessage={errors.iuc}
                                >
                                    <InputGroup>
                                        <Field
                                            name="iuc"
                                            component={Input}
                                            disabled={!!errors.plan}

                                            onChange={async (event: any) => {
                                                await setFieldValue(
                                                    'iuc',
                                                    event.target.value as string
                                                )
                                                await setFieldValue('customer_name', '')
                                                setCustomerName('')


                                            }}
                                        />
                                        <Button type={'button'} loading={customerNameIsLoading} disabled={!!errors.plan || !!errors.iuc || !!errors.cable_name}
                                        onClick={async ()=> {
                                            setCustomerNameIsLoading(true)
                                            await verifyCableName(values.iuc, (values.cable_name), setFieldValue)
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
                                        errors.amount &&
                                        touched.amount
                                    }

                                    errorMessage={errors.amount}
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
                                    invalid={errors.amount && touched.amount}
                                    errorMessage={errors.amount}
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
                                    <Field name="phone" disabled={!!user.mobile} component={Input} />
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

export default Cable
