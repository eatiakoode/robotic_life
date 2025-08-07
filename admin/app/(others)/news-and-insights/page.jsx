import dynamic from "next/dynamic";
import NewsandInsights from "@/components/news-and-insights";

export const metadata = {
  title: 'Real Estate News \& Market Insights | WEGROW INFRAVENTURES',
  description:
    'Stay informed with the latest real estate news, trends, and expert insights from WEGROW INFRAVENTURES. Get updates on Gurgaon’s property market and investment opportunities. ',
}

const index = () => {
  return (
    <>
      <NewsandInsights />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
