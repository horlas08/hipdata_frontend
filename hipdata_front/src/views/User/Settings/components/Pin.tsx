import classNames from 'classnames'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik, FormikState } from 'formik'
import isLastChild from '@/utils/isLastChild'
import {
    HiOutlineDesktopComputer,
    HiOutlineDeviceMobile,
    HiOutlineDeviceTablet,
} from 'react-icons/hi'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import { apiChangePin } from '@/services/AuthService'
import { setUser, useAppDispatch, useAppSelector } from '@/store'
import { isNull } from 'lodash'

type LoginHistory = {
    type: string
    deviceName: string
    time: number
    location: string
}

export type PinFormModel = {
    currentPin: string
    newPin: string
    confirmNewPin: string
}

const LoginHistoryIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'Desktop':
            return <HiOutlineDesktopComputer />
        case 'Mobile':
            return <HiOutlineDeviceMobile />
        case 'Tablet':
            return <HiOutlineDeviceTablet />
        default:
            return <HiOutlineDesktopComputer />
    }
}


const Pin = ({ data }: { data?: LoginHistory[] }) => {
    const user = useAppSelector((state) => state.auth.user)
    const dispatcher = useAppDispatch();
    const validationSchema = Yup.object().shape({
        currentPin: Yup.string()
            .test((value, context) => {
                if(user.has_pin){
                    context.createError({
                        message: 'Enter your current PIN',
                        path: 'currentPin',
                        type: 'required',

                    })
                }else {
                    return true;
                }
            })
            .matches(/^\d{4}$/, 'PIN must be 4 digits'),
        newPin: Yup.string()
            .required('Enter your new PIN')
            .matches(/^\d{4}$/, 'PIN must be 4 digits'),
        confirmNewPin: Yup.string()
            .required('PIN not match')
            .oneOf([Yup.ref('newPin'), ''], 'PIN not match'),
    })

    const onFormSubmit = async (
        values: PinFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: (nextState?: (Partial<FormikState<{
            currentPin: string
            newPin: string
            confirmNewPin: string
        }>> | undefined)) => void
    ) => {
        const res = await apiChangePin(values)
        if (res.status != 200) {

            toast.push(
                <Notification title={'PIN Error'} type="danger">
                    {res.data?.message}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            setSubmitting(false)
        }
        else {

            toast.push(
                <Notification title={'PIN Info'} type="success">
                    PIN Update Successful
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            dispatcher(setUser({...user, has_pin: true}))
            setSubmitting(false)
            resetForm()
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    currentPin: '',
                    newPin: '',
                    confirmNewPin: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onFormSubmit(values, setSubmitting, resetForm)
                    }, 1000)
                }}
            >
                {({ touched, errors, isSubmitting, resetForm }) => {
                    const validatorProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <FormDesription
                                    title="PIN"
                                    desc={ (user.has_pin)?'Enter your current & new PIN to reset your PIN': 'Set up your pin for transaction validate'}
                                />
                                { (user.has_pin) && (
                                    <FormRow
                                        name="currentPin"
                                        label="Current PIN"
                                        {...validatorProps}
                                    >
                                        <Field
                                            type="password"
                                            autoComplete="off"
                                            name="currentPin"
                                            placeholder="Current PIN"
                                            component={Input}
                                        />
                                    </FormRow>
                                )}


                                <FormRow
                                    name="newPin"
                                    label="New PIN"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="newPin"
                                        placeholder="New PIN"
                                        component={Input}
                                    />
                                </FormRow>
                                <FormRow
                                    name="confirmNewPin"
                                    label="Confirm PIN"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="confirmNewPin"
                                        placeholder="Confirm PIN"
                                        component={Input}
                                    />
                                </FormRow>

                                <div className="mt-4 ltr:text-right">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        type="button"
                                        onClick={() => resetForm()}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        variant="solid"
                                        loading={isSubmitting}
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Updating'
                                            : 'Update PIN'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
            <div className="mt-6">
                <FormDesription
                    title="Where you're signed in"
                    desc="You're signed in to your account on these devices."
                />
                {data && (
                    <div className="rounded-lg border border-gray-200 dark:border-gray-600 mt-6">
                        {data.map((log, index) => (
                            <div
                                key={log.deviceName}
                                className={classNames(
                                    'flex items-center px-4 py-6',
                                    !isLastChild(data, index) &&
                                        'border-b border-gray-200 dark:border-gray-600'
                                )}
                            >
                                <div className="flex items-center">
                                    <div className="text-3xl">
                                        <LoginHistoryIcon type={log.type} />
                                    </div>
                                    <div className="ml-3 rtl:mr-3">
                                        <div className="flex items-center">
                                            <div className="text-gray-900 dark:text-gray-100 font-semibold">
                                                {log.deviceName}
                                            </div>
                                            {index === 0 && (
                                                <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 rounded-md border-0 mx-2">
                                                    <span className="capitalize">
                                                        {' '}
                                                        Current{' '}
                                                    </span>
                                                </Tag>
                                            )}
                                        </div>
                                        <span>
                                            {log.location} •{' '}
                                            {dayjs
                                                .unix(log.time)
                                                .format('DD-MMM-YYYY, hh:mm A')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Pin
