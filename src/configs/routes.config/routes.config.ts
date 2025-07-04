import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/User/Home/Index')),
        authority: [],
    },
    {
        key: 'airtime.direct',
        path: '/airtime/direct',
        component: lazy(() => import('@/views/User/Airtime/Index')),
        authority: [],
    },
    {
        key: 'airtime.pin',
        path: '/airtime/pin',
        component: lazy(() => import('@/views/User/Airtime/Index')),
        authority: [],
    },
    {
        key: 'data',
        path: '/data',
        component: lazy(() => import('@/views/User/Data/Data')),
        authority: [],
    },

    {
        key: 'bill.cable',
        path: '/bill/cable',
        component: lazy(() => import('@/views/User/Cable/Index')),
        authority: [],
    },
    {
        key: 'bill.electricity',
        path: '/bill/electricity',
        component: lazy(() => import('@/views/User/Electricity/Index')),
        authority: [],
    },
    {
        key: 'bill.education',
        path: '/bill/education',
        component: lazy(() => import('@/views/User/Education/Index')),
        authority: [],
    },
    {
        key: 'withdraw',
        path: '/withdraw',
        component: lazy(() => import('@/views/User/Withdraw/Index')),
        authority: [],
    },
    {
        key: 'deposit',
        path: '/deposit',
        component: lazy(() => import('@/views/User/Deposit/Wallets/index')),
        authority: [],
    },

    /** Example purpose only, please remove */
    // {
    //     key: 'referral',
    //     path: '',
    //     component: lazy(() => import('@/views/User/Home/Index')),
    //     authority: [],
    // },
    // {
    //     key: 'referral.log',
    //     path: '/referral/log',
    //     component: lazy(() => import('@/views/User/Referral/Logs')),
    //     authority: [],
    // },
    // {
    //     key: 'referral.level',
    //     path: '/referral/level',
    //     component: lazy(() => import('@/views/User/Referral/Level')),
    //     authority: [],
    // },
    // {
    //     key: 'banking.airtime',
    //     path: '/banking/airtime',
    //     component: lazy(() => import('@/views/User/Banking/Airtime')),
    //     authority: [],
    // },
    // {
    //     key: 'banking.data',
    //     path: '/banking/data',
    //     component: lazy(() => import('@/views/User/Banking/Data')),
    //     authority: [],
    // },
    // {
    //     key: 'finance.withdraw',
    //     path: '/withdraw',
    //     component: lazy(() => import('@/views/User/Withdraw')),
    //     authority: [],
    // },
    // {
    //     key: 'finance.withdraw.log',
    //     path: '/withdraw/logs',
    //     component: lazy(() => import('@/views/User/Withdraw/Logs')),
    //     authority: [],
    // },
    {
        key: 'transaction.log',
        path: '/transaction/logs',
        component: lazy(() => import('@/views/User/Transaction/Index')),
        authority: [],
    },
    {
        key: 'settings',
        path: '/user/settings/*',
        component: lazy(() => import('@/views/User/Settings')),
        authority: [],
    },
]
