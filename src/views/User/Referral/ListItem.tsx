import Card from '@/components/ui/Card'
import ItemDropdown from './ItemDropdown'
import Members from './Members'
import ProgressionBar from './ProgressionBar'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui'
import classNames from 'classnames'

export type ListItemData = {
    id: number
    name: string
    hint: string
    totalReferral: number
    completedReferral: number
    progression: number
    completed: boolean
    member: {
        name: string
        img: string
    }[]
}

type ListItemProps = {
    data: ListItemData
    cardBorder?: boolean
}

const ListItem = ({ data, cardBorder }: ListItemProps) => {
    const { name, totalReferral, completedReferral, progression, completed, member, hint } =
        data
 const compeleteClass = classNames('ml-1 rtl:mr-1 whitespace-nowrap ', `${completed ?'bg-dark':''}`);
    return (
       
        <div className="mb-4">
            <Card bordered={cardBorder}>
                <div className="grid gap-x-4 grid-cols-12">
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-3 lg:col-span-3 md:flex md:items-center">
                        <div className="flex flex-col">
                            <h6 className="font-bold">
                            {name}
                            </h6>
                            <span>{hint}</span>
                        </div>
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-2 md:flex md:items-center md:justify-end">
                        <div className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-full bg-red">
                            <HiOutlineClipboardCheck className="text-base" />
                            <span className='bg-red'>
                                {completed ? 'completed': `${completedReferral.toString() } / ${totalReferral.toString()}` }
                                
                            </span>
                        </div>
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 md:col-span-2 lg:col-span-3 md:flex md:items-center">
                        <ProgressionBar progression={progression} />
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 md:col-span-3 lg:col-span-3 md:flex md:items-center">
                        <Members members={member} />
                    </div>
                    {/* <div className="my-1 sm:my-0 col-span-12 sm:col-span-1 flex md:items-center justify-end">
                        <Badge content={"complete"}  className='text-emerald-300 bg-black'></Badge>
                    </div> */}
                </div>
            </Card>
        </div>
    )
}

export default ListItem
