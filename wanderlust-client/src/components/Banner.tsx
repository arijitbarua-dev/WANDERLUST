import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative flex min-h-140 flex-col overflow-hidden text-white md:min-h-160">
      {/* Background image + dark overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/Banner.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero copy */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 pb-10 pt-20 text-center">
        <h1 className="font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-sm font-semibold md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <Link
            href="/destinations"
            className="flex items-center gap-2 rounded-md bg-[#15A1BF] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#15A1BF]/90"
          >
            Explore Now
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/destinations"
            className="rounded-md bg-white/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            View Destination
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative border-t border-white/20 bg-[#777777]/80 text-white backdrop-blur-md">
        <div className="flex flex-col divide-y divide-white/30 md:flex-row md:divide-x md:divide-y-0">
          {searchFields.map(({ label, value }) => (
            <div
              key={label}
              className="flex-1 border-white/20 px-5 py-3 md:px-4"
            >
              <p className="text-sm font-medium text-white/95">{label}</p>
              <p className="mt-0.5 text-xs text-white/80">{value}</p>
            </div>
          ))}
          <button
            type="button"
            className="w-full bg-[#15A1BF] px-8 py-4 text-base font-medium transition-colors hover:bg-[#15A1BF]/90 md:w-44"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}