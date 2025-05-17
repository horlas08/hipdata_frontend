import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineCog, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import { useAppSelector } from '@/store'
import { Notification, toast } from '../ui'

import { FiActivity } from 'react-icons/fi'
import appConfig from '@/configs/app.config'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
    {
        label: 'Profile',
        path: '/user/settings/profile',
        icon: <HiOutlineUser />,
    },
    {
        label: 'Account Setting',
        path: '/user/settings/profile',
        icon: <HiOutlineCog />,
    },
    {
        label: 'Activity Log',
        path: '/user/transaction/log',
        icon: <FiActivity />,
    },
]

const _UserDropdown = ({ className }: CommonProps) => {
    const { signOut } = useAuth()
    const handleSignOut = () => {
        signOut().then(() => {
            toast.push(
                <Notification type="success" duration={10000}>
                    <p>{'Logout Successful'}</p>
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        })
    }
    const user = useAppSelector((state) => state.auth.user)
  
    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            {user.image ? (
                <Avatar
                    size={32}
                    shape="circle"
                    icon={
                        <img
                            src={`${appConfig.apiWeb}/assets/images/user/${user.image}`}
                            className={'avatar-circle'}
                            alt={'img'}
                        />
                    }
                />
            ) : (
                <Avatar
                    size={32}
                    shape="circle"
                    icon={
                        <img
                            src={'/img/avatars/thumb-1.jpg'}
                            className={'avatar-circle'}
                            alt={'img'}
                        />
                    }
                />
            )}

            <div className="hidden md:block">
                <div className="text-xs capitalize">{user.first_name}</div>
                <div className="font-bold">{user.username}</div>
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" icon={<HiOutlineUser />} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {user.first_name} {user.last_name}
                            </div>
                            <div className="text-xs">{user.email}</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="mb-1 px-0"
                    >
                        <Link
                            className="flex h-full w-full px-2"
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                    onClick={handleSignOut}
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Sign Out</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
