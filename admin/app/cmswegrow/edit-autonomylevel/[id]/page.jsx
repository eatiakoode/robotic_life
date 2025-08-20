import EditAutonomyLevelClient from "./EditAutonomyLevelClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditAutonomyLevelClient id={params.id} />;
}
