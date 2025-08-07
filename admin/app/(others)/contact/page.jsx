import dynamic from "next/dynamic";
import Contact from "@/components/contact";

export const metadata = {
  title: 'Contact Us for Upcoming Projects in Gurgaon - WEGROW INFRAVENTURES',
  description:
    'Connect with WEGROW INFRAVENTURES to learn more about upcoming real estate projects in Gurgaon. Get early access, expert advice, and premium property options.',
}

const index = () => {
  return (
    <>
      <Contact />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
