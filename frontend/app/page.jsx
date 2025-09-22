import dynamic from "next/dynamic";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Hero from "@/components/homes/home-gaming/Hero";
import LoadingSpinner from "@/components/common/LoadingSpinner";

// Lazy load heavy components with optimized loading states
const Collections = dynamic(() => import("@/components/homes/home-gaming/Collections"), {
  loading: () => <LoadingSpinner text="Loading collections..." className="py-8" />
});
const Products = dynamic(() => import("@/components/homes/home-gaming/Products"), {
  loading: () => <LoadingSpinner text="Loading products..." className="py-8" />
});
const Collections2 = dynamic(() => import("@/components/homes/home-gaming/Collections2"), {
  loading: () => <LoadingSpinner text="Loading collections..." className="py-8" />
});
const Lookbook = dynamic(() => import("@/components/homes/home-gaming/Lookbook"), {
  loading: () => <LoadingSpinner text="Loading lookbook..." className="py-8" />
});
const Products2 = dynamic(() => import("@/components/homes/home-gaming/Products2"), {
  loading: () => <LoadingSpinner text="Loading products..." className="py-8" />
});
const Testimonials = dynamic(() => import("@/components/homes/home-gaming/Testimonials"), {
  loading: () => <LoadingSpinner text="Loading testimonials..." className="py-8" />
});
const Blogs = dynamic(() => import("@/components/homes/home-gaming/Blogs"), {
  loading: () => <LoadingSpinner text="Loading blogs..." className="py-8" />
});
const Features = dynamic(() => import("@/components/homes/home-gaming/Features"), {
  loading: () => <LoadingSpinner text="Loading features..." className="py-8" />
});

export const metadata = {
  title: "TheBotsWorld || TheBotsWorld - Learn, Explore & Innovate with Robots",
  description: "TheBotsWorld is an educational platform dedicated to robotics. Discover the latest innovations in robotics to learn, explore, and create the future of automation.",
};

export default function HomePage() {
  return (
    <>
      {/* <Topbar9 /> */}
      <Header1 />
      <Hero />
      <Collections />
      <Products />
      <Collections2 />
      <Lookbook />
      <Products2 />
      <Testimonials />
      <Blogs />
      <Features />
      <Footer1 dark />
    </>
  );
}
