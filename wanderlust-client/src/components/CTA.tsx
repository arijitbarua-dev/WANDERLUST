
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-4 py-8 sm:px-6 md:py-10">
      <div className="relative mx-auto flex min-h-63.75 max-w-7xl items-center justify-center overflow-hidden bg-[#171717] px-5 py-12 text-center sm:min-h-[280px] md:min-h-[300px]">
        {/* Background image */}
        <Image
          src="/images/CTA.png"
          alt="Aerial view of a tropical island surrounded by turquoise water"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* CTA content */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          <h2 className="font-serif text-3xl font-normal tracking-[-1.5px] text-white sm:text-4xl md:text-[40px] md:leading-tight">
            Ready To Start Your Journey?
          </h2>

          <p className="mt-2 text-xs leading-relaxed text-white/90 sm:text-sm md:text-base">
            Join thousands of travelers who have discovered the world with us
          </p>

          {/* Booking button */}
          <a
            href="/contact"
            className="mt-7 inline-flex min-h-10 items-center justify-center gap-5 bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[#171717] transition-colors duration-200 hover:bg-[#13A5C1] hover:text-white sm:px-6"
          >
            Book Your Trip Today
            <ArrowRight size={17} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </section>
  );
}