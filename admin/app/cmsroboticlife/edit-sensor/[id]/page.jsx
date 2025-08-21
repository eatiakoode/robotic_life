import EditSensorClient from "./EditSensorClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditSensorClient id={params.id} />;
}
