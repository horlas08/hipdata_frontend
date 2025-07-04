export type AppConfig = {
    apiPrefix: string
    apiWeb: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'http://localhost:8000/api',
    apiWeb: 'http://localhost:8000',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
