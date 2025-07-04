import { Button } from '@/components/ui'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdWifi } from 'react-icons/io'
import { FaPlane } from 'react-icons/fa6'
import { MdTv } from 'react-icons/md'
import { BiSolidMoviePlay } from 'react-icons/bi'
import { RiLightbulbFlashFill } from 'react-icons/ri'
import { BsGift } from 'react-icons/bs'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { FaCreditCard, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import PublicLayout from '@/components/layouts/PublicLayout'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import HomeHeroHeader from './HomeHeroHeader'
import TrustedByMillions from './TrustedByMillions'
import Testimonials from './Testimonials'

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms and Conditions', to: '/terms' },
]

const quickLinks = [
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Privacy Policy', to: '/privacy' },
]

const socialLinks = [
    { icon: <FaFacebook className="w-5 h-5" />, to: '#' },
    { icon: <FaInstagram className="w-5 h-5" />, to: '#' },
    { icon: <FaTwitter className="w-5 h-5" />, to: '#' },
    { icon: <FaWhatsapp className="w-5 h-5" />, to: '#' },
]

const Homepage = () => {
    const navigate = useNavigate();

    const handleGoogleAuth = async () => {
        try {
            // Will implement Google auth here
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
        } catch (error) {
            console.error('Google auth error:', error);
        }
    };

    return (
        <>
            <HomeHeroHeader />
            {/* Enhanced AI Chat Assistant Section */}
            <section className="py-16 bg-white">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true, }} className="max-w-5xl mx-auto  p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Chat Demo Left */}
                    <div className="flex-1 w-full">
                        <h1 className="text-5xl font-bold mb-4 text-primary-600">Meet Your AI Billing Assistant</h1>
                        <p className="text-gray-600 mb-6">Chat with our smart assistant to buy data, pay bills, and automate your payments in seconds.</p>
                        <div className="w-full max-w-md mx-auto">
                            <ChatTypingDemo />
                        </div>
                    </div>
                    {/* Animated AI Illustration Right */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="flex-1 flex justify-center items-center w-full">
                        <img src="/img/others/newhomelady-p8DSFUfD.png" alt="Animated AI Assistant" className=" h-[80%] object-contain " />
                    </motion.div>
                </motion.div>
            </section>
            <TrustedByMillions />
            <Testimonials />
            {/*<PublicLayout navLinks={navLinks} quickLinks={quickLinks} socialLinks={socialLinks}>*/}

                {/* Service Grid */}
                <section className="py-12 bg-white">
                    <div className={'flex justify-center'}><span role="img" aria-label="shield">🛡️</span> <h3> Trusted by over <span className="font-bold">30,000</span> active users</h3></div>
                    <div className="grid grid-cols-3 gap-4 max-w-[80%] mx-auto mt-12">
                        <ServiceCard icon={<IoMdWifi className="w-6 h-6" />} label="Data" />
                        <ServiceCard icon={<FaPlane className="w-6 h-6" />} label="Airtime" />
                        <ServiceCard icon={<MdTv className="w-6 h-6" />} label="TV" />
                        <ServiceCard icon={<BiSolidMoviePlay className="w-6 h-6" />} label="Convert" />
                        <ServiceCard icon={<RiLightbulbFlashFill className="w-6 h-6" />} label="Electricity" />
                        <ServiceCard icon={<BsGift className="w-6 h-6" />} label="Giftcards" />
                        <ServiceCard icon={<GiPerspectiveDiceSixFacesRandom className="w-6 h-6" />} label="Betting" />
                        <ServiceCard icon={<FaCreditCard className="w-6 h-6" />} label="Cards" />
                        <ServiceCard icon={<AiOutlinePlus className="w-6 h-6" />} label="More" />
                    </div>
                </section>

                {/* CTA Section */}
                {/*<section className="mt-8 bg-white text-center">*/}
                {/*    <h2 className="text-2xl font-bold mb-8">Get started now.</h2>*/}
                {/*    <div className="flex flex-col gap-4 max-w-md mx-auto">*/}
                {/*        <button*/}
                {/*            onClick={handleGoogleAuth}*/}
                {/*            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"*/}
                {/*        >*/}
                {/*            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />*/}
                {/*            Continue with Google*/}
                {/*        </button>*/}
                {/*        <button*/}
                {/*            onClick={() => navigate('/sign-in')}*/}
                {/*            className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"*/}
                {/*        >*/}
                {/*            Continue with Email*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</section>*/}

            {/*</PublicLayout>*/}
        </>
    )
}

// Service Card Component
const ServiceCard = ({ icon, label }: { icon: React.ReactNode; label: string }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-indigo-600 hover:bg-primary-700 transition-colors cursor-pointer">
            <div className="text-white mb-2">
                {icon}
            </div>
            <span className="text-white text-sm">{label}</span>
        </div>
    )
}

const chatMessages = [
    'Hey, buy 2GB data for this number.',
    'Schedule 2GB data for my number every 2 days.',
    'Pay my electricity bill instantly.',
    'Buy JAMB PIN for me now.',
]

function ChatTypingDemo() {
    const [current, setCurrent] = useState(0)
    const [displayed, setDisplayed] = useState('')
    useEffect(() => {
        let timeout: NodeJS.Timeout
        let char = 0
        setDisplayed('')
        function type() {
            if (char < chatMessages[current].length) {
                setDisplayed(chatMessages[current].slice(0, char + 1))
                char++
                timeout = setTimeout(type, 40)
            } else {
                timeout = setTimeout(() => {
                    setCurrent((prev) => (prev + 1) % chatMessages.length)
                }, 1200)
            }
        }
        type()
        return () => clearTimeout(timeout)
    }, [current])
    return (
        <div className="flex items-end gap-2">
            <div className="bg-primary-100 text-primary-800 px-4 py-3 rounded-2xl shadow text-base font-medium min-h-[48px] relative">
                <span>{displayed}<span className="animate-pulse">|</span></span>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/4712/4712037.png" alt="AI Avatar" className="w-10 h-10 rounded-full border-2 border-primary-200" />
        </div>
    )
}

export default Homepage
