import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Switcher from '@/components/ui/Switcher'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineBriefcase,
    HiOutlineUser,
    HiCheck,
    HiOutlineGlobeAlt,
} from 'react-icons/hi'
import * as Yup from 'yup'
import type { OptionProps, ControlProps } from 'react-select'
import type { FormikProps, FieldInputProps, FieldProps } from 'formik'
import { setUser, useAppDispatch, useAppSelector } from '@/store'
import { apiUpdateUserProfile } from '@/services/AccountServices'
import { LanguageOption, ProfileFormModel } from '@/@types/user'
import appConfig from '@/configs/app.config'
import { useState } from 'react'
import { apiUser } from '@/services/AuthService'

const { Control } = components

// @ts-ignore
const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('First Name Required'),
    last_name: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Last Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    avatar: Yup.mixed()
        .optional()
        .test('fileType', 'File must be an image', (value) => {
            if (!value) return true
            return value instanceof File && value.type.startsWith('image/')
        })
        .test('fileSize', 'File size must be less than 2MB', (value) => {
            if (!value) return true
            return value instanceof File && value.size <= 2 * 1024 * 1024
        }),
    lang: Yup.string(),
    country: Yup.string(),
    syncData: Yup.bool(),
})

const langOptions: LanguageOption[] = [
    { value: 'en', label: 'English (US)', imgPath: '/img/countries/us.png' },
    { value: 'ch', label: '中文', imgPath: '/img/countries/cn.png' },
    { value: 'jp', label: '日本语', imgPath: '/img/countries/jp.png' },
    { value: 'fr', label: 'French', imgPath: '/img/countries/fr.png' },
]

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<LanguageOption>) => {
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
                <Avatar shape="circle" size={20} src={data.imgPath} />
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({
    children,
    ...props
}: ControlProps<LanguageOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={18}
                    src={selected.imgPath}
                />
            )}
            {children}
        </Control>
    )
}

const Profile = () => {
    const user = useAppSelector((state) => state.auth.user)
    const dispatch = useAppDispatch()

    const onSetFormFile = (
        form: FormikProps<ProfileFormModel>,
        field: FieldInputProps<ProfileFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, file[0])
    }

    const onFormSubmit = (
        values: ProfileFormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            apiUpdateUserProfile(values).then((res) => {
                if (res.status != 200) {
                    toast.push(
                        <Notification title={'Profile Error'} type="danger">
                            {res.data.message}
                        </Notification>,
                        {
                            placement: 'top-center',
                        }
                    )
                } else {
                    apiUser().then((res) => {
                        if (res.status == 200) {
                            dispatch(setUser(res.data))
                            toast.push(
                                <Notification
                                    title={'Profile Updated Successfully'}
                                    type="success"
                                ></Notification>,
                                {
                                    placement: 'top-center',
                                }
                            )
                        }
                    })
                }
            })
        } catch (e: any) {
            toast.push(
                <Notification title={'Profile Error'} type="danger">
                    error
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }

        setSubmitting(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                const userImagePath = `${appConfig.apiWeb}/assets/images/user/${user.image}`
                const [imgUrl, setImgUrl] = useState<string | undefined | File>(
                    userImagePath
                )
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title="General"
                                desc="Basic info, like your name and address that will displayed in public"
                            />
                            <FormRow
                                name="first_name"
                                label="First Name"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="first_name"
                                    placeholder="First Name"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="last_name"
                                label="Last Name"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="last_name"
                                    placeholder="Last Name"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="avatar"
                                label="Avatar"
                                {...validatorProps}
                            >
                                <Field name="avatar">
                                    {({ field, form }: FieldProps) => {
                                        const avatarProps = imgUrl
                                            ? { src: imgUrl }
                                            : {
                                                  src: `${appConfig.apiWeb}/assets/images/user/${field.value}`,
                                              }

                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                showList={false}
                                                uploadLimit={1}
                                                onChange={(files) => {
                                                    setImgUrl(
                                                        URL.createObjectURL(
                                                            files[0]
                                                        )
                                                    )
                                                    return onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }}
                                                onFileRemove={(files) => {
                                                    return onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }}
                                            >
                                                <Avatar
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={60}
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>
                            <FormRow
                                name="email"
                                label="Email"
                                {...validatorProps}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    disabled={true}
                                    placeholder="Email"
                                    component={Input}
                                    prefix={
                                        <HiOutlineMail className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormDesription
                                className="mt-8"
                                title="Preferences"
                                desc="Your personalized preference displayed in your account"
                            />

                            <FormRow
                                name="country"
                                label="Country"
                                {...validatorProps}
                            >
                                <Field
                                    readOnly
                                    type="text"
                                    autoComplete="off"
                                    name="country"
                                    placeholder="Country"
                                    disabled={true}
                                    component={Input}
                                    prefix={
                                        <HiOutlineGlobeAlt className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="syncData"
                                label="Sync Data"
                                {...validatorProps}
                                border={false}
                            >
                                <Field name="syncData" component={Switcher} />
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
                                    {isSubmitting ? 'Updating' : 'Update'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile
