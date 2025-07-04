import { dateLocales } from '@/locales'
import React from 'react'

const statCards = [
    // Large card, left of grid, spans two rows
    {
        labelHeader: 'Trusted by millions of users in Nigeria',
        desc: 'A customer base of over 5 million is a testament to the growing adoption of FairMoney\'s fintech solutions among Nigerians.',
        bg: 'bg-white',
        text: 'text-gray-900',
        valueStyle: ' font-[75px]',
        grid: 'row-span-1 col-span-5',
    },

    // Top right
    {
        label: 'APP DOWNLOADS',
        value: '20',
        desc: 'MILLION+',
        justify: 'justify-between',
        bg: `bg-violet-50 bg-[position:100%_100%] bg-[background-size:40%] bg-[url('/svg/app-download-purple.svg')] bg-no-repeat`,
        hoverBg: `hover:bg-purple-700 hover:bg-[url('/svg/app-download-white.svg')]  hover:text-white`,
        arcHover: 'group-hover:stroke-white',
        text: 'text-gray-900',
        valueStyle: ' font-[75px]',
        grid: 'row-span-1 col-span-4',
    },
    // Top far right
    {
        label: 'OVER',
        value: '15,000',
        sub: '',
        justify: 'justify-end gap-[1px]',
        desc: 'LOANS DISBURSED PER DAY',
        bg: `bg-green-50 bg-[url('/svg/daily-green.svg')] bg-no-repeat`,
        hoverBg: `hover:bg-green-700 hover:bg-[url('/svg/daily-white.svg')] hover:!text-white`,
        arc: (
            <svg className="absolute -top-8 -right-8 w-32 h-32" viewBox="0 0 128 128" fill="none">
                <path d="M0 64A64 64 0 0 1 64 0" stroke="#22d3ee" strokeWidth="9" strokeLinecap="round" />
            </svg>
        ),
        arcHover: 'group-hover:stroke-white',
        text: 'text-gray-900',
        valueStyle: ' font-[75px]',
        grid: 'row-span-1 col-span-4',
    },
    {
        label: 'MORE THAN',
        value: '₦35+',
        justify: 'justify-end',
        sub: 'Billion',
        desc: 'SAVED WITH FAIRMONEY',
        bg: `bg-emerald-50 bg-[url('/svg/daily-green.svg')] bg-[position:100%_0%] bg-[background-size:auto] bg-no-repeat`,
        hoverBg: `hover:bg-emerald-700 hover:!text-white hover:bg-[url('/svg/daily-white.svg')]`,
        arc: (
            <svg className="absolute -top-8 -right-8 w-44 h-44" viewBox="0 0 160 160" fill="none">
                <path d="M10 80A70 70 0 0 1 80 10" stroke="#22c55e" strokeWidth="10" strokeLinecap="round" />
            </svg>
        ),
        arcHover: 'group-hover:stroke-white',
        text: 'text-gray-900',
        valueStyle: ' font-[75px]',
        grid: 'row-span-1 col-span-5',
    },
    // Bottom right
    {
        label: 'LOANS PROCESSED IN',
        value: '5',
        justify: 'justify-between',
        desc: 'MINUTES',
        bg: `bg-orange-50 bg-[url('/svg/p-orange.svg')]  bg-[position:50%_20%] bg-[background-size:auto] bg-no-repeat`,
        hoverBg: `hover:bg-orange-600 hover:bg-[url('/svg/p-white.svg')] hover:!text-white`,
        arc: (
            <svg className="absolute -bottom-8 -left-8 w-32 h-32" viewBox="0 0 128 128" fill="none">
                <path d="M128 64A64 64 0 0 1 64 128" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" />
            </svg>
        ),
        arcHover: 'group-hover:stroke-white',
        text: 'text-gray-900',
        valueStyle: ' font-[75px]',
        grid: 'row-span-1 col-span-4',
    },
    // Bottom far right
    {
        label: 'OVER',
        value: '210,000',
        sub: '',
        justify: 'justify-end gap-[1px]',
        desc: 'MONTHLY CARD TRANSACTIONS',
        bg: `bg-blue-50 bg-[url('/svg/money-saved__blue.svg')]  bg-[position:100%_0%] bg-[background-size:60%] bg-no-repeat`,
        hoverBg: `hover:bg-blue-700 hover:bg-[url('/svg/money-saved__white.svg')] hover:!text-white`,
        arc: (
            <svg className="absolute -top-8 -right-8 w-32 h-32" viewBox="0 0 128 128" fill="none">
                <path d="M0 64A64 64 0 0 1 64 128" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" />
            </svg>
        ),
        arcHover: 'group-hover:stroke-white',
        text: 'text-gray-900',
        valueStyle: ' font-[35px]',
        grid: 'row-span-1 col-span-4',
    },
]

export default function TrustedByMillions() {
    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className={' mx-auto w-[70%]'}>
                <div className='grid [grid-template-columns:repeat(13,minmax(0,1fr))] grid-rows-2 gap-[20px]'>
            {statCards.map((data)=>{
                return (
                <div key={data.value} className={`relative min-h-[220px] ${data.bg} p-[30px] rounded-[20px] flex flex-col ${data.justify} gap-10 ${data.hoverBg}  ${data.grid} ${data.bg}`}>

                    {data.labelHeader? (<h3>{data.labelHeader}</h3>): (
                        <p>{data.label}</p>
                    )}
                    <div className={'flex flex-col justify-end items-start gap-2'}>
                        {data.value && (
                            <h3 className={`text-2xl font-bold ${data.valueStyle} `}>{data.value}</h3>
                        )}
                        {data.desc && (
                            <p className={'mb-0'}>{data.desc}</p>
                        )}
                    </div>
                </div>)
            })}

            </div>
            </div>
        </section>
    )
} 