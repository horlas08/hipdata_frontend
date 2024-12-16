import { APP_NAME } from "@/constants/app.constant"
import DashboardBody from "./DashboardBody"
import DashboardHeader from "./DashboardHeader"
import { useSelector } from "react-redux"
import { useAppSelector } from "@/store"
import { useEffect } from 'react'
import { apiUser } from '@/services/AuthService'

const Home = () => {

    useEffect(() => {
        apiUser().then(r => console.log(r))
    }, [])
    const username = useAppSelector(state => state.auth.user.username)
    return  <div className="flex flex-col gap-4 h-full">
    <DashboardHeader />
    <DashboardBody data={{ 'ref_link': `${window.location.origin}/sign-up/?ref_id=${username}` }} />
</div>
}

export default Home
