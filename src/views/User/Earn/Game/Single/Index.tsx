import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    apiGameTypeList,
    gameResponse,
} from '../../../../../services/GameService'
import { Button, Card } from '@/components/ui'

export default function Index() {
    const [gameLists, setGameLists] = useState<gameResponse[]>()
    useEffect(() => {
        apiGameTypeList('single').then((res) => {
            setGameLists(res.data)
            console.log(res.data)
        })
    }, [])
    const navigate = useNavigate()
    return (
        <>
            {gameLists?.map((game) => {
                return (
                    <Card
                        className={
                            'h-[14rem] grid place-content-center bg-[url("")]'
                        }
                    >
                        <div className="flex flex-col item-center mx-auto">
                            <h2>{game.name}Game</h2>
                            <Button
                                onClick={() =>
                                    navigate(`/user/games/number-guess`)
                                }
                                className={'mx-auto my-6'}
                                variant={'solid'}
                                title={'play'}
                            >
                                Play now
                            </Button>
                        </div>
                    </Card>
                )
            })}
        </>
    )
}
