import React from 'react'
import NewHeader from '@/components/template/NewHeader'
import NewFooter from '@/components/template/NewFooter'

interface NavLink {
    label: string
    to: string
}
interface QuickLink {
    label: string
    to: string
}
interface SocialLink {
    icon: React.ReactNode
    to: string
}

interface PublicLayoutProps {
    navLinks: NavLink[]
    quickLinks?: QuickLink[]
    socialLinks?: SocialLink[]
    children: React.ReactNode
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ navLinks, quickLinks = [], socialLinks = [], children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <NewFooter quickLinks={quickLinks} socialLinks={socialLinks} />
        </div>
    )
}

export default PublicLayout 