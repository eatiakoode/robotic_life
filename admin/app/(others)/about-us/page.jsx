import dynamic from "next/dynamic";
import AboutUs from "@/components/about-us";

export const metadata = {
  title: 'About WEGROW INFRAVENTURES – Your Trusted Real Estate Partner in Gurgaon',
  description:
    'Learn about WEGROW INFRAVENTURES, a trusted real estate agency in Gurgaon, offering expert services in residential, commercial, and investment properties.',
}

const index = () => {
  return (
    <>
      <AboutUs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
