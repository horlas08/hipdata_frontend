import View from '@/views'
import { useAppSelector } from '@/store'
import { useLocation } from 'react-router-dom'
import Cover from '@/components/layouts/AuthLayout/Cover'

const AuthLayout = () => {
    const layoutType = useAppSelector((state) => state.theme.layout.type)
    const { pathname } = useLocation()
    // alert(pathname)

    const escapeLayout = ['/', '/about', '/privacy', '/terms', '/contact', '/index']
    //09110545505
    const location = useLocation()
    // useEffect(() => {}, [])
    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            {escapeLayout.includes(location.pathname) ? (
                <View />
            ) : (
                <Cover>
                    <View />
                </Cover>
            )}
        </div>
    )
}

export default AuthLayout
