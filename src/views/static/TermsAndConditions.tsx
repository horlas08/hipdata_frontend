import React from 'react'
import { motion } from 'framer-motion'
import PublicLayout from '@/components/layouts/PublicLayout'
import HomeHeroHeader from '../auth/Home/HomeHeroHeader'

const TermsAndConditions = () => (
    <>
        <HomeHeroHeader title="Terms & Conditions" description="Please read these terms and conditions carefully before using our platform." />
        <PublicLayout>
            <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-primary-600">Terms & Conditions</h1>
                <p className="text-lg text-gray-600 mb-6">Please read these terms and conditions carefully before using our platform.</p>
            </motion.section>
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="max-w-2xl mx-auto mb-8">
                <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">By accessing or using our services, you agree to be bound by these terms. If you do not agree, please do not use the platform.</p>
                <h2 className="text-xl font-semibold mb-2">2. Services</h2>
                <p className="text-gray-600 mb-4">We provide digital payment and utility services including airtime, data, TV, exam pins, and bill payments. We reserve the right to modify or discontinue any service at any time.</p>
                <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Provide accurate and up-to-date information</li>
                    <li>Keep your account credentials secure</li>
                    <li>Use the platform lawfully and ethically</li>
                </ul>
                <h2 className="text-xl font-semibold mb-2">4. Payments & Refunds</h2>
                <p className="text-gray-600 mb-4">All payments are processed securely. Refunds are subject to our policy and may require verification. Unauthorized or fraudulent activity may result in account suspension.</p>
                <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">We are not liable for indirect, incidental, or consequential damages. Our liability is limited to the amount paid for the service in question.</p>
                <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
                <p className="text-gray-600 mb-4">We may update these terms at any time. Continued use of the platform constitutes acceptance of the new terms.</p>
            </motion.section>
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
                <p className="text-gray-500">If you have questions about these terms, please contact our support team.</p>
            </motion.section>
        </PublicLayout>
    </>
)

export default TermsAndConditions 