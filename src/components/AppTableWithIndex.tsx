import {
    Dispatch,
    InputHTMLAttributes,
    MouseEventHandler,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import type {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
} from '@tanstack/react-table'
import {
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
    Button,
    Dropdown,
    Pagination,
    type SkeletonProps,
} from '@/components/ui'

// import { BiSearch, MdFilterList } from 'react-icons'
import { ControlSize } from '@/@types/theme'
import { Loading } from '@/components/shared'
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton'
import { MdFilterList } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'

interface DebouncedInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'size' | 'prefix'
    > {
    value: string | number
    onChange: (value: string | number) => void
    prefix?: ReactNode
    InputClassName?: string
    size?: ControlSize
    debounce?: number
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    prefix,
    size,
    InputClassName,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <div className="">
            <div className="flex items-center mb-4">
                <Input
                    style={{
                        borderRadius: '8px',
                    }}
                    size={size}
                    {...props}
                    className={''}
                    prefix={prefix}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

type AppTableType = {
    columns: ColumnDef<any, any>[]
    data: any[]
    has_onclick?: boolean
    onClick?: MouseEventHandler<HTMLTableRowElement> | undefined
    header?: JSX.Element
    setClickData?: Dispatch<SetStateAction<any>>
    skeletonAvatarColumns?: number[]
    isSort?: false
    loading?: boolean
    skeletonAvatarProps?: SkeletonProps
    pagingData?: {
        total: number
        pageIndex: number
        pageSize: number
    }
}

export default function AppTableWithIndex({
    columns,
    data,
    header,
    has_onclick,
    onClick,
    setClickData,
    isSort,
    skeletonAvatarColumns,
    skeletonAvatarProps,
    pagingData,
    loading = false,
}: AppTableType) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [globalFilter, setGlobalFilter] = useState('')

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false,
    })

    return (
        <div>
            {header ? (
                header
            ) : (
                <div className={'flex justify-between gap-3 p-4 relative'}>
                    <div className={'relative w-full max-w-[320px] !h-[55px]'}>
                        <DebouncedInput
                            value={globalFilter ?? ''}
                            prefix={
                                <BiSearch
                                    className="text-xl cursor-pointer"
                                    size={18}
                                />
                            }
                            autoFocus={false}
                            className="p-2 "
                            size={'sm'}
                            InputClassName={' '}
                            placeholder="Search..."
                            onChange={(value) => setGlobalFilter(String(value))}
                        />
                    </div>
                    <div>
                        <Dropdown
                            placement={'bottom-end'}
                            renderTitle={
                                <Button
                                    size={'sm'}
                                    className={
                                        'flex justify-center items-center gap-x-2'
                                    }
                                >
                                    <MdFilterList size={20} />
                                    Filter
                                </Button>
                            }
                        >
                            {table.getHeaderGroups().map((headerGroup) =>
                                headerGroup.headers.map((header) => {
                                    return (
                                        <Dropdown.Item
                                            key={header.id}
                                            eventKey="a"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </Dropdown.Item>
                                    )
                                })
                            )}
                        </Dropdown>
                    </div>
                </div>
            )}

            <Table className={'mb-5'}>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}

                                                {isSort && (
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                {loading && data.length === 0 ? (
                    <TableRowSkeleton
                        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                        columns={columns.length}
                        rows={pagingData ? pagingData.pageSize : 10}
                        avatarInColumns={skeletonAvatarColumns}
                        avatarProps={skeletonAvatarProps}
                    />
                ) : (
                    <Loading loading={false} type="default">
                        <TBody>
                            {table.getRowModel().rows.map((row, index) => {
                                return (
                                    <Tr
                                        key={row.id}
                                        className={`${
                                            has_onclick && 'cursor-pointer'
                                        }`}
                                        onClick={(e) => {
                                            // console.log(row.original)
                                            has_onclick &&
                                                setClickData?.(row.original)
                                            if (onClick) {
                                                onClick(e)
                                            }
                                        }}
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map((cell, idx) => {
                                                return (
                                                    <Td
                                                        className={`${
                                                            idx % 2 == 0 ||
                                                            `${idx} font-medium text-black`
                                                        } ${idx}`}
                                                        key={cell.id}
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </Td>
                                                )
                                            })}
                                    </Tr>
                                )
                            })}
                        </TBody>
                    </Loading>
                )}
            </Table>

            <Pagination
                pageSize={table.getState().pagination.pageSize}
                currentPage={table.getState().pagination.pageIndex + 1}
                total={data.length}
                onChange={onPaginationChange}
            />
        </div>
    )
}
