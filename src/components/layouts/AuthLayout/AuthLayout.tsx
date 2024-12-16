import Side from './Side'
import Cover from './Cover'
import Simple from './Simple'
import View from '@/views'
import { useAppSelector } from '@/store'
import { LAYOUT_TYPE_BLANK } from '@/constants/theme.constant'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const AuthLayout = () => {
    const layoutType = useAppSelector((state) => state.theme.layout.type)
    const { pathname } = useLocation()
    const escapeLayout = ['/', 'about-us', '/index']
    const location = useLocation()
    useEffect(() => {}, [])
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
