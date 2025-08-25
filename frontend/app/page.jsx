import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
// import Header15 from "@/components/headers/Header15";
import Topbar9 from "@/components/headers/Topbar9";
import Blogs from "@/components/homes/home-gaming/Blogs";
import Collections from "@/components/homes/home-gaming/Collections";
import Collections2 from "@/components/homes/home-gaming/Collections2";
import Features from "@/components/homes/home-gaming/Features";
import Hero from "@/components/homes/home-gaming/Hero";
import Lookbook from "@/components/homes/home-gaming/Lookbook";
import Products from "@/components/homes/home-gaming/Products";
import Products2 from "@/components/homes/home-gaming/Products2";
import Testimonials from "@/components/homes/home-gaming/Testimonials";

export const metadata = {
  title: "Robotic Life || A complete guide to robots",
  description: "Robotic Life - A complete guide to robots",
};

export default function HomePage() {
  return (
    <>
      <Topbar9 />
      <Header7/>
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
