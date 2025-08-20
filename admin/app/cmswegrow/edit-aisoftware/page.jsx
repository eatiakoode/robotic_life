import EditAISoftwareClient from "./EditAISoftwareClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditAISoftwareClient id={params.id} />;
}
