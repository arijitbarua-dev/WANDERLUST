"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const destinations = [
  {
    id: "bali-paradise",
    name: "Bali Paradise",
    country: "Indonesia",
    price: 2700,
    duration: "7 Days/6 Nights",
    rating: 4.5,
    image: "/images/destinations/bali.jpg",
    alt: "Ulun Danu Beratan temple on a misty lake in Bali",
  },
  {
    id: "swiss-alps-adventure",
    name: "Swiss Alps Adventure",
    country: "Switzerland",
    price: 3400,
    duration: "8 Days/7 Nights",
    rating: 4.8,
    image: "/images/destinations/swiss-alps.jpg",
    alt: "Snow-capped Swiss Alps peaks rising above a sea of clouds at sunset",
  },
  {
    id: "santorini-escape",
    name: "Santorini Escape",
    country: "Greece",
    price: 2900,
    duration: "6 Days/5 Nights",
    rating: 4.7,
    image: "/images/destinations/santorini.jpg",
    alt: "Whitewashed cliffside houses of Oia, Santorini at dusk",
  },
  {
    id: "everest-base-camp",
    name: "Everest Base Camp",
    country: "Nepal",
    price: 2500,
    duration: "10 Days/9 Nights",
    rating: 4.9,
    image: "/images/destinations/everest.jpg",
    alt: "Prayer stupa on a hillside trail below the Everest massif in Nepal",
  },
  {
    id: "kerala-backwaters",
    name: "Kerala Backwaters",
    country: "India",
    price: 1800,
    duration: "5 Days/4 Nights",
    rating: 4.6,
    image: "/images/destinations/kerala.jpg",
    alt: "Houseboat drifting through the palm-lined backwaters of Kerala",
  },
];

const FeaturedDestinations = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const progress = ((current + 1) / destinations.length) * 100;

  return (
    <section className="bg-white px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section heading and CTA */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-[#111111] sm:text-4xl md:text-[40px]">
              Featured Destinations
            </h2>

            <p className="mt-1.5 text-xs text-[#737373] sm:text-sm">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/destinations" />}
            className="h-auto shrink-0 rounded-md border-[#13A5C1]/50 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#171717] hover:border-[#13A5C1] hover:bg-white hover:text-[#13A5C1] sm:px-5 sm:text-xs"
          >
            All Destinations
            <ArrowRight className="size-3.5" strokeWidth={2} />
          </Button>
        </div>

        {/* Destination cards */}
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: false, containScroll: "trimSnaps" }}
          className="group/carousel"
        >
          <CarouselContent className="-ml-4">
            {destinations.map((destination) => (
              <CarouselItem
                key={destination.id}
                className="basis-[85%] pl-4 sm:basis-[48%] lg:basis-[45%]"
              >
                <article className="group flex h-full flex-col rounded-lg border border-[#EEEEEE] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                  {/* Destination image */}
                  <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-md bg-[#f3f3f3]">
                    <Image
                      src={destination.image}
                      alt={destination.alt}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 480px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Rating badge */}
                    <div className="absolute right-3 top-3 flex h-7 items-center gap-1.5 rounded-full bg-white px-2.5 text-xs shadow-sm">
                      <span className="font-medium text-black">
                        {destination.rating.toFixed(1)}
                      </span>
                      <Star className="size-3 fill-black stroke-black" />
                    </div>
                  </div>

                  {/* Destination details */}
                  <div className="flex flex-1 flex-col px-1 pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                      <MapPin className="size-3.5 shrink-0" />
                      <span>{destination.country}</span>
                    </div>

                    <div className="mt-1.5 flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold tracking-tight text-[#171717] sm:text-xl">
                        {destination.name}
                      </h3>

                      <p className="shrink-0 text-base font-bold text-black">
                        ${destination.price.toLocaleString("en-US")}
                        <span className="text-[11px] font-normal text-[#737373]">
                          /Person
                        </span>
                      </p>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#737373]">
                      <CalendarDays className="size-3.5 shrink-0" />
                      <span>{destination.duration}</span>
                    </div>

                    <Link
                      href="/destinations"
                      className="mt-auto inline-flex w-fit items-center gap-1 pt-4 text-xs font-bold uppercase tracking-wide text-[#13A5C1] underline underline-offset-2 hover:text-[#0e8ba4]"
                    >
                      Book Now
                      <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                    </Link>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination, progress bar and navigation */}
        <div className="mt-8 flex items-center gap-5">
          <span className="shrink-0 text-sm text-[#525252]">
            {current + 1}/{destinations.length}
          </span>

          <div
            className="h-px flex-1 bg-[#E5E5E5]"
            role="progressbar"
            aria-label="Carousel progress"
            aria-valuemin={1}
            aria-valuemax={destinations.length}
            aria-valuenow={current + 1}
          >
            <div
              className="h-px bg-[#525252] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous destinations"
              className="size-10 rounded-full border-[#D0D0D0] text-[#A8A8A8] hover:border-[#13A5C1] hover:bg-white hover:text-[#13A5C1] disabled:border-[#D0D0D0] disabled:text-[#A8A8A8] disabled:opacity-60"
            >
              <ArrowLeft strokeWidth={1.5} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next destinations"
              className="size-10 rounded-full border-[#D0D0D0] text-[#A8A8A8] hover:border-[#13A5C1] hover:bg-white hover:text-[#13A5C1] disabled:border-[#D0D0D0] disabled:text-[#A8A8A8] disabled:opacity-60"
            >
              <ArrowRight strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
