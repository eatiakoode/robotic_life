import dynamic from "next/dynamic";
import LandingPage from "@/components/landing-page";

export const metadata = {
  title: 'Landing Page || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <LandingPage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
