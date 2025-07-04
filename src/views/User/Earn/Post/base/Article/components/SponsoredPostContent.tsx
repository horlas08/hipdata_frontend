import { useEffect, useState } from 'react'

import Loading from '@/components/shared/Loading'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import MediaSkeleton from '@/components/shared/loaders/MediaSkeleton'
import TextBlockSkeleton from '@/components/shared/loaders/TextBlockSkeleton'
import ArticleAction from './ArticleAction'
import { Article, getArticle, useAppDispatch, useAppSelector } from '../store'
import ReactHtmlParser from 'html-react-parser'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { setArticle } from '@/views/User/Earn/Post/base/EditArticle/store'
import { apiGetSponsoredPost } from '../../../../../../../services/post'
import { Notification, toast } from '../../../../../../../components/ui'
import SponsoredAction from '@/views/User/Earn/Post/base/Article/components/SponsoredAction'

const SponsoredPostContent = () => {
    // const dispatch = useAppDispatch()

    const [article, setArticle] = useState<Article>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        fetchData()
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        apiGetSponsoredPost().then((res) => {
            if (res.status != 200) {
                toast.push(
                    <Notification type="danger" duration={10000}>
                        <p>
                            {res.data?.message ||
                                'Error fetching post try again later'}
                        </p>
                    </Notification>,
                    {
                        placement: 'top-end',
                    }
                )
            } else {
                setArticle(res.data)
            }
        })
    }

    return (
        <Loading
            loading={loading}
            customLoader={
                <div className="flex flex-col gap-8">
                    <MediaSkeleton />
                    <TextBlockSkeleton rowCount={6} />
                    <TextBlockSkeleton rowCount={4} />
                    <TextBlockSkeleton rowCount={8} />
                </div>
            }
        >
            <h3>{article?.title}</h3>
            <div className="flex items-center mt-4 gap-4">
                <UsersAvatarGroup
                    avatarProps={{ size: 40 }}
                    users={article?.authors || []}
                />
                <div className="text-xs">
                    <div className="mb-1">
                        Created by:
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {article?.createdBy}
                        </span>
                    </div>
                    <div>
                        <span>Last updated: {article?.updateTime}</span>
                        <span className="mx-2">•</span>
                        <span>{article?.timeToRead} min read</span>
                        <span className="mx-2">•</span>
                        <span>{article?.viewCount} viewed</span>
                    </div>
                </div>
            </div>
            <div className="mt-8 prose dark:prose-invert max-w-none">
                <p>
                    {ReactHtmlParser(
                        article?.content || `<p>No Sponsored Post Yet</p>`
                    )}
                </p>
            </div>
            <SponsoredAction />
        </Loading>
    )
}

export default SponsoredPostContent
