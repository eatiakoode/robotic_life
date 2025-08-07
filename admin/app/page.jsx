import Wrapper from "@/components/layout/Wrapper";
import HomeMain from './(homes)/home-1/page'
export const metadata = {
  title: "Best Real Estate Agency in Gurgaon - WEGROW INFRAVENTURES",
  description: "WEGROW INFRAVENTURES is the best real estate agency in Gurgaon, providing expert solutions for residential, commercial, and investment properties across Gurgaon.",
};

export default function Home() {
  return (
    <Wrapper>
      <HomeMain/>
    </Wrapper>
    
  )
}
