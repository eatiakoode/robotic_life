import dynamic from "next/dynamic";
import MarketTrends from "@/components/market-trends";

export const metadata = {
  title: 'Market Trends || WeGrow - Real Estate Insights',
  description: 'Stay updated with property pricing trends and real estate market rates across India.',
}

const index = () => {
  return (
    <>
      <MarketTrends />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
