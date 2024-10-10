"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { TBookedCourse } from "@/app/lib/types";
import { UpdateModal } from "./update";
import { DeleteModal } from "./delete";

export function BookingTable({ courses, loading }: { courses: TBookedCourse[], loading: boolean }) {
    const [data, setData] = React.useState<TBookedCourse[]>(courses);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [selectedGrade, setSelectedGrade] = React.useState<TBookedCourse | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    const columns: ColumnDef<TBookedCourse>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorFn: (row) => row.category?.categoryTitle || '',  // Handle potential undefined values
            id: "categoryTitle",
            header: "Course Title",
            filterFn: "includesString",  // Apply basic string filter
            cell: ({ row }) => <div className="capitalize">{row.original.category?.categoryTitle}</div>,
        },
        {
            accessorFn: (row) => row.user?.name || '',
            id: "userName",
            header: "User Name",
            filterFn: "includesString",
            cell: ({ row }) => <div>{row.original.user?.name}</div>,
        },
        {
            accessorFn: (row) => row.user?.email || '',
            id: "userEmail",
            header: "User Contact",
            filterFn: "includesString",
            cell: ({ row }) => <div>{row.original.user?.email}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleApprove(row.original)}>
                            Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReject(row.original)}>
                            Reject
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    // const handleOpenModal = (course: TBookedCourse) => {
    //     setSelectedGrade(course);
    //     setIsModalOpen(true);
    // };

    // const handleDeleteModal = (course: TBookedCourse) => {
    //     setSelectedGrade(course);
    //     setIsDeleteModalOpen(true);
    // };

    const handleApprove = async (updateData: TBookedCourse) => {
        // Implement your save logic
    };

    const handleReject = (course: TBookedCourse) => {
        const updatedData = data.filter((f) => f.bookedId !== course.bookedId);
        setData(updatedData);
    };

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(), // Ensure it's here
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    React.useEffect(() => {
        if (courses && courses.length > 0) {
            setData(courses);
        }
    }, [courses]);


    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row items-center py-4 space-y-4 md:space-y-0 md:space-x-4">
                <Input
                    placeholder="Filter by course title..."
                    value={(table.getColumn("categoryTitle")?.getFilterValue() as string) || ""}
                    onChange={(event) =>
                        table.getColumn("categoryTitle")?.setFilterValue(event.target.value)
                    }
                    className="w-full sm:max-w-sm"
                />
                <Input
                    placeholder="Filter by user name..."
                    value={(table.getColumn("userName")?.getFilterValue() as string) || ""}
                    onChange={(event) =>
                        table.getColumn("userName")?.setFilterValue(event.target.value)
                    }
                    className="w-full sm:max-w-sm"
                />
                <Input
                    placeholder="Filter by user contact..."
                    value={(table.getColumn("userEmail")?.getFilterValue() as string) || ""}
                    onChange={(event) =>
                        table.getColumn("userEmail")?.setFilterValue(event.target.value)
                    }
                    className="w-full sm:max-w-sm"
                />




                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto w-full sm:w-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>

            {/* {selectedGrade && (
                <UpdateModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    course={selectedGrade}
                    onSave={handleSave}
                />
            )}

            {selectedGrade && (
                <DeleteModal
                    open={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    course={selectedGrade}
                    onDelete={handleDelete}
                />
            )} */}
        </div>
    );
}
