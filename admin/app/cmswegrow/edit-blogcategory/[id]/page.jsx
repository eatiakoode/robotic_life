import EditBlogCategoryClient from "./EditBlogCategoryClient";

export const metadata = {
  title: 'My Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditBlogCategoryClient id={params.id} />;
}
