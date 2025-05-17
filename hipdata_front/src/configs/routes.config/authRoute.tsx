import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { LAYOUT_TYPE_BLANK } from '@/constants/theme.constant'

const authRoute: Routes = [
    {
        key: '/',
        path: `/`,
        component: lazy(() => import('@/views/auth/Home/Homepage')),
        authority: [],
    },
    {
        key: 'index',
        path: `/index`,
        component: lazy(() => import('@/views/auth/Home/Homepage')),
        authority: [],
    },

    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@/views/auth/SignIn')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        authority: [],
    },
]

export default authRoute
