import EditColorClient from "./EditColorClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditColorClient id={params.id} />;
}
