import { Suspense, lazy } from 'react'
import Loading from '@/components/shared/Loading'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import appConfig from '@/configs/app.config'
import PageContainer from '@/components/template/PageContainer'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '@/store'
import AuthorityGuard from '@/components/route/AuthorityGuard'
import AppRoute from '@/components/route/AppRoute'
import type { LayoutType } from '@/@types/theme'
import PublicRoute from '@/components/route/PublicRoute'
import ProtectedRoute from '@/components/route/ProtectedRoute'
import GoogleCallback from './auth/GoogleCallback'

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType
}

type AllRoutesProps = ViewsProps

const { authenticatedEntryPath, unAuthenticatedEntryPath } = appConfig

const Homepage = lazy(() => import('@/views/auth/Home/Homepage'))

const AllRoutes = (props: AllRoutesProps) => {
    const userAuthority = useAppSelector((state) => state.auth.user)

    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Loading loading={true} />}>
                            <AppRoute
                                routeKey="/"
                                component={Homepage}
                            />
                        </Suspense>
                    }
                />
                <Route path="/auth/callback" element={<GoogleCallback />} />
                {publicRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <Suspense fallback={<Loading loading={true} />}>
                                <AppRoute
                                    routeKey={route.key}
                                    component={route.component}
                                    {...route.meta}
                                />
                            </Suspense>
                        }
                    />
                ))}
            </Route>
            <Route element={<ProtectedRoute />}>
                {protectedRoutes.map((route, index) => (
                    <Route
                        key={`${route.key}${index}`}
                        path={route.path}
                        element={
                            <AuthorityGuard
                                userAuthority={userAuthority as unknown as string[]}
                                authority={route.authority}
                            >
                                <PageContainer {...props}>
                                    <Suspense fallback={<Loading loading={true} />}>
                                        <AppRoute
                                            routeKey={route.key as string}
                                            component={route.component}
                                            {...route.meta}
                                        />
                                    </Suspense>
                                </PageContainer>
                            </AuthorityGuard>
                        }
                    />
                ))}
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Route>
        </Routes>
    )
}

const Views = (props: ViewsProps) => {
    return <AllRoutes {...props} />
}

export default Views
