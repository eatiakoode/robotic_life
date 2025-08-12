import EditBlogClient from "./EditBlogClient";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description: 'WeGrow - Real Estate',
};

export default function Page({ params }) {
  return <EditBlogClient id={params.id} />;
}
