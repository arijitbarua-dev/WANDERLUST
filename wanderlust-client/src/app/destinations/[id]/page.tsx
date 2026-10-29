import Image from "next/image";
import Link from "next/link";
import EditDestinationDialog from "@/components/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";
import BookingCard from "@/components/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

type DestinationDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

type Destination = {
    _id: string;
    destinationName: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
    highlights?: string[];
    rating?: number;
    reviews?: number;
    overview?: string;
};

const DestinationDetailPage = async ({ params }: DestinationDetailPageProps) => {
    const { id } = await params;

    const token = await getTokenFromServer();
    console.log(token)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/${id}`, {
        method: "GET",
        headers: {
            authorization: token,
            "Content-type": "application/json"
        }
    });
    const destination: Destination = await res.json();

    return (
        <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
            {/* Back button and actions */}
            <div className="mb-4 flex items-center justify-between">
                <Link
                    href="/destinations"
                    className="text-sm text-gray-500 hover:text-cyan-600"
                >
                    ← Back to Destinations
                </Link>

                <div className="flex gap-3">
                    <EditDestinationDialog destination={destination} />

                    <DeleteDestinationDialog
                        destinationId={destination._id}
                        destinationName={destination.destinationName}
                    />
                </div>
            </div>

            {/* Hero image */}
            <div className="relative mb-10 h-70 w-full overflow-hidden rounded-xl sm:h-100 lg:h-120">
                <Image
                    src={destination.imageUrl}
                    alt={destination.destinationName || "Destination"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                />
            </div>

            {/* Destination details and booking card */}
            <div className="grid grid-cols-1 gap-10 border-t border-gray-100 pt-8 lg:grid-cols-3 lg:gap-12">
                {/* Left content */}
                <section className="lg:col-span-2 space-y-8">
                    <p className="mb-2 text-sm text-gray-500">
                        ♧ {destination.country || "Destination"}
                    </p>

                    <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        {destination.destinationName}
                    </h1>

                    {/* Rating and trip duration */}
                    <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span>
                            <span className="text-green-600">★</span>{" "}
                            <strong className="text-gray-900">
                                {destination.rating || "4.9"}
                            </strong>
                            <span className="text-gray-400">
                                {" "}({destination.reviews || 234} reviews)
                            </span>
                        </span>

                        <span>
                            ▣ {destination.duration || "7 Days / 6 Nights"}
                        </span>
                    </div>

                    {/* Overview */}
                    <div className="mb-7">
                        <h2 className="mb-4 text-2xl font-semibold text-grey-900">Overview</h2>
                        <p className="text-base leading-7 text-gray-600">
                            {destination.overview ||
                                destination.description ||
                                `Discover the magic of ${destination.destinationName}, with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.`}
                        </p>
                    </div>

                    {/* Highlights */}
                    <div>
                        <h2 className="mb-3 text-xl font-medium">Highlights</h2>

                        <p className="mb-4 text-sm leading-6 text-gray-500">
                            {destination.description ||
                                `Discover the magic of ${destination.destinationName}, with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.`}
                        </p>

                        <div className="grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2">
                            {(
                                destination.highlights?.length
                                    ? destination.highlights
                                    : [
                                        "Luxury beachfront accommodation",
                                        "Visit ancient temples at sunset",
                                        "Traditional Balinese spa treatment",
                                        "Private beach dinner experience",
                                        "Sunrise trek to Mount Batur",
                                    ]
                            ).map((highlight, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Right booking card */}
                <aside className="h-fit rounded-xl border border-gray-200 bg-white p-7 shadow-md lg:sticky lg:top-8">
                    <p className="text-xs text-gray-500">Starting from</p>

                    <div className="mb-2 text-4xl font-semibold text-cyan-600">
                        ${destination.price || 1299}
                    </div>

                    <p className="mb-5 text-xs text-gray-500">per person</p>

                    <label
                        htmlFor="travel-date"
                        className="mb-2 block text-sm text-gray-700"
                    >
                        Travel date
                    </label>

                    <BookingCard destination={destination}/>

                    <ul className="space-y-2 text-xs text-gray-500">
                        <li>
                            <span className="text-green-500">✓</span>{" "}
                            Free cancellation up to 7 days
                        </li>
                        <li>
                            <span className="text-green-500">✓</span>{" "}
                            Travel insurance included
                        </li>
                        <li>
                            <span className="text-green-500">✓</span>{" "}
                            24/7 customer support
                        </li>
                    </ul>
                </aside>
            </div>
        </main>
    );
};

export default DestinationDetailPage;