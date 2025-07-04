// FloatingAIChat.tsx
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane, FaPlus } from 'react-icons/fa'
import { getBotReply } from '@/utils/hooks/useOpenRouter' // AI logic here
import useBillingRequest from '@/utils/hooks/useBillingRequest'
import { useNavigate } from 'react-router-dom'

const initialMessages = [
    { from: 'ai', text: 'Hi! How can I help you today?' },
]

const oldChatMessages = [
    { from: 'ai', text: 'Welcome back! Here is your previous conversation.' },
    { from: 'user', text: 'Remind me to buy data every Friday.' },
    { from: 'ai', text: 'Reminder set for every Friday.' },
    { from: 'user', text: 'Show my last bill.' },
    { from: 'ai', text: 'Your last bill was ₦2,000 for electricity.' },
]

const FloatingAIChat = () => {
    const [chatOpen, setChatOpen] = useState(false)
    const [chats, setChats] = useState([{ id: 1, messages: initialMessages }])
    const [activeChatId, setActiveChatId] = useState(1)
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [stream, setStream] = useState('')
    const [chatMode, setChatMode] = useState<'multi' | 'old'>('multi')
    const chatRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const { AirtimeRequest, DataRequest } = useBillingRequest()

    const activeChat = chats.find(c => c.id === activeChatId)
    const messages = chatMode === 'old' ? oldChatMessages : (activeChat?.messages || [])

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (!input.trim() || loading) return

        const userMsg = { from: 'user', text: input }
        if (chatMode === 'old') return
        setChats(chs => chs.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, userMsg] } : c))
        setInput('')
        setLoading(true)
        setStream('')

        try {
            const response = await getBotReply(userMsg.text)
            const { intent, data, message } = response

            if (intent === 'purchase_airtime') {
                await AirtimeRequest(data)
            } else if (intent === 'purchase_data') {
                await DataRequest(data)
            } else if (intent === 'schedule_purchase') {
                // Implement schedule purchase if needed, or add to useBillingRequest
            } else if (intent === 'navigate') {
                navigate(data.page)
            }

            setChats(chs => chs.map(c => c.id === activeChatId
                ? { ...c, messages: [...c.messages, { from: 'ai', text: message }] }
                : c))
        } catch (err) {
            console.error(err)
            setChats(chs => chs.map(c => c.id === activeChatId
                ? { ...c, messages: [...c.messages, { from: 'ai', text: 'Sorry, something went wrong.' }] }
                : c))
        } finally {
            setLoading(false)
            setStream('')
            setTimeout(() => {
                if (chatRef.current) {
                    chatRef.current.scrollTop = chatRef.current.scrollHeight
                }
            }, 100)
        }
    }

    const handleChatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        if (value === 'old') {
            setChatMode('old')
            setInput('')
            setLoading(false)
            setStream('')
        } else {
            setChatMode('multi')
            setActiveChatId(Number(value))
            setInput('')
            setLoading(false)
            setStream('')
        }
    }

    const handleNewChat = () => {
        const newId = chats.length ? Math.max(...chats.map(c => c.id)) + 1 : 1
        setChats([...chats, { id: newId, messages: initialMessages }])
        setActiveChatId(newId)
        setChatMode('multi')
        setInput('')
        setLoading(false)
        setStream('')
    }

    return (
        <div className="fixed z-50 bottom-6 right-6 flex flex-col items-end">
            {!chatOpen && (
                <button className="bg-blue-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:bg-blue-700" onClick={() => setChatOpen(true)}>
                    <FaRobot className="w-7 h-7" />
                </button>
            )}
            {chatOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    className="w-80 max-w-full bg-white rounded-xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden max-h-[80vh]"
                    drag
                >
                    <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2">
                        <span className="font-semibold flex items-center gap-2"><FaRobot /> AI Chat</span>
                        <div className="flex items-center gap-2">
                            <select value={chatMode === 'old' ? 'old' : activeChatId} onChange={handleChatSelect} className="text-sm rounded px-2 py-1 text-blue-700 bg-white border border-blue-200">
                                {chats.map((c, idx) => (
                                    <option key={c.id} value={c.id}>{`Chat ${idx + 1}`}</option>
                                ))}
                                <option value="old">Old Chat</option>
                            </select>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full w-7 h-7 flex items-center justify-center" onClick={handleNewChat}><FaPlus /></button>
                            <button onClick={() => setChatOpen(false)}><FaTimes /></button>
                        </div>
                    </div>
                    <div ref={chatRef} className="flex-1 p-4 space-y-3 bg-blue-50 overflow-y-auto">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={msg.from === 'ai'
                                ? 'bg-blue-100 text-blue-800 px-3 py-2 rounded-lg max-w-[80%]'
                                : 'bg-gray-200 text-gray-800 px-3 py-2 rounded-lg max-w-[80%] self-end ml-auto'}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg max-w-[80%] flex items-center gap-2">
                                <span>{stream}</span>
                                <span className="animate-pulse">|</span>
                            </div>
                        )}
                    </div>
                    <form className="flex items-center gap-2 p-2 border-t bg-white" onSubmit={handleSend}>
                        <input
                            type="text"
                            className="flex-1 border rounded px-3 py-2 text-sm"
                            placeholder="Type your message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            disabled={loading || chatMode === 'old'}
                            autoFocus
                        />
                        <button
                            type="submit"
                            className={`bg-blue-600 text-white px-4 py-2 rounded font-semibold flex items-center gap-1 ${loading || !input.trim() || chatMode === 'old' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                            disabled={loading || !input.trim() || chatMode === 'old'}
                        >
                            <FaPaperPlane /> Send
                        </button>
                    </form>
                </motion.div>
            )}
        </div>
    )
}

export default FloatingAIChat
