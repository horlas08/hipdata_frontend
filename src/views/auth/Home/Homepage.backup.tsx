import HeaderLogo from '@/components/template/HeaderLogo'
import MobileNav from '@/components/template/MobileNav'
import SidePanel from '@/components/template/SidePanel'
import UserDropdown from '@/components/template/UserDropdown'
import HeroArea from '@/views/auth/Home/Hero'
import HomeHeader from '@/views/auth/Home/HomeHeader'
import { useAppSelector } from '@/store'
import useResponsive from '@/utils/hooks/useResponsive'
import HorizontalMenuContent from '@/components/template/HorizontalMenuContent'
import { MenuItem } from '@/components/ui'
import HorizontalMenuNavLink from '@/components/template/HorizontalMenuContent/HorizontalMenuNavLink'

const Homepage = () => {
    return (
        <>
            <div className="app-layout-simple flex flex-auto flex-col min-h-screen">
                <div className="flex flex-auto min-w-0">
                    <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                        <HomeHeader
                            container
                            className="shadow dark:shadow-2xl"
                            headerStart={<HeaderActionsStart />}
                            headerMiddle={<HorizontalNav />}
                            headerEnd={<HeaderActionsEnd />}
                        />
                        <HeroArea />
                    </div>
                </div>
            </div>
        </>
    )
}

const HeaderActionsStart = () => {
    return (
        <>
            <HeaderLogo />
            <MobileNav />
        </>
    )
}

const HeaderActionsEnd = () => {
    return (
        <>
            <SidePanel />
            <UserDropdown hoverable={false} />
        </>
    )
}

const HorizontalNav = () => {
    const mode = useAppSelector((state) => state.theme.mode)
    const userAuthority = useAppSelector((state) => state.auth.user.authority)
    const { larger } = useResponsive()

    return (
        <>
            {larger.md && (
                <span className="flex items-center">
                    <HorizontalMenuNavLink path={'/'}>
                        <MenuItem>
                            <span className="flex items-center gap-2">
                                Home
                            </span>
                        </MenuItem>
                    </HorizontalMenuNavLink>
                    <HorizontalMenuNavLink path={'/'}>
                        <MenuItem>
                            <span className="flex items-center gap-2">
                                About Us
                            </span>
                        </MenuItem>
                    </HorizontalMenuNavLink>
                    <HorizontalMenuNavLink path={'/'}>
                        <MenuItem>
                            <span className="flex items-center gap-2">
                                Contact Us
                            </span>
                        </MenuItem>
                    </HorizontalMenuNavLink>
                </span>
            )}
        </>
    )
}

export default Homepage
