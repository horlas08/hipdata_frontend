import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Echo from 'laravel-echo'

function Chat() {
    const [nickname, setNickname] = useState('')
    const [msg, setMsg] = useState('')
    const [chat, setChat] = useState<any[]>([])
    const [usersOnline, setUsersOnline] = useState([])

    useEffect(() => {
        window.Echo.channel('chat').listen('message', ({ nickname, msg }) => {
            setChat([...chat, { nickname, msg }])
        })

        window.Echo.channel('').subscribed((e: Function) => {})

        window.Echo.channel('chat').listen('users-on', (list: any) => {
            setUsersOnline(list)
        })

        window.Echo.channel('chat').listen('user-data', (nick: any) => {
            if (!nickname) setNickname(nick[0])
        })

        window.Echo.channel('chat').listen(
            'user-disconnected',
            (user: string) => {
                if (user !== null) {
                    setChat([...chat, `${user} left the chat 👋🏻`])
                }
            }
        )

        let objDiv = document.getElementById('msg')
        if (objDiv) objDiv.scrollTop = objDiv.scrollHeight

        // return () => {
        //     window.Echo.disconnect()
        // }
    }, [chat])

    const submitMsg = (e: any) => {
        e.preventDefault()

        if (msg === '') {
            toast('Enter a message.', {
                duration: 4000,
                style: {},
                className: '',
                icon: '⚠️',
                role: 'status',
                ariaLive: 'polite',
            })
        } else {
            // socket.emit('chat message', { nickname, msg })
            setChat([...chat, { nickname, msg }])
            setMsg('')
        }
    }

    return (
        <div className="col-12 col-md-6">
            <div className="card-title">
                💬 Chat ({usersOnline !== null ? usersOnline.length : '0'})
            </div>

            <div className="card-box">
                <Toaster />

                <div className="messages-box" id="msg">
                    {chat.map((el, index) => (
                        <div key={index} className="message">
                            {el.nickname != null ? (
                                <div className="message-flex">
                                    <div className="nickname">
                                        {el.nickname}:
                                    </div>
                                    <div className="user-message">{el.msg}</div>
                                </div>
                            ) : (
                                <p className="">{el}</p>
                            )}
                        </div>
                    ))}
                </div>

                <form className="send-msg">
                    <input
                        type="text"
                        className="pr-3 pr-md-3"
                        name="message"
                        onChange={(e) => setMsg(e.target.value)}
                        value={msg}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={(e) => submitMsg(e)}
                    >
                        Start
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat
