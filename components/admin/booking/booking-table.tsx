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
            accessorKey: "category.categoryTitle",
            header: "Course Title",
            cell: ({ row }) => <div className="capitalize">{row.original.category.categoryTitle}</div>,
        },
        // {
        //     accessorKey: "category.categoryDescription",
        //     header: "Course Description",
        //     cell: ({ row }) => (
        //         <div className="capitalize">
        //             {row.original.category.categoryDescription}
        //         </div>
        //     ),
        // },
        {
            accessorKey: "user.name",
            header: "User Name",
            cell: ({ row }) => <div>{row.original.user.name}</div>,
        },
        {
            accessorKey: "user.email",
            header: "User Contact",
            cell: ({ row }) => <div>{row.original.user.email}</div>,
        },

        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const course = row.original;

                return (
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
                            <DropdownMenuItem>
                                Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Reject
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
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
        getFilteredRowModel: getFilteredRowModel(),
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
                    value={(table.getColumn("category.categoryTitle")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("category.categoryTitle")?.setFilterValue(event.target.value)
                    }
                    className="w-full sm:max-w-sm"
                />
                <Input
                    placeholder="Filter by user name..."
                    value={(table.getColumn("user.name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("user.name")?.setFilterValue(event.target.value)
                    }
                    className="w-full sm:max-w-sm"
                />
                <Input
                    placeholder="Filter by user contact..."
                    value={(table.getColumn("user.email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("user.email")?.setFilterValue(event.target.value)
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
