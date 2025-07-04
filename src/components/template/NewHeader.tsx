import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface NavLink {
    label: string
    to: string
}

interface NewHeaderProps {
    navLinks: NavLink[]
}

const NewHeader: React.FC<NewHeaderProps> = ({ navLinks }) => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="w-full bg-gray-900 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link to="/" className="text-2xl font-bold text-white">HIPDATA<span className="text-indigo-400">.</span></Link>
                <nav className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link key={link.to} to={link.to} className="text-base font-medium text-white hover:text-indigo-400 transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <button className="md:hidden flex items-center text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-900 shadow-lg border-t border-gray-800">
                    <nav className="flex flex-col gap-4 px-4 py-4">
                        {navLinks.map((link) => (
                            <Link key={link.to} to={link.to} className="text-base font-medium text-white hover:text-indigo-400 transition-colors" onClick={() => setMenuOpen(false)}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}

export default NewHeader 