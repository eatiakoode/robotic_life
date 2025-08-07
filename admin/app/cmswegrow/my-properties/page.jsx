import dynamic from "next/dynamic";
import MyProperties from "@/components/dashboard/my-properties";
import { getPropertyTableData } from "@/api/property";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}
export default async function ListingPage({ searchParams }) {
  const filter = {
    limit: 10,
    page: parseInt(searchParams.page) || 1
  }
  const data = await getPropertyTableData(filter);
  
  const properties = data?.items || [];
  const totalCount = data?.totalCount || 0;

  return <MyProperties properties={properties} totalCount={totalCount} filter={filter}/>;
}
