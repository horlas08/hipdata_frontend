import React from 'react'
import { Link } from 'react-router-dom'

interface QuickLink {
    label: string
    to: string
}
interface SocialLink {
    icon: React.ReactNode
    to: string
}

interface NewFooterProps {
    quickLinks?: QuickLink[]
    socialLinks?: SocialLink[]
}

const NewFooter: React.FC<NewFooterProps> = ({ quickLinks = [], socialLinks = [] }) => {
    return (
        <footer className="w-full bg-gray-50 border-t mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <span className="block text-lg font-semibold text-primary-600 mb-1">HIPDATA</span>
                    <span className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} HIPDATA. All rights reserved.</span>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    {quickLinks.map((link) => (
                        <Link key={link.to} to={link.to} className="text-gray-600 hover:text-primary-600 text-sm transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="flex gap-4 justify-center">
                    {socialLinks.map((link, idx) => (
                        <a key={idx} href={link.to} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 transition-colors">
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default NewFooter 