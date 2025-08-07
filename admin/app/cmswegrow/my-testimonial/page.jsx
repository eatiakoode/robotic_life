import dynamic from "next/dynamic";
import MyTestimonial from "@/components/dashboard/my-testimonial";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyTestimonial />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
