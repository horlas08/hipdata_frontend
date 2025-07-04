import React from 'react'
import { motion } from 'framer-motion'
import PublicLayout from '@/components/layouts/PublicLayout'
import { FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa'
import HomeHeroHeader from '../auth/Home/HomeHeroHeader'

const AboutUs = () => (
    <>
        <HomeHeroHeader />
        <PublicLayout>
            <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-primary-600">About Us</h1>
                <p className="text-lg text-gray-600 mb-6">We are a trusted utility platform enabling fast, secure, and affordable purchase of airtime, data, TV subscriptions, exam pins, and bill payments in Nigeria.</p>
            </motion.section>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                    <FaRocket className="text-primary-600 text-3xl mb-2" />
                    <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
                    <p className="text-gray-600">To make digital payments and utility purchases seamless, affordable, and accessible for everyone, everywhere.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                    <FaShieldAlt className="text-primary-600 text-3xl mb-2" />
                    <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
                    <p className="text-gray-600">To be Nigeria's most reliable and innovative platform for all digital and utility payments, empowering millions daily.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                    <FaUsers className="text-primary-600 text-3xl mb-2" />
                    <h3 className="font-semibold text-lg mb-2">Why Choose Us?</h3>
                    <p className="text-gray-600">Automated, secure, and instant service delivery. 24/7 support. Affordable rates. Trusted by thousands of happy users.</p>
                </motion.div>
            </div>
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-2">Registered & Reliable</h2>
                <p className="text-gray-600">We are a duly registered utility company, committed to quality, trust, and customer satisfaction. Join us and experience the best in digital payments!</p>
            </motion.section>
        </PublicLayout>
    </>
)

export default AboutUs 