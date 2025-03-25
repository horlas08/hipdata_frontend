import { Response, Server } from 'miragejs'

export default function billFakeApi(server: Server, apiPrefix: string) {
    //data
    server.get(`${apiPrefix}/data/network`, (schema, { requestBody }) => {
        return new Response(
            200,
            { some: 'header' },

            {
                data: [
                    {
                        value: 'mtn',
                        label: 'Mtn',
                        logo: '/img/networks/mtn.png',
                    },
                    {
                        value: 'glo',
                        label: 'Glo',
                        logo: '/img/networks/glo.png',
                    },
                    {
                        value: 'airtel',
                        label: 'Airtel',
                        logo: '/img/networks/airtel.png',
                    },
                    {
                        value: 'etisalat',
                        label: '9Mobile',
                        logo: '/img/networks/9Mobile.jpg',
                    },
                ],
                message: '',
            }
        )
    })
    server.get(`${apiPrefix}/data/types`, (schema, { requestBody }) => {
        return new Response(
            200,
            { some: 'header' },

            {
                data: [
                    {
                        value: 'sme',
                        label: 'SME',
                    },
                    {
                        value: 'direct',
                        label: 'DC',
                    },
                    {
                        value: 'cg',
                        label: 'CG',
                    },
                ],
                message: '',
            }
        )
    })
    server.get(`${apiPrefix}/data/plans`, (schema, { requestBody }) => {
        return new Response(
            200,
            { some: 'header' },
            {
                data: [
                    {
                        name: 'Mtn 1gb',
                        variation_code: 'mtn_1',
                        variation_amount: 2000,
                        fixed_price: '2000',
                    },
                    {
                        name: 'Mtn 2gb',
                        variation_code: 'mtn_2',
                        variation_amount: 2000,
                        fixed_price: '2000',
                    },
                ],
                message: '',
            }
        )
    })
    //airtime
    server.get(`${apiPrefix}/user/airtime`, (schema, { requestBody }) => {
        return new Response(200, { some: 'header' }, [
            {
                id: '1',
                alias: 'mtn',
                name: 'MTN',
            },
            {
                id: '2',
                alias: 'glo',
                name: 'GLO',
            },
            {
                id: '3',
                alias: 'airtel',
                name: 'AIRTEL',
            },
        ])
    })

    //cable
    server.get(`${apiPrefix}/cable/plans`, (schema, { requestBody }) => {
        return new Response(
            200,
            { some: 'header' },
            {
                data: [
                    {
                        name: 'gotv plan 1',
                        variation_code: 'mtn_1',
                        variation_amount: 2000,
                        fixed_price: '2000',
                    },
                    {
                        name: 'Dstv plan 2gb',
                        variation_code: 'mtn_2',
                        variation_amount: 2000,
                        fixed_price: '2000',
                    },
                ],
                message: '',
            }
        )
    })
    //disco
    server.get(`${apiPrefix}/disco/plans`, (schema, { requestBody }) => {
        return new Response(
            200,
            { some: 'header' },
            {
                data: [
                    {
                        value: 'AEDC',
                        label: 'Abuja Electricity Distribution Company (AEDC)',
                        logo: '/img/electricity/abuja.png',
                    },
                    {
                        value: 'EKEDC',
                        label: 'Eko Electricity Distribution Company (EKEDC)',
                        logo: '/img/electricity/eko.png',
                    },
                ],
                message: '',
            }
        )
    })
    server.get(`${apiPrefix}/disco/type`, (schema, { requestBody }) => {
        return new Response(
            200,
            { some: 'header' },
            {
                data: [
                    {
                        value: 'prepaid',
                        label: 'Prepaid',
                    },
                    {
                        value: 'postpaid',
                        label: 'Postpaid',
                    },
                ],
                message: '',
            }
        )
    })

    server.get(`${apiPrefix}/cable/network`, (schema, { requestBody }) => {
        return new Response(
            200,
            { some: 'header' },

            {
                data: [
                    {
                        value: 'dstv',
                        label: 'Dstv',
                        logo: '/img/cable/dstv.png',
                    },
                    {
                        value: 'gotv',
                        label: 'Gotv',
                        logo: '/img/cable/gotv.png',
                    },
                    {
                        value: 'startimes',
                        label: 'Startimes',
                        logo: '/img/cable/startimes.png',
                    },
                ],
                message: '',
            }
        )
    })
    server.get(`${apiPrefix}/cable/types`, (schema, { requestBody }) => {
        return new Response(
            200,
            { some: 'header' },

            {
                data: [
                    {
                        value: 'sme',
                        label: 'SME',
                    },
                    {
                        value: 'direct',
                        label: 'DC',
                    },
                    {
                        value: 'cg',
                        label: 'CG',
                    },
                ],
                message: '',
            }
        )
    })
}
