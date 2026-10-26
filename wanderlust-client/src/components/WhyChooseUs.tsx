
import { ShieldCheck, Map, Headset } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#EDFAFC] px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-8 text-center md:mb-9">
          <h2 className="font-serif text-3xl tracking-tight text-[#111111] sm:text-4xl md:text-[40px]">
            Why Choose Wanderlust
          </h2>

          <p className="mt-2 text-xs text-[#737373] sm:text-sm">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="min-h-43 bg-white px-7 py-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <Icon
                size={30}
                strokeWidth={2.5}
                className="mb-4 text-[#13A5C1]"
                aria-hidden="true"
              />

              <h3 className="font-serif text-xl tracking-tight text-[#171717]">
                {title}
              </h3>

              <p className="mt-2 text-xs leading-[1.7] text-[#737373]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}