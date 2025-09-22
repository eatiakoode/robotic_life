import EditAutonomyLevelClient from "./EditAutonomyLevelClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditAutonomyLevelClient id={params.id} />;
}
