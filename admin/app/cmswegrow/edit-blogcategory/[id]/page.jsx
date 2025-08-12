import EditBlogCategoryClient from "./EditBlogCategoryClient";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description: 'WeGrow - Real Estate',
};

export default function Page({ params }) {
  return <EditBlogCategoryClient id={params.id} />;
}
