import classNames from 'classnames'
import { HEADER_HEIGHT_CLASS } from '@/constants/theme.constant'
import type { ReactNode } from 'react'
import type { CommonProps } from '@/@types/common'
import { Link } from 'react-router-dom'

interface NavLink {
    label: string
    to: string
}

interface HeaderProps extends CommonProps {
    headerStart?: ReactNode
    headerEnd?: ReactNode
    headerMiddle?: ReactNode
    container?: boolean
    navLinks?: NavLink[]
}

const Header = (props: HeaderProps) => {
    const { headerStart, headerEnd, headerMiddle, className, container, navLinks } = props

    return (
        <header className={classNames('header', className)}>
            <div
                className={classNames(
                    'header-wrapper',
                    HEADER_HEIGHT_CLASS,
                    container && 'container mx-auto'
                )}
            >
                <div className="header-action header-action-start">
                    {headerStart}
                </div>
                {navLinks && navLinks.length > 0 && (
                    <nav className="flex gap-6 items-center">
                        {navLinks.map((link) => (
                            <Link key={link.to} to={link.to} className="text-base font-medium hover:text-primary-600 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                )}
                {headerMiddle && (
                    <div className="header-action header-action-middle">
                        {headerMiddle}
                    </div>
                )}
                <div className="header-action header-action-end">
                    {headerEnd}
                </div>
            </div>
        </header>
    )
}

export default Header
