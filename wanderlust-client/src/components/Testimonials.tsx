
"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
    alt: "Michael Chen, traveler",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
    alt: "Sarah Johnson, traveler",
  },
  {
    quote:
      '"Exploring Japan with Wanderlust was an incredible experience. Everything was organized perfectly, and every destination felt special."',
    name: "Emma Wilson",
    location: "London, UK",
    image: "/images/person4.png",
    alt: "Emma Wilson, traveler",
  },
  {
    quote:
      '"Our trip to the Greek islands was unforgettable. The recommendations, hotels, and local experiences made the entire journey amazing."',
    name: "Daniel Smith",
    location: "Toronto, Canada",
    image: "/images/person3.png",
    alt: "Daniel Smith, traveler",
  },
];

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleTestimonials = [
    testimonials[startIndex],
    testimonials[(startIndex + 1) % testimonials.length],
  ];

  const previous = () => {
    setStartIndex(
      (current) =>
        (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const next = () => {
    setStartIndex(
      (current) => (current + 1) % testimonials.length
    );
  };

  return (
    <section className="bg-white px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section heading and navigation */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-[#111111] sm:text-4xl md:text-[40px]">
              What Travelers Say
            </h2>

            <p className="mt-1 text-xs text-[#737373] sm:text-sm">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonials"
              className="flex size-10 items-center justify-center rounded-full border border-[#D0D0D0] text-[#A8A8A8] transition-colors hover:border-[#13A5C1] hover:text-[#13A5C1]"
            >
              <ArrowLeft size={17} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonials"
              className="flex size-10 items-center justify-center rounded-full border border-[#D0D0D0] text-[#A8A8A8] transition-colors hover:border-[#13A5C1] hover:text-[#13A5C1]"
            >
              <ArrowRight size={17} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visibleTestimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex min-h-54 gap-4 border border-[#EEEEEE] p-4 sm:gap-5"
            >
              {/* Testimonial content */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <p className="font-serif text-[15px] leading-[1.12] tracking-[-0.4px] text-[#171717] sm:text-base">
                  {testimonial.quote}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-medium text-[#13A5C1]">
                    — {testimonial.name}
                  </p>

                  <p className="ml-4 mt-0.5 text-[10px] text-[#858585]">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Traveler image */}
              <div className="relative min-h-37.5 w-[38%] shrink-0 self-stretch sm:w-[36%]">
                <Image
                  src={testimonial.image}
                  alt={testimonial.alt}
                  fill
                  sizes="(max-width: 767px) 38vw, 180px"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}