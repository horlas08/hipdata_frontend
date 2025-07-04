import React from 'react'
import reducer, {
    useAppSelector,
} from '@/views/User/Earn/Game/Single/List/NumberGuess/src/store'
import { injectReducer } from '@/store'
injectReducer('NumberGuess', reducer)

function Ranking() {
    let ranking = useAppSelector((state) => state.NumberGuess.data.usersRanking)
    let animationShow = useAppSelector(
        (state) => state.NumberGuess.data.animShow
    )
    let arr = [...ranking]

    return (
        <div className="col-12 col-md-6">
            <div className="card-title">📊 Ranking</div>

            <div className="card-box ranking-box">
                <table className="ranking-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr
                            .sort((a, b) => b.score - a.score)
                            .map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={
                                        user.name === 'You' &&
                                        !animationShow &&
                                        user.score !== 0
                                            ? 'my-result'
                                            : ''
                                    }
                                >
                                    <td>{index + 1}</td>
                                    <td>
                                        {animationShow || user.score === 0
                                            ? '-'
                                            : user.name}
                                    </td>
                                    <td>
                                        {animationShow || user.score === 0
                                            ? '-'
                                            : user.score}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Ranking
