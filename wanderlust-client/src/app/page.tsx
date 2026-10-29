import Banner from "@/components/Banner";
import CTA from "@/components/CTA";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      
      <Banner />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  );
}