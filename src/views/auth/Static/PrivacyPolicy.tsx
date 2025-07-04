import React from 'react'
import { motion } from 'framer-motion'
import PublicLayout from '@/components/layouts/PublicLayout'

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
const socialLinks = []

const PrivacyPolicy = () => (
    <PublicLayout navLinks={navLinks} quickLinks={quickLinks} socialLinks={socialLinks}>
        <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary-600">Privacy Policy</h1>
            <p className="text-lg text-gray-600 mb-6">Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use our platform.</p>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="max-w-2xl mx-auto mb-8">
            <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
            <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Personal details (name, email, phone) for account creation and support</li>
                <li>Transaction data for processing payments and orders</li>
                <li>Device and usage data for security and analytics</li>
            </ul>
            <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>To provide and improve our services</li>
                <li>To process your transactions securely</li>
                <li>To communicate important updates and offers</li>
                <li>To comply with legal obligations</li>
            </ul>
            <h2 className="text-xl font-semibold mb-2">Data Security</h2>
            <p className="text-gray-600 mb-4">We use industry-standard security measures to protect your data. Your information is never sold or shared with third parties except as required by law or to deliver our services.</p>
            <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
            <p className="text-gray-600 mb-4">You can access, update, or delete your personal information at any time by contacting our support. We respect your privacy choices.</p>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
            <p className="text-gray-500">By using our platform, you agree to this privacy policy. We may update this policy from time to time. Please review it regularly.</p>
        </motion.section>
    </PublicLayout>
)

export default PrivacyPolicy 