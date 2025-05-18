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
    AvailableCableResponse, CablePlan
} from '@/@types/billing'
import { isErrorType } from '@/utils/helpeer'
import isEmpty from 'lodash/isEmpty'
import PinConfirmation from '@/components/shared/PinConfirmation'
import { apiVerifyCableName } from '@/services/BillingService'

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
    const [networks, setNetworks] = useState<AvailableCableResponse>([])
    const [customerName, setCustomerName] = useState<string>('')

    const [plans, setPlans] = useState<CablePlan[]>([])
    const [openPinModal, setOpenPinModal] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

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

    async function verifyCableName(cable_number: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<FormModel>>) {
        const res = await apiVerifyCableName(cable_number)
        if (res.status == 200) {
            setCustomerName(res.data.name)
            setFieldValue('customer_name', res.data.name)
        }
        else {
            setCustomerName('')
            setFieldValue('customer_name', '')
        }
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
                                                getOptionLabel={option => option.name}
                                                getOptionValue={option => option.id.toString()}
                                                isLoading={networksIsLoading}
                                                value={networks.filter(
                                                    (option: AvailableCableResponse[number]) =>
                                                        option.id.toString() ===
                                                        values.cable_name
                                                )}
                                                // onFocus={onPlanFocus}
                                                onChange={async (
                                                    option: SingleValue<AvailableCableResponse[number]>
                                                ) => {
                                                    console.log(option)
                                                    await setFieldValue('plan', null)
                                                    setPlans(option!.plans)
                                                    await setFieldValue(
                                                        field.name,
                                                        option!.id.toString()
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
                                                    option.alias
                                                }
                                                getOptionLabel={(option) =>
                                                    option.name
                                                }
                                                isLoading={planIsLoading}
                                                value={plans.filter(
                                                    (
                                                        option: CablePlan
                                                    ) =>
                                                        option.alias ===
                                                        values.plan
                                                )}

                                                onChange={async (
                                                    option: SingleValue<
                                                        CablePlan
                                                    >
                                                ) => {
                                                    await setFieldValue(
                                                        'amount',
                                                        option?.amount
                                                    )

                                                    await form.setFieldValue(
                                                        field.name,
                                                        option?.alias
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
                                        onChange={async (event: any) => {
                                            setFieldValue(
                                                'iuc',
                                                event.target.value as string
                                            )
                                        }}
                                    />
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
