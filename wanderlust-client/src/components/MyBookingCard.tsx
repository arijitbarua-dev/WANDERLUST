'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Eye,
    Hash,
    XCircle,
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Booking = {
    _id: string;
    bookingId?: string;
    userName?: string;
    userImage?: string;
    userId: string;
    destinationId: string;
    destinationName: string;
    destinationImage: string;
    price: string | number;
    departureDate: string;
    status?: string;
};

type MyBookingCardProps = {
    booking: Booking;
    onCancel?: (bookingId: string) => void;
};

const statusStyles: Record<string, { badge: string; icon: typeof CheckCircle2 }> = {
    Confirmed: {
        badge: "bg-green-100 text-green-700",
        icon: CheckCircle2,
    },
    Pending: {
        badge: "bg-amber-100 text-amber-700",
        icon: Clock3,
    },
    Cancelled: {
        badge: "bg-red-100 text-red-600",
        icon: XCircle,
    },
    Canceled: {
        badge: "bg-red-100 text-red-600",
        icon: XCircle,
    },
};

const formatDepartureDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const MyBookingCard = ({ booking, onCancel }: MyBookingCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [error, setError] = useState("");

    const status = booking.status ?? "Confirmed";
    const { badge: badgeClass, icon: StatusIcon } =
        statusStyles[status] ?? statusStyles.Confirmed;

    const handleCancel = async () => {
        try {
            setIsCanceling(true);
            setError("");

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/bookings/${booking._id}`,
                { method: "DELETE" }
            );

            if (!res.ok) {
                throw new Error("Failed to cancel this booking. Please try again.");
            }

            setIsOpen(false);
            onCancel?.(booking._id);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsCanceling(false);
        }
    };

    return (
        <Card className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm ring-0">
            <div className="flex flex-col gap-4 sm:flex-row">
                {/* Destination image */}
                <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-32 sm:w-56 md:h-36 md:w-64">
                    <Image
                        src={booking.destinationImage}
                        alt={booking.destinationName || "Booked destination"}
                        fill
                        sizes="(max-width: 640px) 100vw, 256px"
                        className="object-cover"
                    />
                </div>

                {/* Booking info */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <div>
                        <Badge className={cn("h-6 px-2.5", badgeClass)}>
                            <StatusIcon className="size-3.5" />
                            {status}
                        </Badge>
                    </div>

                    <h2 className="mt-2 truncate text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                        {booking.destinationName}
                    </h2>

                    <div className="mt-2 space-y-1.5 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                            <CalendarDays className="size-4 shrink-0 text-gray-400" />
                            Departure: {formatDepartureDate(booking.departureDate)}
                        </p>

                        <p className="flex items-center gap-2">
                            <Hash className="size-4 shrink-0 text-gray-400" />
                            Booking ID: {booking.bookingId ?? booking._id}
                        </p>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-[#15A1BF]">
                        ${booking.price}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-end gap-3">
                <AlertDialog
                    open={isOpen}
                    onOpenChange={(open) => {
                        if (!isCanceling) {
                            setIsOpen(open);
                        }
                    }}
                >
                    <AlertDialogTrigger
                        render={
                            <Button
                                type="button"
                                variant="outline"
                                className="border-red-200 bg-white text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                            />
                        }
                    >
                        <XCircle className="size-4" />
                        Cancel
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to cancel your booking for{" "}
                                <strong className="font-medium text-gray-900">
                                    {booking.destinationName}
                                </strong>
                                ? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        {error && (
                            <p role="alert" className="text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isCanceling}>
                                Keep Booking
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleCancel}
                                disabled={isCanceling}
                                className="bg-red-500 text-white hover:bg-red-600"
                            >
                                {isCanceling ? "Canceling..." : "Cancel Booking"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Link
                    href={`/destinations/${booking.destinationId}`}
                    className={cn(
                        buttonVariants({ variant: "default" }),
                        "bg-[#15A1BF] text-white hover:bg-[#0f8ea3]"
                    )}
                >
                    <Eye className="size-4" />
                    View
                </Link>
            </div>
        </Card>
    );
};

export default MyBookingCard;
