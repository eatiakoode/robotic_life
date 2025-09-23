import EditPowerSourceClient from "./EditPowerSourceClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditPowerSourceClient id={params.id} />;
}
