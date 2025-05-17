import ApiService from './ApiService'
import { Article } from '../views/User/Earn/Post/base/Article/store'

export async function apiGetCategoriesData<T>() {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/categories',
        method: 'get',
    })
}

export async function apiQueryArticleList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/articles-query',
        method: 'post',
        data,
    })
}

export async function apiGetArticle<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/user/ads/posts/${params.id}`,
        method: 'get',
    })
}
export async function apiGetSponsoredPost() {
    return ApiService.fetchData<Article>({
        url: `/user/special/posts`,
        method: 'get',
    })
}

export async function apiPostArticle<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/article',
        method: 'post',
        data,
    })
}

export async function apiGetOthersArticleList<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/others-article',
        method: 'get',
        params,
    })
}

export async function apiGetCategorizedArticles<T>() {
    return ApiService.fetchData<T>({
        url: '/user/categories/posts',
        method: 'get',
    })
}
