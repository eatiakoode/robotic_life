export const dynamic = "force-dynamic";
import HomeMain from "@/components/home";
import { getPropertyFeatureData } from "@/api/frontend/property";
import { countPropertiesByCity, getCityWithPropertyPage } from "@/api/frontend/city";
import { getTestimonialTableData } from "@/api/frontend/testimonial";
import { getLocationTableData } from "@/api/frontend/location";

export const metadata = {
  title: "Best Real Estate Agency in Gurgaon - WEGROW INFRAVENTURES",
  description: "WEGROW INFRAVENTURES is the best real estate agency in Gurgaon, providing expert solutions for residential, commercial, and investment properties across Gurgaon.",
};

export default async function HomePage() {
  try {
    // Run requests in parallel to reduce wait time
    let filter ={
      istrending:"yes",
      limit:9,
      page:  1
    }
    const [propertyRes, cityCountRes, testimonialRes, cityPageRes, locationPageRes] = await Promise.all([
      getPropertyFeatureData(),
      countPropertiesByCity(),
      getTestimonialTableData(),
      getCityWithPropertyPage(),
      getLocationTableData(filter),
    ]);

    const properties = propertyRes || [];
    const findcities = cityCountRes?.data || [];
    const testimonials = testimonialRes || [];
    const cities = cityPageRes?.data || [];
    const locationlist = locationPageRes || [];
 

    return (
      <HomeMain
        properties={properties}
        findcities={findcities}
        testimonials={testimonials}
        cities={cities}
        locationlist={locationlist}
      />
    );
  } catch (error) {
    console.error("HomePage fetch error:", error);
    // Optionally: return an error fallback component here
    return <div className="text-center py-10">Failed to load homepage content.</div>;
  }
}

// const index = () => {
//   // const { showToast } = useToast();
//   return (
//     <>
//     {/* <button onClick={() => showToast("This is a custom toast!", "success")}>
//       Show Toast
//     </button> */}
//       <HomeMain />
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(index), { ssr: false });
