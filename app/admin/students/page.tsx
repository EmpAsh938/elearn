"use client";

import * as React from "react";
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


type Student = {
    id: string;
    name: string;
    thumbnail: string;
    enrolledSubjects: string;
    package: string;
};

const initialData: Student[] = [
    { id: "S001", thumbnail: "/images/profile/user.jpeg", name: "John Doe", enrolledSubjects: "Math, Science", package: "Package 1" },
    { id: "S002", thumbnail: "/images/profile/user.jpeg", name: "John Doe", enrolledSubjects: "Math", package: "Package 1" },
    { id: "S003", thumbnail: "/images/profile/user.jpeg", name: "John Doe", enrolledSubjects: "Science", package: "Package 1" },
    { id: "S004", thumbnail: "/images/profile/user.jpeg", name: "Jane Smith", enrolledSubjects: "Math, English", package: "Package 2" },
    { id: "S005", thumbnail: "/images/profile/user.jpeg", name: "Jane Smith", enrolledSubjects: "English", package: "Package 2" },
    { id: "S006", thumbnail: "/images/profile/user.jpeg", name: "Jack Johnson", enrolledSubjects: "Science, History", package: "Package 3" },
    { id: "S007", thumbnail: "/images/profile/user.jpeg", name: "Jack Johnson", enrolledSubjects: "History", package: "Package 3" },
    { id: "S008", thumbnail: "/images/profile/user.jpeg", name: "Jack Johnson", enrolledSubjects: "Science", package: "Package 3" },
    { id: "S009", thumbnail: "/images/profile/user.jpeg", name: "Jack Johnson", enrolledSubjects: "Science, History", package: "Package 3" },
    { id: "S010", thumbnail: "/images/profile/user.jpeg", name: "Jack Johnson", enrolledSubjects: "History", package: "Package 3" },
    { id: "S011", thumbnail: "/images/profile/user.jpeg", name: "Jack Johnson", enrolledSubjects: "Science", package: "Package 3" },
];

const ITEMS_PER_PAGE = 5; // Customize items per page

export function StudentsPage() {
    const [data, setData] = React.useState<Student[]>(initialData);
    const [selectedPackage, setSelectedPackage] = React.useState<string | null>(null);
    const [selectedSubject, setSelectedSubject] = React.useState<string | null>(null);
    const [page, setPage] = React.useState(0); // Pagination state

    // Memoize the filtered data to avoid recalculating on every render
    const filteredData = React.useMemo(() => {
        return data.filter((student) => {
            const packageMatches = selectedPackage && selectedPackage !== "All" ? student.package === selectedPackage : true;
            const subjectMatches = selectedSubject && selectedSubject !== "All" ? student.enrolledSubjects.includes(selectedSubject) : true;
            return packageMatches && subjectMatches;
        });
    }, [data, selectedPackage, selectedSubject]);

    // Pagination logic: slice filtered data based on current page and items per page
    const paginatedData = React.useMemo(() => {
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return filteredData.slice(start, end);
    }, [filteredData, page]);

    // Memoize the table columns definition
    const columns: ColumnDef<Student>[] = React.useMemo(() => [
        { accessorKey: "id", header: "ID" },
        {
            accessorKey: "thumbnail",
            header: "Avatar",
            cell: (info) => (
                <Image
                    src={info.getValue() as string}
                    alt="Student Avatar"
                    width={100}
                    height={100}
                    className="w-10 h-10 rounded-full"
                />
            ),
        }, { accessorKey: "name", header: "Name" },
        { accessorKey: "enrolledSubjects", header: "Enrolled Subjects" },
    ], []);

    // Use memoized data and columns in React Table configuration
    const table = useReactTable({
        data: paginatedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE); // Calculate total pages


    const handleDownload = () => {
        // Step 1: Prepare the student data in a 2D array format for Excel
        const worksheetData = [
            ["ID", "Name", "Enrolled Subjects", "Package"], // Header row
            ...data.map((student) => [student.id, student.name, student.enrolledSubjects, student.package]), // Data rows
        ];

        // Step 2: Create a new workbook and a worksheet from the data
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

        // Step 3: Generate the Excel file and trigger the download
        XLSX.writeFile(workbook, "students.xlsx");
    };

    return (
        <div className="w-full p-6">
            <h2 className="text-2xl font-medium">Students</h2>
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
                <DropdownMenu>
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
                </DropdownMenu>
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

export default StudentsPage;
