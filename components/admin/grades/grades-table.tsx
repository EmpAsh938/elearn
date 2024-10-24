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
import { UpdateModal } from "./update";
import { DeleteModal } from "./delete";
import { toast } from "@/hooks/use-toast";
import { TCourses } from "@/app/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";



export function GradesTable({ grades, loading }: { grades: TCourses[], loading: boolean }) {
    const [data, setData] = React.useState<TCourses[]>(grades);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [selectedGrade, setSelectedGrade] = React.useState<TCourses | null>(null); // Modal state
    const [isModalOpen, setIsModalOpen] = React.useState(false); // Modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); // Modal state

    const router = useRouter();

    const columns: ColumnDef<TCourses>[] = [
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
            accessorKey: "categoryTitle",
            header: "Title",
            cell: ({ row }) => <div className="capitalize">{row.getValue("categoryTitle")}</div>,
        },
        {
            accessorKey: "categoryType",
            header: "Course Status",
            cell: ({ row }) => {
                const categoryType = row.getValue<string>("categoryType").toLowerCase(); // Automatically infer the type

                const badgeClass: { [key: string]: string } = {
                    ongoing: "text-green",   // Proper Tailwind green class
                    prebooking: "text-yellow-800",
                    'pre-booking': "text-yellow-800",
                    upcoming: "text-blue",   // Proper Tailwind blue class
                };

                return (
                    <span
                        className={`capitalize px-2 py-1 rounded-full text-sm bg-gray-100 font-medium ${badgeClass[categoryType] || 'text-gray-800'}`}
                    >
                        {categoryType}
                    </span>
                );
            },
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => <div className="capitalize">{!row.getValue("price") ? 'N/A' : "NRs." + row.getValue("price")}</div>,
        },
        // {
        //     id: "image",
        //     header: "Image",
        //     enableHiding: false,
        //     cell: ({ row }) => {
        //         const user = row.original;

        //         return (
        //             <div className="flex items-center justify-center">
        //                 <Image
        //                     src={user.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${user.imageName}` : "/images/courses/default.png"}
        //                     alt={user.categoryTitle}
        //                     width={100}
        //                     height={100}
        //                     className="h-8 w-8 rounded-full object-cover" 
        //                 />

        //             </div>
        //         );
        //     },
        // },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const user = row.original;

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
                            <DropdownMenuItem onClick={() => router.push("posts?categoryId=" + user.categoryId)}>View Syllabus</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenModal(user)}>Update Package</DropdownMenuItem>
                            {/* <DropdownMenuItem onClick={() => handleDeleteModal(user)}>Delete Package</DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const handleOpenModal = (faculty: TCourses) => {
        setSelectedGrade(faculty);
        setIsModalOpen(true);
    };
    const handleDeleteModal = (faculty: TCourses) => {
        setSelectedGrade(faculty);
        setIsDeleteModalOpen(true);
    };


    const handleDelete = (faculty: TCourses) => {
        console.log("Package deleted");
        const updatedData = data.filter((f) => f.categoryId !== faculty.categoryId);
        setData(updatedData);
    }


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
        if (grades && grades.length > 0) {
            setData(grades);
        }
    }, [grades]);

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter title..."
                    value={(table.getColumn("categoryTitle")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("categoryTitle")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
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
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
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
            </div>

            {(selectedGrade && isModalOpen) && (
                <UpdateModal
                    faculty={selectedGrade}
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            {(selectedGrade && isDeleteModalOpen) && (
                <DeleteModal
                    faculty={selectedGrade}
                    open={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={handleDelete} // Corrected the syntax here
                />
            )}



        </div>
    );
}
