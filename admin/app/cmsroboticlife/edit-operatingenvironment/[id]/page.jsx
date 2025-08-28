import EditOperatingEnvironmentClient from "./EditOperatingEnvironmentClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditOperatingEnvironmentClient id={params.id} />;
}
