import { useAppSelector } from '@/store'


const DashboardHeader = () => {
    const username = useAppSelector(state => state.auth.user.username)

    return (
        <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
                <h3>Welcome @{username} 👋</h3>
                <p>View your current balance & summary</p>
            </div>

        </div>
    )
}

export default DashboardHeader
