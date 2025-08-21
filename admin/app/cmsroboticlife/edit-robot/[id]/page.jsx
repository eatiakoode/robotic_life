import EditRobotClient from "./EditRobotClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditRobotClient id={params.id} />;
}
