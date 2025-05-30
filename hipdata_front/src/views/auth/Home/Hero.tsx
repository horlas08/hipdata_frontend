'use client'

import { Button } from '@/components/ui'
import { useNavigate } from 'react-router-dom'

export default function HeroArea() {
    const navigate = useNavigate()
    return (
        <div className="bg-white">
            <div className="relative isolate px-6 pt-2 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="mx-auto max-w-2xl py-24 sm:py-48 lg:py-40">
                    <div className="text-center">
                        <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Your One-Stop Mobile Solution for Cheap Data & Bill
                            Payments
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Get affordable data subscriptions and pay bills with
                            ease. Simplify your life with our mobile app!
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Button
                                size={'md'}
                                value={' Get started'}
                                variant={'solid'}
                            >
                                {' '}
                                Get started
                            </Button>
                            <Button
                                size={'md'}
                                value={' Get started'}
                                variant={'default'}
                                onClick={(e) => {
                                    navigate('/sign-in')
                                }}
                            >
                                {' '}
                                Login
                            </Button>
                        </div>
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
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
        </div>
    )
}
