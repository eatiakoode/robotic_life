import EditNavigationTypeClient from "./EditNavigationTypeClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditNavigationTypeClient id={params.id} />;
}
