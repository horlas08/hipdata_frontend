import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { Notification, Select, toast } from '@/components/ui'
import { countryList } from '../../../constants/countries.constant'
import { SetStateAction, useEffect, useState } from 'react'
import { CountryValidate } from '@/@types/auth'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import queryString from 'query-string'
import { apiPlan } from '@/services/PlanService'
import { apiCountry } from '@/services/SiteService'

type FormModel = {
    input: string
    select: string
}
interface planResponse {
    label: string
    value: string
}

interface CountryResonse extends planResponse {
    id: string | number
}
interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    username: string
    password: string
    password_confirmation: string
    firstname: string
    lastname: string
    mobile: string
    email: string
}

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your user name'),
    firstname: Yup.string().required('Please enter your first name'),
    lastname: Yup.string().required('Please enter your last name'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),

    mobile: Yup.string().required('mobile Number is required').min(10),
    upline: Yup.string().nullable(),
    password: Yup.string()
        .required('Please enter your password')
        .min(8, 'Password must be atleast 8 character'),
    password_confirmation: Yup.string()
        .required('Confirm Password Error')
        .oneOf([Yup.ref('password')], 'Your passwords do not match'),
})

const SignUpForm = (props: SignUpFormProps) => {
    const location = useLocation()
    const [plans, setPlans] = useState<planResponse[]>([])
    const [countrys, setCountrys] = useState<CountryResonse[]>([])

    const [loadingPlan, setLoadingPlan] = useState(false)
    const [loadingCountry, setLoadingCountry] = useState(false)

    const uplines = queryString.parse(location.search).ref_id

    const onPlanFocus = () => {
        if (plans.length === 0) {
            setLoadingPlan(true)
            getPlan()
        }
    }

    const onCountryFocus = () => {
        if (countrys.length === 0) {
            setLoadingCountry(true)
            getCountry()
        }
    }

    async function getPlan() {
        await apiPlan().then((res) => {
            if (res.status == 200) {
                setPlans(res.data)
                setLoadingPlan(false)
            } else {
                setPlans([])
            }
        })
    }
    async function getCountry() {
        await apiCountry().then((res) => {
            if (res.status == 200) {
                setCountrys(res.data)
                setLoadingCountry(false)
            } else {
                setCountrys([])
            }
        })
    }
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()
    const navigate = useNavigate()
    const [message, setMessage] = useTimeOutMessage()
    // const [country, setCountry] = useState('')

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const {
            username,
            password,
            password_confirmation,
            email,

            firstname,
            lastname,
            mobile,
        } = values
        setSubmitting(true)
        await signUp({
            username,
            password,
            password_confirmation,
            email,
            mobile,
            firstname,
            lastname,
        }).then((data) => {
            if (data?.status === 'failed') {
                setMessage(data.message)
            } else {
                toast.push(
                    <Notification type="success" duration={10000}>
                        <p>{data?.message || 'Registration Successful'}</p>
                    </Notification>,
                    {
                        placement: 'top-end',
                    }
                )
                navigate('/sign-in')
            }
        })

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    username: 'admin1',
                    password: '12345678',
                    password_confirmation: '12345678',
                    confirmPassword: '123Qwe1',
                    firstname: 'qozeem',
                    lastname: 'monsurudeen',
                    email: 'test@testmail.com',
                    mobile: '09014985680',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, values, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="First Name"
                                invalid={errors.firstname && touched.firstname}
                                errorMessage={errors.firstname}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="firstname"
                                    placeholder="E.g john"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Last Name"
                                invalid={errors.lastname && touched.lastname}
                                errorMessage={errors.lastname}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="lastname"
                                    placeholder="E.g samuel"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="User Name"
                                invalid={errors.username && touched.username}
                                errorMessage={errors.username}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="username"
                                    placeholder="User Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="mobile Number"
                                invalid={errors.mobile && touched.mobile}
                                errorMessage={errors.mobile}
                            >
                                <Field
                                    type="mobile"
                                    autoComplete="off"
                                    name="mobile"
                                    placeholder="mobile Number"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                />
                            </FormItem>

                            <FormItem
                                label="Confirm Password"
                                invalid={
                                    errors.password_confirmation &&
                                    touched.password_confirmation
                                }
                                errorMessage={errors.password_confirmation}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password_confirmation"
                                    placeholder="Confirm Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Already have an account? </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
