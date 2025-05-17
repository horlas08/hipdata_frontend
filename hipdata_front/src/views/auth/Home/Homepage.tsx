import { Button } from '@/components/ui'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { IoMdWifi } from 'react-icons/io'
import { FaPlane } from 'react-icons/fa6'
import { MdTv } from 'react-icons/md'
import { BiSolidMoviePlay } from 'react-icons/bi'
import { RiLightbulbFlashFill } from 'react-icons/ri'
import { BsGift } from 'react-icons/bs'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { FaCreditCard } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'

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
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4">
                <div className="text-2xl font-bold text-primary-600">HIPDATA<span className="text-gray-600">.</span></div>
                <Button variant="solid" className="bg-primary-600">Download our App</Button>
            </header>

            {/* Main Content */}
            <main className="px-6 py-12">
                <h1 className="text-center text-4xl md:text-5xl font-bold mb-2">
                    One-Stop Mobile Solution for <span className="text-primary-600">Cheap Data & Bill Payments!</span>
                </h1>

                {/* Service Grid */}
                <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
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

                {/* Trust Badge */}
                <div className="text-center mt-8 text-gray-600">
                    <span role="img" aria-label="shield">🛡️</span> Trusted by over <span className="font-bold">30,000</span> active users
                </div>

                {/* CTA Section */}
                <div className="mt-8 text-center">
                    <h2 className="text-2xl font-bold mb-8">Get started now.</h2>
                    <div className="flex flex-col gap-4 max-w-md mx-auto">
                        <button
                            onClick={handleGoogleAuth}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                            Continue with Google
                        </button>
                        <button
                            onClick={() => navigate('/sign-in')}
                            className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                        >
                            Continue with Email
                        </button>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">Follow us on social media</p>
                    <div className="flex justify-center gap-6 text-gray-600">
                        <Link to="#" className="hover:text-primary-600"><FaFacebook className="w-6 h-6" /></Link>
                        <Link to="#" className="hover:text-primary-600"><FaInstagram className="w-6 h-6" /></Link>
                        <Link to="#" className="hover:text-primary-600"><FaTwitter className="w-6 h-6" /></Link>
                        <Link to="#" className="hover:text-primary-600"><FaWhatsapp className="w-6 h-6" /></Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-4 text-gray-600 text-sm">
                © 2025 Terapay All rights reserved.
            </footer>
        </div>
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

export default Homepage
