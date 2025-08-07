import dynamic from "next/dynamic";
import CityGlimpse from "@/components/city-glimpse";

export const metadata = {
  title: 'City Glimpse || WeGrow - Real Estate Insights',
  description: 'Stay updated with property pricing trends and real estate market rates across India.',
}

const index = () => {
  return (
    <>
      <CityGlimpse />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
