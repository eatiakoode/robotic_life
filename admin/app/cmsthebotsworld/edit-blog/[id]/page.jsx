import EditBlogClient from "./EditBlogClient";

export const metadata = {
  title: 'My Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditBlogClient id={params.id} />;
}
