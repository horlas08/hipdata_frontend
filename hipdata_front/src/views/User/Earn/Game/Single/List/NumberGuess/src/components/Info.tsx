import React from 'react'
import { useAppSelector } from '@/views/User/Earn/Game/Single/List/NumberGuess/src/store'

function Info() {
    const userName = useAppSelector((state) => state.NumberGuess.data.userName)
    const userBalance = useAppSelector(
        (state) => state.NumberGuess.data.balance
    )

    return (
        <div className="row">
            <div className="col-12 col-md-4">
                <div className="card-box info-box">
                    <div className="info-emoji">🏅</div>
                    <div className="info-data">
                        {userName ? userBalance.toLocaleString('en-US') : ''}
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-4">
                <div className="card-box info-box">
                    <div className="info-emoji">🧑</div>
                    <div className="info-data">{userName}</div>
                </div>
            </div>

            <div className="col-12 col-md-4">
                <div className="card-box info-box">
                    <div className="info-emoji">⏱</div>
                    <div className="info-data">{userName ? '21:30' : ''}</div>
                </div>
            </div>
        </div>
    )
}

export default Info
