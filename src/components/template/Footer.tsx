import classNames from 'classnames'
import Container from '@/components/shared/Container'
import { APP_NAME } from '@/constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'
import { Link } from 'react-router-dom'

export type FooterPageContainerType = 'gutterless' | 'contained'

interface QuickLink {
    label: string
    to: string
}

interface SocialLink {
    icon: React.ReactNode
    to: string
}

type FooterProps = {
    pageContainerType: FooterPageContainerType
    quickLinks?: QuickLink[]
    socialLinks?: SocialLink[]
}

const FooterContent = ({ quickLinks = [], socialLinks = [] }: { quickLinks?: QuickLink[]; socialLinks?: SocialLink[] }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between flex-auto w-full gap-4 md:gap-0">
            <span>
                Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                <span className="font-semibold">{`${APP_NAME}`}</span> All
                rights reserved.
            </span>
            <div className="flex gap-4 items-center">
                {quickLinks.map((link) => (
                    <Link key={link.to} to={link.to} className="text-gray hover:text-primary-600 transition-colors">
                        {link.label}
                    </Link>
                ))}
            </div>
            {socialLinks.length > 0 && (
                <div className="flex gap-4 items-center">
                    {socialLinks.map((link, idx) => (
                        <a key={idx} href={link.to} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">
                            {link.icon}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function Footer({
    pageContainerType = 'contained',
    quickLinks = [],
    socialLinks = [],
}: FooterProps) {
    return (
        <footer
            className={classNames(
                `footer flex flex-auto items-center h-16 ${PAGE_CONTAINER_GUTTER_X}`
            )}
        >
            {pageContainerType === 'contained' ? (
                <Container>
                    <FooterContent quickLinks={quickLinks} socialLinks={socialLinks} />
                </Container>
            ) : (
                <FooterContent quickLinks={quickLinks} socialLinks={socialLinks} />
            )}
        </footer>
    )
}
