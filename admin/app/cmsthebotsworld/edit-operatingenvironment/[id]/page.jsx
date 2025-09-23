import EditOperatingEnvironmentClient from "./EditOperatingEnvironmentClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditOperatingEnvironmentClient id={params.id} />;
}
