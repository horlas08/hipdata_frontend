import { Response, Server } from 'miragejs'
import uniqueId from 'lodash/uniqueId'
import isEmpty from 'lodash/isEmpty'

export default function authFakeApi(server: Server, apiPrefix: string) {
    server.post(`${apiPrefix}/api/login`, (schema, { requestBody }) => {
        const { email, password } = JSON.parse(requestBody)
        const user = schema.db.signInUserData.findBy({
            email: email,
            password,
        })
        console.log('user', user)
        if (user) {
            const { avatar, username, email, authority } = user
            return new Response(
                200,
                { some: 'header' },
                {
                    user: { avatar, username, email, authority },
                    token: 'wVYrxaeNa9OxdnULvde1Au5m5w63',
                }
            )
            // return {
            //     user: { avatar, username, email, authority },
            //     token: 'wVYrxaeNa9OxdnULvde1Au5m5w63',
            // }
        }
        return new Response(
            401,
            { some: 'header' },
            { message: 'Invalid email or password!' }
        )
    })

    server.post(`${apiPrefix}/api/user/pin-confirmation`, () => {
        return new Response(
            200,
            { some: 'header' },
            {
                message: 'Pin confirmation successful',
                match: true,
            }
        )
    })
    server.post(`${apiPrefix}/sign-out`, () => {
        return true
    })
    server.get(`${apiPrefix}/sanctum/csrf-cookie/`, () => {
        return true
    })

    server.post(`${apiPrefix}/sign-up`, (schema, { requestBody }) => {
        const { username, password, email } = JSON.parse(requestBody)
        const userExist = schema.db.signInUserData.findBy({
            accountUserName: username,
        })
        const emailUsed = schema.db.signInUserData.findBy({ email })
        const newUser = {
            avatar: '/img/avatars/thumb-1.jpg',
            username,
            email,
            authority: ['admin', 'user'],
        }
        if (!isEmpty(userExist)) {
            const errors = [
                { message: '', domain: 'global', reason: 'invalid' },
            ]
            return new Response(
                400,
                { some: 'header' },
                { errors, message: 'User already exist!' }
            )
        }

        if (!isEmpty(emailUsed)) {
            const errors = [
                { message: '', domain: 'global', reason: 'invalid' },
            ]
            return new Response(
                400,
                { some: 'header' },
                { errors, message: 'Email already used' }
            )
        }

        schema.db.signInUserData.insert({
            ...newUser,
            ...{ id: uniqueId('user_'), password, accountUserName: username },
        })
        return {
            user: newUser,
            token: 'wVYrxaeNa9OxdnULvde1Au5m5w63',
        }
    })

    server.post(`${apiPrefix}/forgot-password`, () => {
        return true
    })

    server.post(`${apiPrefix}/reset-password`, () => {
        return true
    })
}
