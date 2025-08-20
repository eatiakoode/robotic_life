import EditAISoftwareFeatureClient from "./EditAISoftwareFeatureClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditAISoftwareFeatureClient id={params.id} />;
}