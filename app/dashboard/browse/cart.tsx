"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";
import useResponsiveSize from "@/hooks/use-responsiveSize";
import { useCartContext } from "@/hooks/use-cartContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/hooks/use-globalContext";
import { toast } from "@/hooks/use-toast";

interface CartProps {
    isModalOpen: boolean;
    toggleModal: () => void;
}

export default function Cart({ isModalOpen, toggleModal }: CartProps) {

    const { user } = useGlobalContext();
    const { cart, removeFromCart, clearCart } = useCartContext();
    const imageSize = useResponsiveSize();  // Use the custom hook to get dynamic size

    const [screenshotUrl, setScreenshotUrl] = useState<string>("");
    const [paymentModal, setPaymentModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);


    const makePayment = async () => {
        setIsSaving(true);
        try {
            const response = await fetch("/api/payment", {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id,
                    screenshotUrl,
                    validDate: "2024-12-31",
                    categoryIds: cart.map(item => item.categoryId)
                }),
            });

            const res = await response.json()
            if (res.status !== 201) throw Error(res.error);
            toast({ description: "Payment Made successfully. Now system moderators will review and allow the access soon." })
            clearCart();
        } catch (error: any) {
            console.error("Error submitting payment:", error);
            toast({ variant: 'destructive', description: error.toString() })
        } finally {
            setScreenshotUrl("");
            setIsSaving(false);
            setPaymentModal(false);
        }
    };

    return (
        <div>
            {/* Cart Button */}
            <Button
                variant="secondary"
                className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg"
                onClick={toggleModal}
            >
                <ShoppingCart className="w-5 h-5" />
                Cart ({cart.length})
            </Button>

            {/* Cart Modal */}
            <Dialog open={isModalOpen} onOpenChange={toggleModal}>
                <DialogContent className="max-w-lg mx-auto p-6 max-h-[80%] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Your Cart</DialogTitle>

                    </DialogHeader>
                    <Card>
                        <CardHeader>
                            <CardTitle>Items in Cart</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {cart.length > 0 ? (
                                <ul className="space-y-4">
                                    {cart.map((course) => (
                                        <li key={course.categoryId} className="flex justify-between items-center gap-4">
                                            {/* Course Image */}
                                            <Image
                                                src={course.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${course.imageName}` : "/images/courses/default.png"}
                                                alt={course.categoryTitle}
                                                width={imageSize.width}
                                                height={imageSize.height}
                                                className="object-contain rounded h-20 w-20"
                                            />
                                            {/* Course Details */}
                                            <div className="flex flex-col flex-grow">
                                                <span className="font-semibold">{course.categoryTitle}</span>
                                                <span className="text-sm">NRs. {course.price}</span>
                                            </div>
                                            {/* Remove Button */}
                                            <Button
                                                variant="ghost"
                                                className="text-red-600"
                                                onClick={() => removeFromCart(course)}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center">Your cart is empty</p>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                onClick={() => setPaymentModal(true)}
                                className="w-full"
                                disabled={cart.length === 0}
                            >
                                Make Payment
                            </Button>
                        </CardFooter>
                    </Card>
                </DialogContent>
            </Dialog>

            {/* Modal for Entering Screenshot URL */}
            {paymentModal && (
                <Dialog open={paymentModal} onOpenChange={setPaymentModal}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Submit Payment</DialogTitle>
                        </DialogHeader>

                        <div className="my-4">
                            <label htmlFor="screenshotUrl" className="block mb-2">Enter Screenshot URL</label>
                            <Input
                                id="screenshotUrl"
                                value={screenshotUrl}
                                onChange={(e) => setScreenshotUrl(e.target.value)}
                                placeholder="https://example.com/screenshot.png"
                                className="w-full"
                            />
                        </div>

                        <Button disabled={isSaving} onClick={makePayment} className="w-full mt-4">
                            Confirm Payment
                        </Button>
                    </DialogContent>
                </Dialog>
            )}

        </div>
    );
}
