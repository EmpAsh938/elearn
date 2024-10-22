"use client";

import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
    flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import * as XLSX from "xlsx";
import Image from "next/image";
import { TUser } from "@/app/lib/types";
import { useEffect, useMemo, useState } from "react";




const ITEMS_PER_PAGE = 5; // Customize items per page

export default function StudentsPage() {
    const [data, setData] = useState<TUser[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState(""); // Search state
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);

    // Filter data based on searchQuery
    const filteredData = useMemo(() => {
        return data.filter(student =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    // Pagination logic: slice filtered data based on current page and items per page
    const paginatedData = useMemo(() => {
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return filteredData.slice(start, end);
    }, [filteredData, page]);

    // Memoize the table columns definition
    const columns: ColumnDef<TUser>[] = useMemo(() => [
        { accessorKey: "id", header: "ID" },

        {
            accessorKey: "imageName",
            header: "Avatar",
            cell: (info) => {
                const imagePath = info.getValue();
                const imageUrl = imagePath ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/image/${info.getValue()}` : '/images/profile/user.jpeg';
                return (
                    <Image
                        src={imageUrl}
                        alt="Student Avatar"
                        width={50}
                        height={50}
                        className="w-10 h-10 object-cover rounded-full"
                    />
                );
            },
        },

        {
            accessorKey: "name", header: "Name", cell: (info) => (
                <div className="capitalize">{info.getValue() as string}</div>
            )
        },
        {
            accessorKey: "email", header: "Contact", cell: (info) => (
                <div>{info.getValue() as string}</div>
            )
        },
        {
            accessorKey: "roles", header: "Status", cell: ({ row }) => {
                const roles = row.original.roles.map(role => role.name).join(", ");
                return <div>{roles.slice(5)}</div>; // Display roles as comma-separated
            },
        },
        // { accessorKey: "enrolledSubjects", header: "Enrolled Subjects" },
    ], []);

    // Use memoized data and columns in React Table configuration
    const table = useReactTable({
        data: paginatedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE); // Calculate total pages
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE); // Calculate total pages


    const handleDownload = () => {
        // Step 1: Prepare the student data in a 2D array format for Excel
        const worksheetData = [
            ["ID", "Name", "Enrolled"], // Header row
            ...data.map((student) => [student.id, student.name]), // Data rows
        ];

        // Step 2: Create a new workbook and a worksheet from the data
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

        // Step 3: Generate the Excel file and trigger the download
        XLSX.writeFile(workbook, "students.xlsx");
    };

    // Fetch data from the server when the component mounts
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/user');
                const result = await response.json();
                if (result.status !== 200) throw Error(result.error);
                const studentsData: TUser[] = result.body;
                setData(studentsData.filter(item => (item.roles[0]['id'] == '502' || item.roles[0]['id'] == '503'))); // Set the data from API

            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="w-full p-6">
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <div className="w-full p-6">
            <h2 className="text-2xl font-medium">Students</h2>
            {/* Search Input */}
            <div className="my-4">
                <input
                    type="text"
                    placeholder="Search students..."
                    className="border p-2 rounded-md w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
                />
            </div>

            <div className="flex items-center space-x-4 py-4">
                {/* Package Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {selectedPackage ? selectedPackage : "Select Package"} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedPackage("All")}>All</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedPackage("Package 1")}>Package 1</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedPackage("Package 2")}>Package 2</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedPackage("Package 3")}>Package 3</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Subject Filter */}
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {selectedSubject ? selectedSubject : "Select Subject"} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedSubject("All")}>All</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedSubject("Math")}>Math</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedSubject("Science")}>Science</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedSubject("History")}>History</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}
            </div>

            {/* Students Table */}
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
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">No data available</TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
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

            {/* Pagination Controls */}
            <div className="flex justify-between items-center py-4">
                <Button
                    variant="outline"
                    disabled={page === 0}
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
                >
                    Previous
                </Button>
                <span>
                    Page {page + 1} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    disabled={page === totalPages - 1}
                    onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
                >
                    Next
                </Button>
            </div>

            {/* Download Button */}
            <div className="flex justify-end py-4">
                <Button variant="outline" onClick={handleDownload}>
                    Download
                </Button>
            </div>
        </div>
    );
}
