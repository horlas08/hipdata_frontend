import { Navigate, Outlet, useLocation } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import useAuth from '@/utils/hooks/useAuth'
import useQuery from '../../utils/hooks/useQuery'
import { REDIRECT_URL_KEY } from '../../constants/app.constant'

const { authenticatedEntryPath, unAuthenticatedEntryPath } = appConfig

const PublicRoute = () => {
    const { authenticated } = useAuth()
    const query = useQuery()
    const redirectUrl = query.get(REDIRECT_URL_KEY) || authenticatedEntryPath

    return authenticated ? (
        <Navigate to={redirectUrl} replace />
    ) : (
        <Outlet />
    )
}

export default PublicRoute
