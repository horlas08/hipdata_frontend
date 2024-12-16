import ApiService from "./ApiService";

export interface planResponse {
    label: string
      value: string 
} 

export async function apiPlan() {
    return ApiService.fetchData<planResponse[]>({
        url: '/plan',
        method: 'get',
    })
}
