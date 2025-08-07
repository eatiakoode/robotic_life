import dynamic from "next/dynamic";
import EditTestimonial from "@/components/dashboard/edit-testimonial";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditTestimonial />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
