'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type BookingCardDestination = {
    _id: string;
    destinationName: string;
    price: string | number;
    imageUrl: string;
};

type BookingCardProps = {
    destination: BookingCardDestination;
};

const BookingCard = ({ destination }: BookingCardProps) => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [departureDate, setDepartureDate] = useState("2026-05-15");
    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState("");

    const handleBookNow = async () => {
        // Only logged-in users can create a booking
        if (!user) {
            router.push("/login");
            return;
        }

        try {
            setIsBooking(true);
            setError("");

            // Booking document shape from the architecture
            const booking = {
                userName: user.name,
                userImage: user.image,
                userId: user.id,
                destinationId: destination._id,
                destinationName: destination.destinationName,
                destinationImage: destination.imageUrl,
                price: destination.price,
                departureDate,
            };

            const res = await fetch("http://localhost:5000/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(booking),
            });

            if (!res.ok) {
                throw new Error("Failed to create your booking. Please try again.");
            }

            router.push("/my-bookings");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
            setIsBooking(false);
        }
    };

    return (
        <div>
            <Input
                id="travel-date"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="mb-4 h-auto w-full rounded-none border-gray-200 bg-gray-50 px-3 py-3 text-sm focus-visible:border-cyan-500 focus-visible:ring-cyan-500/30"
            />

            {error && (
                <p role="alert" className="mb-4 text-sm text-red-500">
                    {error}
                </p>
            )}

            <Button
                type="button"
                onClick={handleBookNow}
                disabled={isBooking}
                className="mb-4 h-auto w-full gap-2 rounded-none bg-cyan-500 px-4 py-3 text-sm font-medium text-white hover:bg-cyan-600 disabled:bg-cyan-500/60"
            >
                {isBooking ? (
                    <>
                        <Loader2 className="size-4 animate-spin" /> Booking...
                    </>
                ) : (
                    <>
                        Book Now <span>→</span>
                    </>
                )}
            </Button>
        </div>
    );
};

export default BookingCard;