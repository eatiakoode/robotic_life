import EditBlogClient from "./EditBlogClient";

export const metadata = {
  title: 'My Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditBlogClient id={params.id} />;
}
