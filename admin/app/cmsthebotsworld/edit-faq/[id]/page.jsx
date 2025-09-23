import EditFaqClient from "./EditFaqClient";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description: 'WeGrow - Real Estate',
};

export default function Page({ params }) {
  return <EditFaqClient id={params.id} />;
}
