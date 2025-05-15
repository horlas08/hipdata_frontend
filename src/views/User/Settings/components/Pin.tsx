import classNames from 'classnames'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik, FormikState } from 'formik'
import * as Yup from 'yup'
import { apiChangePin } from '@/services/AuthService'
import { useState, useEffect } from 'react'
import { useAppSelector } from '@/store'

export type PinFormModel = {
    currentPin: string
    newPin: string
    confirmNewPin: string
}

const validationSchema = Yup.object().shape({
    currentPin: Yup.string()
        .matches(/^[0-9]+$/, 'PIN must contain only numbers')
        .length(4, 'PIN must be exactly 4 digits'),
    newPin: Yup.string()
        .required('Enter your new PIN')
        .matches(/^[0-9]+$/, 'PIN must contain only numbers')
        .length(4, 'PIN must be exactly 4 digits'),
    confirmNewPin: Yup.string()
        .required('PIN not match')
        .oneOf([Yup.ref('newPin'), ''], 'PIN not match'),
})

const Pin = () => {
    // Get user data from Redux store
    const user = useAppSelector((state) => state.auth.user)
    // Check if user has a PIN set
    const hasPin = user?.pin !== null && user?.pin !== undefined && user?.pin !== ''

    const onFormSubmit = (
        values: PinFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: (nextState?: Partial<FormikState<PinFormModel>>) => void
    ) => {
        // Only include currentPin in the request if the user has a PIN set
        const requestData = hasPin
            ? values
            : {
                newPin: values.newPin,
                confirmNewPin: values.confirmNewPin,
                currentPin: '' // Add empty currentPin to satisfy type requirements
            }

        apiChangePin(requestData).then((res) => {
            if (res.status != 200) {
                return toast.push(
                    <Notification title={'PIN Error'} type="danger">
                        {res.data?.message}
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }
            resetForm({})
            return toast.push(
                <Notification title={'PIN Info'} type="success">
                    PIN Update Successful
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        }).finally(() => {
            setSubmitting(false)
        })
    }

    return (
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
                                desc={hasPin
                                    ? "Enter your current & new PIN to reset your PIN"
                                    : "Set up a new PIN for your account"}
                            />

                            {hasPin && (
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
                                        maxLength={4}
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
                                    maxLength={4}
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
                                    maxLength={4}
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
                                    {isSubmitting ? 'Updating' : hasPin ? 'Update PIN' : 'Set PIN'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Pin 