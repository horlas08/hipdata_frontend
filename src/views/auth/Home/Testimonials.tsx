import React, { useState } from 'react'

const testimonials = [
    {
        name: 'Ada, Student',
        text: 'I purchased 2GB of data and it lasted me a week. The service is great!',
    },
    {
        name: 'Chinedu, Graduate',
        text: 'Buying JAMB PIN worked like a charm, super fast delivery.',
    },
    {
        name: 'Sola, Entrepreneur',
        text: 'Paying my electricity bill was instant and seamless.',
    },
    {
        name: 'Maryam, Freelancer',
        text: 'Affordable data, reliable service, and great support!',
    },
]

export default function Testimonials() {
    const [active, setActive] = useState(0)
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">Testimonials</h2>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-stretch">
                {/* Left: User list */}
                <div className="flex flex-row md:flex-col gap-2 md:w-56 w-full md:max-w-xs">
                    {testimonials.map((t, i) => (
                        <button
                            key={t.name}
                            onClick={() => setActive(i)}
                            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all font-medium text-left text-base md:text-sm border-none outline-none focus:ring-2 focus:ring-orange-400 ${active === i ? 'bg-white bg-opacity-10 text-orange-400 shadow-sm' : 'bg-white bg-opacity-5 text-gray-300 hover:bg-white hover:bg-opacity-10'} `}
                        >
                            <span>{t.name}</span>
                            <span className={`ml-2 transition-colors ${active === i ? 'text-orange-400' : 'text-gray-500'}`}>&rarr;</span>
                        </button>
                    ))}
                </div>
                {/* Right: Testimonial card */}
                <div className="flex-1 bg-white bg-opacity-5 rounded-2xl shadow p-8 flex flex-col justify-center min-h-[220px] relative border border-white border-opacity-10">
                    <div className="font-semibold text-lg text-white mb-2">{testimonials[active].name}</div>
                    <div className="text-4xl absolute left-6 top-6 text-gray-700 opacity-40">"</div>
                    <div className="text-gray-100 text-base max-h-40 overflow-y-auto pr-2 pl-8 relative">
                        {testimonials[active].text}
                    </div>
                    <div className="text-4xl absolute right-6 bottom-6 text-gray-700 opacity-40">"</div>
                </div>
            </div>
        </section>
    )
} 