import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'

import { signInUserData } from './data/authData'

import { authFakeApi } from './fakeApi'
import billFakeApi from '@/mock/fakeApi/billFakeApi'

const { apiPrefix, apiWeb } = appConfig

export function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                return !request.url.includes('localhost')
            })
            this.passthrough()

            authFakeApi(this, apiWeb)
            billFakeApi(this, apiPrefix)
        },
    })
}
