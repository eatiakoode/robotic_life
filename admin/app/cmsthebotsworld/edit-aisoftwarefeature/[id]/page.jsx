import EditAISoftwareFeatureClient from "./EditAISoftwareFeatureClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditAISoftwareFeatureClient id={params.id} />;
}