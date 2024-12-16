import React, { useState, useEffect } from 'react'

import reducer, {
    setUserName,
    useAppDispatch,
    useAppSelector,
} from '@/views/User/Earn/Game/Single/List/NumberGuess/src/store'
import { injectReducer } from '@/store'

injectReducer('NumberGuess', reducer)

function Join() {
    const dispatch = useAppDispatch()
    const [nickname, setNickname] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const userName = useAppSelector((state) => state.NumberGuess.data.userName)

    const submitNickname = () => {
        dispatch(setUserName('testtt'))
        console.log(userName)
        window.Echo.channel('d').listen('user nickname', (e: Function) => {
            dispatch(setUserName('testtt'))
        })
    }

    useEffect(() => {
        console.log(userName)
        setIsButtonDisabled(3 > nickname.length)
    }, [nickname])

    return (
        // <></>
        <div className={`card-box join-box ${userName ? 'd-none' : ''}`}>
            <div className="join-title">Welcome</div>

            <form className="">
                <div className="join-hint">Please Insert Your Name</div>
                <input
                    type="text"
                    onChange={(e) => setNickname(e.target.value)}
                    value={nickname}
                    className=""
                    placeholder=""
                />
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        submitNickname()
                    }}
                    type="button"
                    disabled={isButtonDisabled}
                >
                    Accept
                </button>
            </form>
        </div>
    )
}

export default Join
