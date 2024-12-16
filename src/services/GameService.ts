import ApiService from './ApiService'

export interface gameResponse {
    id: string
    name: string
    imageUri: string
}

export async function apiGameTypeList(type: string) {
    return ApiService.fetchData<gameResponse[]>({
        url: `user/game/list/${type}`,
        method: 'get',
    })
}
