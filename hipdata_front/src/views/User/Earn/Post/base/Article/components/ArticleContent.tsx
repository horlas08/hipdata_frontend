import { useEffect } from 'react'

import Loading from '@/components/shared/Loading'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import MediaSkeleton from '@/components/shared/loaders/MediaSkeleton'
import TextBlockSkeleton from '@/components/shared/loaders/TextBlockSkeleton'
import ArticleAction from './ArticleAction'
import { getArticle, useAppDispatch, useAppSelector } from '../store'
import ReactHtmlParser from 'html-react-parser'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { setArticle } from '@/views/User/Earn/Post/base/EditArticle/store'

const ArticleContent = ({ articleId }: { articleId?: string }) => {
    const dispatch = useAppDispatch()

    const article = useAppSelector(
        (state) => state.knowledgeBaseArticle.data.article
    )
    const loading = useAppSelector(
        (state) => state.knowledgeBaseArticle.data.loading
    )

    const { search } = useLocation()

    useEffect(() => {
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const fetchData = () => {
        if (articleId) {
            alert(articleId)
            dispatch(getArticle({ id: articleId }))
        }
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
            <h3>{article.title}</h3>
            <div className="flex items-center mt-4 gap-4">
                <UsersAvatarGroup
                    avatarProps={{ size: 40 }}
                    users={article.authors || []}
                />
                <div className="text-xs">
                    <div className="mb-1">
                        Created by:
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {article.createdBy}
                        </span>
                    </div>
                    <div>
                        <span>Last updated: {article.updateTime}</span>
                        <span className="mx-2">•</span>
                        <span>{article.timeToRead} min read</span>
                        <span className="mx-2">•</span>
                        <span>{article.viewCount} viewed</span>
                    </div>
                </div>
            </div>
            <div className="mt-8 prose dark:prose-invert max-w-none">
                <p>{ReactHtmlParser(article.content || '')}</p>
                {/* static display text to be remove */}
                <p>
                    Kopi-luwak, seasonal breve strong caffeine medium lungo
                    grinder. Espresso filter, café au lait turkish, sweet,
                    single shot half and half americano variety mocha
                    extraction. Skinny to go, a brewed, mocha single origin,
                    plunger pot cup strong white dripper. Single origin pumpkin
                    spice, instant, cultivar americano crema aromatic bar café
                    au lait.
                </p>
            </div>
            <ArticleAction />
        </Loading>
    )
}

export default ArticleContent
