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


import { HiCheck } from 'react-icons/hi'
import { useNetworkDetect } from '@/utils/hooks/useNetworkDetect'
import {
    BuyDataScheme,
    NetworkProviderType, NetworkType
} from '@/@types/billing'
import { isErrorType } from '@/utils/helpeer'
import isEmpty from 'lodash/isEmpty'
import PinConfirmation from '@/components/shared/PinConfirmation'
import { ActionMeta, ControlProps, GroupBase,components, OptionProps, SingleValue } from 'react-select'
import { useAppSelector } from '@/store'
import { Loading } from '@/components/shared'

export type DataFormType = {
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
                '1',
                '2',
                '3',
                '4',
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

    const [networksIsLoading, setNetworksIsLoading] = useState<boolean>(false)
    const [submittingLoading, setSetSubmittingLoading] = useState<boolean>(false)
    const [networks, setNetworks] = useState<NetworkProviderType[]>([])
    const [planType, setPlanType] = useState<NetworkType[]>([])

    const [plans, setPlans] = useState<NetworkType['plans']>([])
    const [openPinModal, setOpenPinModal] = useState(false)

    const [message, setMessage] = useTimeOutMessage()
    const user = useAppSelector(state => state.auth.user)
    const { DataRequest, DataAvailableNetwork } =
        useBillingRequest()

    useEffect(() => {
        if(isEmpty(networks)){
            setNetworksIsLoading(true)
            DataAvailableNetwork()
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

    }, [])



    const onNetworkTypeFocus = async () => {
        if (isEmpty(networks)) {
            setNetworksIsLoading(true)
            const res = await DataAvailableNetwork()
            if (!isErrorType(res)) {
                setNetworks(res)
            }
            setNetworksIsLoading(false)
        }
    }

    const handlePinOk = async (_values: DataFormType) => {
        setSetSubmittingLoading(true)
        const { amount, phone, network,planType, plan } = _values
        const data: BuyDataScheme = {
            network_id: Number(network),
            phone_number: phone,
            plan_id: Number(plan),
            plan_type: planType
        }

        const res = await DataRequest(data)
        setSetSubmittingLoading(false)
        if (isErrorType(res)) {
            setMessage(res.message)
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
            toast.push(
                <Notification type="success" duration={10000}>
                    <p>{res?.message || 'Recharge Successful'}</p>
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
              OptionProps<NetworkProviderType, false, GroupBase<NetworkProviderType>>
          >
        | undefined = ({ innerProps, label, data, isSelected }) => {
        return (
            <div
                className={`flex items-center  justify-between p-2 ${
                    isSelected
                        ? 'bg-gray-100 dark:bg-gray-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                {...innerProps}
            >
                <div className="flex items-center">
                    <Avatar shape="circle" size={20} src={`img/networks/${data.alias}.png`} />
                    <span className="ml-2 rtl:mr-2">{data.name}</span>
                </div>
                {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
            </div>
        )
    }
    const { phone,
        setPhone,
        error,
        getNetworkName,
        getNetworkId,
    } = useNetworkDetect()

    const CustomControl:
        | React.ComponentType<
              ControlProps<NetworkProviderType, false, GroupBase<NetworkProviderType>>
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
                        src={`img/networks/${selected.alias}.png`}
                    />
                )}
                {children}
            </Control>
        )
    }

    return (
        <Loading loading={submittingLoading || false} className="w-full" style={{ height: '100%'}}>
            <div className="flex items-center justify-between mb-6">
                <h4>Buy Data</h4>
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
                                            onChange={ async (event: any) => {
                                                setPhone(
                                                    event.target.value as string
                                                )
                                                await setFieldValue(
                                                    'phone',
                                                    event.target.value as string
                                                )

                                                if (error) {
                                                    setFieldError(
                                                        'phone',
                                                        error
                                                    )
                                                    await setFieldTouched(
                                                        'phone',
                                                        true
                                                    )
                                                }

                                                if (getNetworkName() != null) {
                                                    await setFieldValue(
                                                        'network',
                                                        getNetworkId()
                                                    )
                                                    await setFieldValue('planType', '')
                                                    await setFieldValue('plan', '')

                                                } else {
                                                    setFieldValue('network', '')
                                                }
                                            }}
                                            component={Input}
                                        />
                                        <div
                                            style={{ minWidth: 180 }}
                                            className={'h-11'}
                                        >
                                            <FormItem
                                                className="w-full"
                                                invalid={
                                                    errors.network &&
                                                    touched.network
                                                }

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
                                                            getOptionLabel={option => option.name}
                                                            getOptionValue={option => option.id.toString()}
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
                                                                    option: NetworkProviderType
                                                                ) =>
                                                                    option.id.toString() ===
                                                                    values.network
                                                            )}
                                                            onFocus={onNetworkTypeFocus}

                                                            onChange={async (
                                                                option: SingleValue<NetworkProviderType>

                                                            ) => {
                                                                console.log(
                                                                    option
                                                                )
                                                                setPlanType([])
                                                                setPlans([])
                                                                await setFieldValue('planType', '')
                                                                await setFieldValue('plan', '')
                                                                setPlanType(option!.type)

                                                                await form.setFieldValue(
                                                                    field.name,
                                                                    option?.id.toString()
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

                                                getOptionValue={(option) =>
                                                    option.alias
                                                }
                                                getOptionLabel={(option) =>
                                                    option.name
                                                }
                                                value={planType.filter(
                                                    (option: NetworkType) =>
                                                        option.alias ===
                                                        values.planType
                                                )}

                                                onChange={(
                                                    option: SingleValue<NetworkType>
                                                ) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        option?.alias
                                                    )

                                                    setPlans(option!.plans)
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
                                                option.id.toString()
                                            }

                                            getOptionLabel={(option) =>
                                                option.name
                                            }

                                            value={plans.filter(
                                                (
                                                    option:NetworkType['plans'][number]
                                                ) =>
                                                    option.id.toString() ===
                                                    values.plan
                                            )}

                                            onChange={async (
                                                option: SingleValue<
                                                    NetworkType['plans'][number]
                                                >
                                            ) => {
                                                await setFieldValue(
                                                    'amount',
                                                    user.user_type ? option?.agent_amount :option?.amount
                                                )
                                                await form.setFieldValue(
                                                    field.name,
                                                    option?.id.toString()
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
        </Loading>
    )
}

export default Data