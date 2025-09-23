import EditCategoryClient from "./EditCategoryClient";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description: 'WeGrow - Real Estate',
};

export default async function Page({ params }) {
  const { id } = await params;
  return <EditCategoryClient id={id} />;
}
