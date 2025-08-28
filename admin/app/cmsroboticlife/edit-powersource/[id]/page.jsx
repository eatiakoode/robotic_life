import EditPowerSourceClient from "./EditPowerSourceClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditPowerSourceClient id={params.id} />;
}
