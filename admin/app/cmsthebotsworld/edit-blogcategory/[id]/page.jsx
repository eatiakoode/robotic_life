import EditBlogCategoryClient from "./EditBlogCategoryClient";

export const metadata = {
  title: 'My Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditBlogCategoryClient id={params.id} />;
}
