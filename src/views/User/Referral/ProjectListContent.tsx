import { useEffect, useState } from 'react'
import classNames from 'classnames'
import ListItem, { ListItemData } from './ListItem'
import { apiLevel } from '@/services/SiteService'
import { Loading } from '@/components/shared'

const ProjectListContent = () => {
    const [loading, setLoading] = useState(true)
    const [levels, setLevels] = useState<ListItemData[]>([])
    useEffect(()=>{
        apiLevel().then(res => {

            setLoading(false)
            return setLevels(res.data)
        })
    },[])
    const [view, setView] = useState('list');
    // const projectList = [
    //     {
    //         id: 1,
    //         name: 'Brik',
    //         hint: 'Refer 10 to unlock bonus',
           
    //         totalTask: 3,
    //         completedTask: 8,
    //         progression: 40,
    //         completed: true,
    //         member: [{
    //             name: "qozeem2",
    //             img: 'string5'
    //         }]
    //     }
    // ];
    
    return (
        <Loading loading={loading}>
            <div
            className={classNames(
                'mt-6 h-full flex flex-col',
                loading && 'justify-center'
            )}
        >
            {/* {!loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )} */}
            {view === 'grid' && levels.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* {projectList.map((project) => (
                        <GridItem key={project.id} data={project} />
                    ))} */}
                </div>
            )}
            {view === 'list' &&
                levels.length > 0 &&
                !loading &&
                levels.map((level) => (

                    <ListItem key={level.id} data={level} />
                ))}
        </div>
        </Loading>
        
    )
}

export default ProjectListContent
