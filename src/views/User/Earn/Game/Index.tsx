import AdaptableCard from '../../../../components/shared/AdaptableCard'
import ArticleContent from '@/views/User/Earn/Post/base/Article/components/ArticleContent'
import OthersArticle from '@/views/User/Earn/Post/base/Article/components/OthersArticle'
import Container from '../../../../components/shared/Container'
import { Card } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Index() {
    const navigate = useNavigate()
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080')
        ws.onopen = () => {
            console.log('coonect')
        }
    }, [])
    return (
        <Container>
            <div className="grid gap-6">
                <Card
                    className={
                        'h-[14rem] grid place-content-center cursor-pointer'
                    }
                    onClick={() => {
                        navigate('/user/games/single')
                    }}
                >
                    <h2>Solo Game</h2>
                </Card>

                <Card
                    className={
                        'h-[14rem] grid place-content-center cursor-pointer'
                    }
                    onClick={() => {
                        navigate('/user/games/multiplayer')
                    }}
                >
                    <h2>MultiPlayer Game</h2>
                </Card>
            </div>
        </Container>
    )
}
