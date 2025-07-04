export type userChangeProfileResponse = {
    message?: string
}

export type ProfileFormModel = {
    first_name: string
    last_name: string
    email: string
    avatar: File | string | undefined
    country: string
    lang: string
    syncData: boolean
}



export type LanguageOption = {
    value: string
    label: string
    imgPath: string
}
