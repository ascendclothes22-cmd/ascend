import { Hero } from "@/components/home/Hero";
import { StatsMarquee } from "@/components/home/StatsMarquee";
import { BrandStory } from "@/components/home/BrandStory";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BestSellers } from "@/components/home/BestSellers";
import { DropSection } from "@/components/home/DropSection";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsMarquee />
      <BrandStory />
      <FeaturedProducts />
      <BestSellers />
      <DropSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
