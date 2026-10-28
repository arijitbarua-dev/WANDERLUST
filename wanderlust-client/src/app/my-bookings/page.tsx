'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { TicketX } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import MyBookingCard, { type Booking } from "@/components/MyBookingCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BookingsSkeleton = () => (
    <div className="flex flex-col gap-5" aria-hidden="true">
        {[0, 1, 2].map((item) => (
            <div
                key={item}
                className="flex animate-pulse gap-4 rounded-lg border border-gray-200 bg-white p-4"
            >
                <div className="h-32 w-full shrink-0 rounded-lg bg-gray-100 sm:h-36 sm:w-64" />

                <div className="hidden flex-1 space-y-3 py-1 sm:block">
                    <div className="h-6 w-24 rounded-full bg-gray-100" />
                    <div className="h-6 w-52 rounded bg-gray-100" />
                    <div className="h-4 w-44 rounded bg-gray-100" />
                    <div className="h-4 w-40 rounded bg-gray-100" />
                    <div className="h-7 w-20 rounded bg-gray-100" />
                </div>
            </div>
        ))}
    </div>
);

const MyBookingsPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const userId = session?.user?.id;

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get current user data → GET http://localhost:5000/bookings/:userId
    useEffect(() => {
        if (!userId) return;

        let cancelled = false;

        const fetchBookings = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await fetch(`http://localhost:5000/bookings/${userId}`);

                if (!res.ok) {
                    throw new Error("Failed to load your bookings.");
                }

                const data = await res.json();

                if (!cancelled) {
                    setBookings(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Something went wrong. Please try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchBookings();

        return () => {
            cancelled = true;
        };
    }, [userId]);

    const handleCancel = (bookingId: string) => {
        setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
    };

    return (
        <div className="min-h-screen bg-white text-[#171717]">
            <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
                {/* Heading */}
                <header className="mb-7">
                    <h1 className="text-3xl font-normal leading-tight tracking-[-1.2px] sm:text-4xl">
                        My Bookings
                    </h1>

                    <p className="mt-2 text-sm text-[#737373]">
                        Manage and view your upcoming travel plans
                    </p>
                </header>

                {/* Session still resolving */}
                {isPending && <BookingsSkeleton />}

                {/* Not logged in */}
                {!isPending && !userId && (
                    <div className="rounded-lg border border-gray-200 bg-white px-6 py-14 text-center">
                        <h2 className="text-lg font-medium text-gray-900">
                            Sign in to view your bookings
                        </h2>

                        <p className="mx-auto mt-1.5 max-w-md text-sm text-[#737373]">
                            You need to be logged in to see and manage your travel
                            plans.
                        </p>

                        <Link
                            href="/login"
                            className={cn(
                                buttonVariants(),
                                "mt-5 bg-[#15A1BF] px-5 text-white hover:bg-[#0f8ea3]"
                            )}
                        >
                            Login
                        </Link>
                    </div>
                )}

                {/* Logged in */}
                {userId && (
                    <>
                        {loading && <BookingsSkeleton />}

                        {!loading && error && (
                            <p
                                role="alert"
                                className="py-10 text-center text-sm text-red-500"
                            >
                                {error}
                            </p>
                        )}

                        {!loading && !error && bookings.length === 0 && (
                            <div className="rounded-lg border border-gray-200 bg-white px-6 py-14 text-center">
                                <TicketX className="mx-auto size-8 text-[#15A1BF]" />

                                <h2 className="mt-3 text-lg font-medium text-gray-900">
                                    No bookings yet
                                </h2>

                                <p className="mx-auto mt-1.5 max-w-md text-sm text-[#737373]">
                                    You haven&apos;t booked any trips yet. Explore our
                                    destinations and plan your next adventure.
                                </p>

                                <Link
                                    href="/destinations"
                                    className={cn(
                                        buttonVariants(),
                                        "mt-5 bg-[#15A1BF] px-5 text-white hover:bg-[#0f8ea3]"
                                    )}
                                >
                                    Explore Destinations
                                </Link>
                            </div>
                        )}

                        {!loading && !error && bookings.length > 0 && (
                            <div className="flex flex-col gap-5">
                                {bookings.map((booking) => (
                                    <MyBookingCard
                                        key={booking._id}
                                        booking={booking}
                                        onCancel={handleCancel}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default MyBookingsPage;
