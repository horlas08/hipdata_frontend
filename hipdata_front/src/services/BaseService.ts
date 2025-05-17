import axios from 'axios'

import appConfig from '@/configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/constants/api.constant'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import store, { signOutSuccess } from '../store'
import { setupCache } from 'axios-cache-interceptor'

const unauthorizedCode = [401]

const BaseService = setupCache(
    axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
    withCredentials: true,
    withXSRFToken: true,

    headers: {
        Accept: 'application/json',

        'Content-Type': 'application/json',

        // 'Access-Control-Allow-origin': '*',
    },

}),
    {

    }
    )

BaseService.defaults.withCredentials = true
// BaseService.defaults.proxy = {
//     protocol: 'http',
//     host: '127.0.0.1',
//     port: 8000
// }
// BaseService.defaults.withXSRFToken = true
//
BaseService.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
BaseService.defaults.headers.common['Content-Type'] = 'application/json'

BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)
        console.log(config)
        return config
    },
    (error) => {
        console.log(error)
        return error
    }
)

BaseService.interceptors.response.use(
    (response) => {
        console.log(response)
        // if (response.status == 401) {
        //     window.localStorage.clear()
        // }
        // if (response.status == 419) {
        //     document.cookie =
        //         'XSRF-TOKEN= ; expireds = Thu, 01 Jan 1970 00:00:00 GMT'
        //     window.localStorage.clear()
        // }
        return response
    },
    (error) => {
        console.log(error)
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(signOutSuccess())
        }

        return response
    }
)

export default BaseService
