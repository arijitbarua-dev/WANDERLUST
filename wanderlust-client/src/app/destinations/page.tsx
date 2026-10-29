
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Star,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

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
  rating?: number;
};

export default function AllDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`);

        if (!res.ok) {
          throw new Error("Failed to load destinations.");
        }

        const data = await res.json();

        setDestinations(
          Array.isArray(data) ? data : data.destinations ?? []
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const categories = useMemo(
    () =>
      [
        ...new Set(
          destinations.map((item) => item.category).filter(Boolean)
        ),
      ],
    [destinations]
  );

  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }

    result = result.filter((item) => {
      const price = Number(item.price);

      if (priceRange === "under1000") {
        return item.price !== "" && price < 1000;
      }

      if (priceRange === "1000-2000") {
        return item.price !== "" && price >= 1000 && price <= 2000;
      }

      if (priceRange === "over2000") {
        return item.price !== "" && price > 2000;
      }

      return true;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => {
        if (!a.price) return 1;
        if (!b.price) return -1;
        return Number(a.price) - Number(b.price);
      });
    } else if (sortBy === "price-high") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    } else if (sortBy === "rating") {
      result.sort(
        (a, b) => (b.rating ?? 4.5) - (a.rating ?? 4.5)
      );
    } else if (sortBy === "name") {
      result.sort((a, b) =>
        a.destinationName.localeCompare(b.destinationName)
      );
    }

    return result;
  }, [destinations, category, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <main className="mx-auto max-w-300 px-5 pb-10 pt-10 sm:px-8 sm:pt-12 lg:px-12">
        {/* Heading */}
        <header className="mb-7">
          <h1 className="text-3xl font-normal leading-tight tracking-[-1.2px] sm:text-4xl">
            Explore All Destinations
          </h1>

          <p className="mt-2 text-sm text-[#737373]">
            Find your perfect travel experience from our curated collection
          </p>
        </header>

        {/* Filters */}
        <div className="grid grid-cols-1 border border-[#d4d4d4] sm:grid-cols-3">
          <div className="relative border-b border-[#d4d4d4] sm:border-b-0 sm:border-r">
            <select
              aria-label="Filter by category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full appearance-none bg-white px-4 pr-10 text-xs uppercase text-[#525252] outline-none focus:ring-1 focus:ring-inset focus:ring-[#009fdf]"
            >
              <option value="all">Category</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#a3a3a3]" />
          </div>

          <div className="relative border-b border-[#d4d4d4] sm:border-b-0 sm:border-r">
            <select
              aria-label="Filter by price range"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="h-11 w-full appearance-none bg-white px-4 pr-10 text-xs uppercase text-[#525252] outline-none focus:ring-1 focus:ring-inset focus:ring-[#009fdf]"
            >
              <option value="all">Price Range</option>
              <option value="under1000">Under $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="over2000">Over $2,000</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#a3a3a3]" />
          </div>

          <div className="relative">
            <select
              aria-label="Sort destinations"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 w-full appearance-none bg-white px-4 pr-10 text-xs uppercase text-[#525252] outline-none focus:ring-1 focus:ring-inset focus:ring-[#009fdf]"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#a3a3a3]" />
          </div>
        </div>

        {/* Results count */}
        <p className="mb-5 mt-4 text-sm text-[#737373]">
          {loading
            ? "Loading destinations..."
            : `Showing ${filteredDestinations.length} destinations`}
        </p>

        {error && (
          <p className="py-8 text-center text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && filteredDestinations.length === 0 && (
          <p className="py-12 text-center text-base text-[#737373]">
            No destinations found. Try changing your filters.
          </p>
        )}

        {/* Destination grid */}
        {!error && (
          <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => {
              const price = Number(destination.price);
              const rating = destination.rating ?? 4.5;

              return (
                <article key={destination._id} className="min-w-0">
                  {/* Image */}
                  <div className="relative aspect-[1.6/1] w-full overflow-hidden bg-[#f3f3f3]">
                    {destination.imageUrl ? (
                      <Image
                        src={destination.imageUrl}
                        alt={destination.destinationName}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-500">
                        No image available
                      </div>
                    )}

                    {/* Rating */}
                    <div className="absolute right-3 top-3 flex h-7 items-center gap-1.5 bg-white/90 px-2.5 text-xs text-black shadow-sm">
                      <span className="font-medium">{rating.toFixed(1)}</span>
                      <Star className="size-3.5 fill-black stroke-black" />
                    </div>
                  </div>

                  {/* Destination details */}
                  <div className="pt-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                      <MapPin className="size-3.5 shrink-0" />
                      <span>{destination.country}</span>
                    </div>

                    <div className="mt-1.5 flex items-start justify-between gap-2">
                      <h2 className="text-base font-normal leading-snug tracking-[-0.2px] text-[#171717]">
                        {destination.destinationName}
                      </h2>

                      <div className="shrink-0 text-sm font-medium text-black">
                        {destination.price !== "" &&
                        Number.isFinite(price) ? (
                          <>
                            ${price.toLocaleString("en-US")}
                            <span className="text-[11px] font-normal text-[#737373]">
                              /Person
                            </span>
                          </>
                        ) : (
                          <span className="text-xs font-normal text-[#737373]">
                            Price unavailable
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#737373]">
                      <CalendarDays className="size-3.5 shrink-0" />
                      <span>
                        {destination.duration || "Duration unavailable"}
                      </span>
                    </div>

                    <Link
                      href={`/destinations/${destination._id}`}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#009fdf] transition-colors hover:text-[#007eaf]"
                    >
                      BOOK NOW
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}