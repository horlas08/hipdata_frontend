import BaseService from './BaseService'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// const ApiService2 = {
//     fetchData(param: any) {
//         return BaseService(param)
//             .then((response) => {
//                 return response
//             })
//             .catch((errors) => {
//                 return errors
//             })
//     },
// }
const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown> | FormData>(
        param: AxiosRequestConfig<Request>
    ) {
        return new Promise<AxiosResponse<Response>>((resolve, reject) => {
            BaseService(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response)
                    // return response
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                    // return errors
                })
        })
    },
}
export default ApiService
