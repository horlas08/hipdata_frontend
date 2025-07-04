import React, { useState } from 'react'
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

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <PublicLayout navLinks={navLinks} quickLinks={quickLinks} socialLinks={socialLinks}>
      <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary-600">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-6">We'd love to hear from you! Reach out with questions, feedback, or support needs.</p>
      </motion.section>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
          <p className="text-gray-600 mb-2">Omuo Ekiti, Ekiti State, Nigeria.</p>
          <p className="text-gray-600 mb-2">+234 803 96 27867</p>
          <p className="text-gray-600 mb-2">bankoleezekiel7@gmail.com</p>
        </motion.div>
        <motion.form initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bg-white rounded-lg shadow p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" className="border rounded px-3 py-2" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" className="border rounded px-3 py-2" value={form.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" className="border rounded px-3 py-2" rows={4} value={form.message} onChange={handleChange} required />
          <button type="submit" className="bg-primary-600 text-white rounded px-4 py-2 font-semibold hover:bg-primary-700 transition-colors">Send Message</button>
          {submitted && <span className="text-green-600 mt-2">Thank you for contacting us!</span>}
        </motion.form>
      </div>
    </PublicLayout>
  )
}

export default ContactUs 