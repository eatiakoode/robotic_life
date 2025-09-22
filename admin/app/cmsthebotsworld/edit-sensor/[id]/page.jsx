import EditSensorClient from "./EditSensorClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditSensorClient id={params.id} />;
}
