import { useState, useEffect, useMemo } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms and Conditions', href: '/terms' },
]

interface HomeHeroHeaderProps {
    title?: string;
    description?: string;
}

export default function HomeHeroHeader({ title, description }: HomeHeroHeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Randomize animation durations for gradients on each render
    const mainGradientDuration = useMemo(() => (6 + Math.random() * 6).toFixed(2) + 's', [])
    const secondaryGradientDuration = useMemo(() => (5 + Math.random() * 5).toFixed(2) + 's', [])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="bg-gray-900">
            <header className={`w-full top-0 z-50 transition-shadow ${scrolled ? 'sticky shadow-lg bg-gray-900' : 'absolute bg-transparent'}`} style={{ left: 0, right: 0 }}>
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1 items-center">
                        <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
                            HIPDATA<span className="text-indigo-400">.</span>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-white hover:text-indigo-400">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link to="/sign-in" className="text-sm/6 font-semibold text-white hover:text-indigo-400">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-200"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <Link
                                        to="/sign-in"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                                    >
                                        Log in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <div className="relative isolate overflow-hidden px-6 pt-8 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden blur-2xl"
                >
                    {/* Main animated gradient centered */}
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            animation: `moveGradientCenter ${mainGradientDuration} cubic-bezier(0.4,0,0.2,1) infinite`,
                        }}
                        className="mx-auto aspect-[1155/678] w-[40vw] max-w-xl bg-gradient-to-tr from-[#ff80b5] via-[#9089fc] to-[#ff80b5] opacity-70"
                    />
                    {/* Secondary animated gradient for extra effect, also centered */}
                    <div
                        style={{
                            clipPath:
                                'circle(35% at 50% 50%)',
                            animation: `bounceGradient ${secondaryGradientDuration} cubic-bezier(0.4,0,0.2,1) infinite`,
                        }}
                        className="absolute left-0 bottom-0 aspect-square w-[18vw] max-w-xs bg-gradient-to-tr from-[#9089fc] via-[#ff80b5] to-[#9089fc] opacity-40 blur-2xl"
                    />
                    <style>{`
                        @keyframes moveGradientCenter {
                            0% { transform: scale(1) rotate(0deg); }
                            20% { transform: scale(1.15) rotate(20deg); }
                            50% { transform: scale(1.3) rotate(40deg); }
                            80% { transform: scale(1.15) rotate(20deg); }
                            100% { transform: scale(1) rotate(0deg); }
                        }
                        @keyframes bounceGradient {
                            0% { transform: scale(1) translate(0, 0); }
                            20% { transform: scale(1.1) translate(20px, -10px); }
                            40% { transform: scale(1.05) translate(40px, -30px); }
                            60% { transform: scale(1.1) translate(20px, -10px); }
                            80% { transform: scale(0.95) translate(0, 0); }
                            100% { transform: scale(1) translate(0, 0); }
                        }
                    `}</style>
                </div>
                <div className="mx-auto max-w-2xl py-16 sm:py-28 lg:py-32">
                    <div className="text-center">
                        {title ? (
                            <>
                                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">{title}</h1>
                                {description && (
                                    <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">{description}</p>
                                )}
                            </>
                        ) : (
                            <>
                                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
                                    Number 1 AI Billing Platform – Everything in a Click
                                </h1>
                                <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
                                    Experience the future of payments, data, airtime, and bill services powered by smart AI. Fast, secure, and automated for you.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-center">
                                    <a href="#" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Get Started</a>
                                    <a href="#" className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">Learn More</a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            animation: 'moveGradient 12s linear infinite',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
        </div>
    )
} 