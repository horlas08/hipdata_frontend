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
    },{
        key: 'airtime',
        path: '/airtime',
        component: lazy(() => import('@/views/User/Airtime/Index')),
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
    // {
    //     key: 'transaction.log',
    //     path: '/user/transaction/log',
    //     component: lazy(() => import('@/views/User/Transaction/Index')),
    //     authority: [],
    // },
    // {
    //     key: 'settings',
    //     path: '/user/settings/profile',
    //     component: lazy(() => import('@/views/User/Settings')),
    //     authority: [],
    // },
]
