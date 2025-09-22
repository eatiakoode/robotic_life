import EditRobotClient from "./EditRobotClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditRobotClient id={params.id} />;
}
