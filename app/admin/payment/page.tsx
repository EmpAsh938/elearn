"use client";

import { TCourses } from '@/app/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';

interface Payment {
    paymentId: number;
    totalPrice: number;
    addedDate: number[];
    validDate: string;
    categories: TCourses[];
    user: {
        name: string;
        email: string;
        collegename: string;
        imageName: string;
    };
}


const formatAddedDate = (dateArray: number[]) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return new Date(year, month - 1, day, hour, minute, second).toLocaleString();
};


const PaymentHistory = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentsPerPage] = useState(5);

    // Get current payments
    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('/api/payment');
                const data = await response.json();
                setPayments(data.body);
                console.log(data.body);
            } catch (error) {
                console.error('Error fetching payment history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return <div className='p-6'>Loading payment history...</div>;
    }

    const totalPages = Math.ceil(payments.length / paymentsPerPage);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Payment History</h1>
            <Card className="overflow-x-auto">
                <Table className="min-w-full divide-y divide-gray-200">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-4 py-2">ID</TableHead>
                            <TableHead className="px-4 py-2">Student Name</TableHead>
                            <TableHead className="px-4 py-2">Contact</TableHead>
                            <TableHead className="px-4 py-2">Bought Course</TableHead>
                            <TableHead className="px-4 py-2">Total Price</TableHead>
                            <TableHead className="px-4 py-2">Added Date</TableHead>
                            <TableHead className="px-4 py-2">Valid Until</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white divide-y divide-gray-200">
                        {currentPayments.map((payment) => (
                            <TableRow key={payment.paymentId} className="hover:bg-gray-50">
                                <TableCell className="px-4 py-2">{payment.paymentId}</TableCell>
                                <TableCell className="px-4 py-2">{payment.user.name}</TableCell>
                                <TableCell className="px-4 py-2">{payment.user.email}</TableCell>
                                <TableCell className="px-4 py-2">{payment.categories.map((category, index) => (
                                    <span key={index}>
                                        {category.categoryTitle}
                                        {index < payment.categories.length - 1 && ', '}
                                    </span>
                                ))}</TableCell>
                                <TableCell className="px-4 py-2">NRs.{payment.totalPrice}</TableCell>
                                <TableCell className="px-4 py-2">{formatAddedDate(payment.addedDate)}</TableCell>
                                <TableCell className="px-4 py-2">{payment.validDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <Button
                    className="px-4 py-2 mx-1"
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                >
                    Previous
                </Button>
                {[...Array(totalPages)].map((_, index) => (
                    <Button
                        key={index}
                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue text-white' : ''}`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </Button>
                ))}
                <Button
                    className="px-4 py-2 mx-1"
                    disabled={currentPage === totalPages}
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );

};

export default PaymentHistory;
