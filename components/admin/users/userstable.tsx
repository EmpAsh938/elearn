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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

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
import { UpdateUserModal } from "./update";
import { DeleteUserModal } from "./delete";
import { UpdateRoleModal } from "./role";
import { toast } from "@/hooks/use-toast";
import { UpdatePackageModal } from "./package";

export type User = {
    collegename: string;
    email: string;
    faculty: string;
    id: string;
    name: string;
    roles: Array<{ id: string; name: string }>;
};



export function UsersTable() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<User[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null); // Modal state
    const [isModalOpen, setIsModalOpen] = React.useState(false); // Modal state
    const [isRoleModalOpen, setIsRoleModalOpen] = React.useState(false); // Modal state
    const [isPackageModalOpen, setIsPackageModalOpen] = React.useState(false); // Modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); // Modal state

    const columns: ColumnDef<User>[] = [
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
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Contact
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
        },
        {
            accessorKey: "discount",
            header: () => <div className="text-right">Discount</div>,
            cell: ({ row }) => <div className="text-right font-medium capitalize">{row.getValue("discount") || "N/A"}</div>,
        },
        {
            accessorKey: "roles",
            header: "Roles",
            cell: ({ row }) => {
                const roles = row.original.roles.map(role => role.name).join(", ");
                return <div>{roles}</div>; // Display roles as comma-separated
            },
        },
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
                            {/* <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(user.id.toString())}
                            >
                                Copy User ID
                            </DropdownMenuItem> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handlePackageModal(user)}>Update Package</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenRoleModal(user)}>Update Role</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenModal(user)}>Update user</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteModal(user)}>Delete user</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const handleOpenModal = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    const handlePackageModal = (user: User) => {
        setSelectedUser(user);
        setIsPackageModalOpen(true);
    };
    const handleOpenRoleModal = (user: User) => {
        setSelectedUser(user);
        setIsRoleModalOpen(true);
    };
    const handleDeleteModal = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleRole = async (email: string, role: string) => {

        try {
            const req = await fetch('/api/role', {
                method: 'POST',
                body: JSON.stringify({ email, role })
            })
            const res = await req.json();
            if (res.status !== 200) throw Error(res.error);
            toast({ title: "Role Change Operation", description: "Role Changed Successfully" })
            window.location.href = "/admin/users";
        } catch (error: any) {
            toast({ variant: "destructive", title: "Role Change Operation", description: error.toString() });
            console.log(error);
        }
    }

    const handlePackage = async (userId: string, faculty: string) => {
        try {
            const req = await fetch('/api/user/faculty', {
                method: 'PUT',
                body: JSON.stringify({ userId, faculty })
            })
            const res = await req.json();
            if (res.status !== 200) throw Error(res.error);
            toast({ title: "Faculty Change Operation", description: "Faculty Changed Successfully" })
            window.location.href = "/admin/users";
        } catch (error: any) {
            toast({ variant: "destructive", title: "Faculty Change Operation", description: error.toString() });
            console.log(error);
        }
    }

    // Handle saving the updated user data
    const handleSaveUser = (updatedUser: User) => {
        console.log("Updated user data:", updatedUser);
        // Here you can send the updated user to the server or update local state
        // Update the data array locally or re-fetch the data
        const updatedData = data.map((u) => (u.id === updatedUser.id ? updatedUser : u));
        setData(updatedData);
    };

    const handleDeleteUser = async (user: string) => {
        try {
            const request = await fetch(`/api/user?userId=${user}`, {
                method: 'DELETE',
            });
            const response = await request.json();
            if (response.status !== 200) throw Error();
            toast({ description: "User deleted successfully" });
            window.location.href = '/admin/users';
        } catch (error) {
            toast({ description: "User could not be deleted" });

        }
    }

    // Fetch data from the server when the component mounts
    React.useEffect(() => {
        async function fetchUsers() {
            setLoading(true);
            try {
                const response = await fetch('/api/user');
                const result = await response.json();
                if (result.status !== 200) throw Error(result.error);
                setData(result.body); // Set the data from API
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

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

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
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

            {(selectedUser && isRoleModalOpen) && (
                <UpdateRoleModal
                    user={selectedUser}
                    open={isRoleModalOpen}
                    onClose={() => setIsRoleModalOpen(false)}
                    onSave={handleRole}
                />
            )}
            {(selectedUser && isPackageModalOpen) && (
                <UpdatePackageModal
                    user={selectedUser}
                    open={isPackageModalOpen}
                    onClose={() => setIsPackageModalOpen(false)}
                    onSave={handlePackage}
                />
            )}
            {(selectedUser && isModalOpen) && (
                <UpdateUserModal
                    user={selectedUser}
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveUser}
                />
            )}
            {(selectedUser && isDeleteModalOpen) && (
                <DeleteUserModal
                    user={selectedUser}
                    open={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={handleDeleteUser} // Corrected the syntax here
                />
            )}



        </div>
    );
}
